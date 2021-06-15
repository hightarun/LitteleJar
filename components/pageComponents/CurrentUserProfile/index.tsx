import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./currentProfile.module.scss";

import { useRouter } from "next/router";

//cropperjs
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

//redux
import { connect } from "react-redux";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faUpload } from "@fortawesome/free-solid-svg-icons";

//layouts
import Modal from "../../layouts/Modal";
import Spinner from "../../layouts/Spinner";
import { updateDp } from "../../../redux/actions/profile";

const index = (props: any) => {
  const router = useRouter();

  // profile data
  const [banner, setBanner] = useState<String>("/image/defaultBanner.jpg");
  const [avatar, setAvatar] = useState<String>("/image/default.png");
  const [name, setName] = useState<String>("");
  const [followers, setFollowers] = useState<Number>(0);

  //state to toggle modal to update image
  const [openBanner, setOpenBanner] = useState<Boolean>(false);
  const [openAvatar, setOpenAvatar] = useState<Boolean>(false);

  //to store cropped image blob
  const [bannerPost, setBannerPost] = useState<any>();
  const [avatarPost, setAvatarPost] = useState<any>();

  //to store blob and url of uploaded image for preview
  const [previewImage, setPreviewImage] = useState<any>({
    file: "",
    imagePreviewUrl: "",
  });

  //preview image div ref
  const bannerRef = useRef();
  const avatarRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    //creating formdata to store multipart/form-data
    const formData = new FormData();
    if (bannerPost) {
      formData.append("banner", bannerPost, "banner.png");
    }
    if (avatarPost) {
      formData.append("avatar", avatarPost, "avatar.png");
    }
    await props.updateDp(formData);
    router.reload();
  };

  const handleImagePreview = (e) => {
    e.preventDefault();
    // make blob and image url for preview image
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setPreviewImage({
        file: file,
        imagePreviewUrl: reader.result.toString(),
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  //to update profile data
  useEffect(() => {
    if (props.profile.profile != "") {
      const bannerSrc = `${process.env.baseUrl}${props.profile.profile.banner}`;
      const avatarSrc = `${process.env.baseUrl}${props.profile.profile.user.avatar}`;
      setBanner(bannerSrc);
      setAvatar(avatarSrc);
      const fullName = `${props.profile.profile.user.name[0].firstName} ${props.profile.profile.user.name[0].lastName}`;
      setName(fullName);
      setFollowers(props.profile.profile.followers.length);
    }
  }, [props.profile]);

  //for cropping image
  useEffect(() => {
    if (bannerRef.current != undefined) {
      const cropper = new Cropper(bannerRef.current, {
        zoomable: false,
        scalable: true,
        highlight: true,
        data: {
          //define cropbox size
          width: 1280,
          height: 320,
        },
        responsive: true,
        aspectRatio: 16 / 4,
        crop: () => {
          const canvas = cropper.getCroppedCanvas();
          canvas.toBlob(async (blob) => {
            setBannerPost(blob);
          });
          //setBannerPost({ imageUrl: canvas.toDataURL("image/png") });
        },
      });
    }
    if (avatarRef.current != undefined) {
      const cropper = new Cropper(avatarRef.current, {
        zoomable: false,
        scalable: true,
        highlight: true,
        data: {
          //define cropbox size
          width: 200,
          height: 200,
        },
        responsive: true,
        aspectRatio: 1,
        crop: () => {
          const canvas = cropper.getCroppedCanvas();
          canvas.toBlob(async (blob) => {
            setAvatarPost(blob);
          });
          //setAvatarPost({ imageUrl: canvas.toDataURL("image/png") });
        },
      });
    }
  });

  return (
    <Fragment>
      {props.profile.loading && props.profile.profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className={styles.bannerContain}>
            <div
              className={styles.banner}
              style={{
                backgroundImage: "url(" + `${banner}` + ")",
              }}
            >
              <div
                className={styles.changeBanner}
                onClick={() => setOpenBanner(true)}
              >
                <FontAwesomeIcon className={styles.icon} icon={faCamera} />
                <p>Edit</p>
              </div>
              <Modal
                open={openBanner}
                onClose={() => {
                  setOpenBanner(false);
                  setPreviewImage({
                    file: "",
                    imagePreviewUrl: "",
                  });
                }}
              >
                <form
                  className={styles.bannerform}
                  id="form"
                  onSubmit={(e) => onSubmit(e)}
                  encType="multipart/form-data"
                >
                  <label htmlFor="banner">
                    <div>
                      <p>Click or</p>
                      <p>Drag and Drop the Image here</p>
                      <FontAwesomeIcon
                        className={styles.icon}
                        icon={faUpload}
                      />
                    </div>
                    <input
                      type="file"
                      accept="image/png , image/jpg , image/jpeg"
                      name="banner"
                      id="banner"
                      onChange={(e) => handleImagePreview(e)}
                    />
                  </label>

                  {previewImage.imagePreviewUrl != "" ? (
                    <div className={styles.preview}>
                      <img
                        ref={bannerRef}
                        alt="Banner"
                        className={styles.previewBannerImage}
                        src={previewImage.imagePreviewUrl}
                      />
                    </div>
                  ) : (
                    <div className={styles.preview}>
                      <div className={styles.previewNoImage}>
                        <p>Upload Banner for preview </p>
                        <p> 1280px x 320px (16:4)</p>
                      </div>
                    </div>
                  )}
                  <button value="submit" type="submit">
                    <span>Change Banner</span>
                  </button>
                </form>
              </Modal>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.head}>
              <div
                className={styles.avatar}
                style={{
                  backgroundImage: "url(" + `${avatar}` + ")",
                }}
              >
                <div
                  className={styles.changeAvatar}
                  onClick={() => setOpenAvatar(true)}
                >
                  <FontAwesomeIcon className={styles.icon} icon={faCamera} />
                </div>
                <Modal
                  open={openAvatar}
                  onClose={() => {
                    setOpenAvatar(false);
                    setPreviewImage({
                      file: "",
                      imagePreviewUrl: "",
                    });
                  }}
                >
                  <form
                    className={styles.avatarform}
                    onSubmit={(e) => onSubmit(e)}
                    encType="multipart/form-data"
                  >
                    <label htmlFor="avatar">
                      <div>
                        <p>Click or Drag and Drop the Image here</p>
                        <FontAwesomeIcon
                          className={styles.icon}
                          icon={faUpload}
                        />
                      </div>
                      <input
                        type="file"
                        accept="image/png , image/jpg , image/jpeg"
                        name="avatar"
                        id="avatar"
                        onChange={(e) => handleImagePreview(e)}
                      />
                    </label>
                    {previewImage.imagePreviewUrl != "" ? (
                      <div className={styles.preview}>
                        <img
                          ref={avatarRef}
                          alt="Banner"
                          className={styles.previewAvatarImage}
                          src={previewImage.imagePreviewUrl}
                        />
                      </div>
                    ) : (
                      <div className={styles.preview}>
                        <div className={styles.previewAvatarImage}>
                          <p>Upload Avatar for preview</p>
                          <p>1:1</p>
                        </div>
                      </div>
                    )}
                    <button type="submit">
                      <span>Change Avatar</span>
                    </button>
                  </form>
                </Modal>
              </div>
              <div className={styles.containInfo}>
                <div className={styles.info}>
                  <div>
                    <p>{name}</p>
                  </div>
                  <div>
                    <p>{followers} Followers</p>
                  </div>
                </div>
                <div className={styles.buttons}>
                  <button>
                    <span>Followers</span>
                  </button>
                  <button>
                    <span>Following</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  // isAuthenticated: state.auth.isAuthenticated,
  // loading: state.auth.loading,
  user: state.auth.user,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // setAlert: (msg: string, alertType: string) =>
    //   dispatch(setAlert(msg, alertType)),
    updateDp: (images: any) => dispatch(updateDp(images)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);

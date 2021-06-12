import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./currentProfile.module.scss";

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

const index = (props: any) => {
  const [banner, setBanner] = useState<String>("/image/defaultBanner.jpg");
  const [avatar, setAvatar] = useState<String>("/image/default.png");
  const [name, setName] = useState<String>("");
  const [followers, setFollowers] = useState<Number>(0);
  const [openBanner, setOpenBanner] = useState<Boolean>(false);
  const [openAvatar, setOpenAvatar] = useState<Boolean>(false);
  const [bannerPost, setBannerPost] = useState<any>({ imageUrl: "" });
  const [avatarPost, setAvatarPost] = useState<any>({ imageUrl: "" });
  const [previewImage, setPreviewImage] = useState<any>({
    file: "",
    imagePreviewUrl: "",
  });

  //preview image div ref
  const bannerRef = useRef();
  const avatarRef = useRef();

  // const onSubmit = (e) => {};

  const handleImagePreview = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setPreviewImage({
        file: file,
        imagePreviewUrl: reader.result.toString(),
      });
    };
    if (file) reader.readAsDataURL(file);
  };

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
          setBannerPost({ imageUrl: canvas.toDataURL("image/png") });
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
          setAvatarPost({ imageUrl: canvas.toDataURL("image/png") });
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
                  //onSubmit={(e) => onSubmit(e)}
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
                      accept="image/*"
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
                  <button type="submit">
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
                    //onSubmit={(e) => onSubmit(e)}
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
                        accept="image/*"
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
                    <span>Settings</span>
                  </button>
                  <button>
                    <span>Donations</span>
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

export default connect(mapStateToProps)(index);

import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./currentProfile.module.scss";

import { useRouter } from "next/router";

//cropperjs
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

//redux
import { connect } from "react-redux";

//icons
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCamera, faUpload } from "@fortawesome/free-solid-svg-icons";

//layouts
// import Modal from "../../layouts/Modal";
import Spinner from "../../layouts/Spinner";
import { updateDp } from "../../../redux/actions/profile";

//sub components
import CreatorBody from "../../subComponents/CreatorBody";
import CreatorHead from "../../subComponents/CreatorHead";
import CreatorBanner from "../../subComponents/CreatorBanner";

const index = (props: any) => {
  const router = useRouter();

  // profile data
  const [banner, setBanner] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
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
    <div className={styles.container}>
      {props.profile.loading && props.profile.profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <CreatorBanner
            banner={banner}
            setOpenBanner={setOpenBanner}
            openBanner={openBanner}
            setPreviewImage={setPreviewImage}
            onSubmit={onSubmit}
            handleImagePreview={handleImagePreview}
            previewImage={previewImage}
            bannerRef={bannerRef}
          />
          <CreatorHead
            avatar={avatar}
            setOpenAvatar={setOpenAvatar}
            openAvatar={openAvatar}
            setPreviewImage={setPreviewImage}
            onSubmit={onSubmit}
            handleImagePreview={handleImagePreview}
            previewImage={previewImage}
            avatarRef={avatarRef}
            name={name}
            followers={followers}
          />
          <CreatorBody />
        </Fragment>
      )}
    </div>
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

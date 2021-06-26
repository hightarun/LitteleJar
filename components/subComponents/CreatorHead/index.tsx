import React from "react";
import styles from "./creatorHead.module.scss";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faUpload } from "@fortawesome/free-solid-svg-icons";

//layouts
import Modal from "../../layouts/Modal";

const index = ({
  avatar,
  setOpenAvatar,
  openAvatar,
  setPreviewImage,
  onSubmit,
  handleImagePreview,
  previewImage,
  avatarRef,
  name,
  followers,
}) => {
  return (
    <div className={styles.headContainer}>
      <div className={styles.head}>
        <div className={styles.avatarContain}>
          <img className={styles.avatar} src={avatar} alt="Avatar" />
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
                  <FontAwesomeIcon className={styles.icon} icon={faUpload} />
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
                    alt="Avatar Preview"
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
  );
};

export default index;

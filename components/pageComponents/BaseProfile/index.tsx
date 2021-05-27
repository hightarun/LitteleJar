import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Spinner from "../../layouts/Spinner";
import styles from "./baseProfile.module.scss";

const index = (props: any) => {
  const [banner, setBanner] = useState<String>("/image/defaultBanner.jpg");
  const [avatar, setAvatar] = useState<String>("/image/default.png");
  const [name, setName] = useState<String>("");
  const [followers, setFollowers] = useState<Number>(0);

  useEffect(() => {
    if (props.profile.profile !== "") {
      const bannerSrc = `${process.env.baseUrl}${props.profile.profile.banner}`;
      const avatarSrc = `${process.env.baseUrl}${props.profile.profile.user.avatar}`;
      setBanner(bannerSrc);
      setAvatar(avatarSrc);
      const fullName = `${props.profile.profile.user.name[0].firstName} ${props.profile.profile.user.name[0].lastName}`;
      setName(fullName);
      setFollowers(props.profile.profile.followers.length);
    }
  }, [props.profile]);
  return (
    <div className={styles.container}>
      {props.profile.loading && props.profile.profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div
            className={styles.banner}
            style={{
              backgroundImage: "url(" + `${banner}` + ")",
            }}
          ></div>
          <div className={styles.head}>
            <div
              className={styles.avatar}
              style={{
                backgroundImage: "url(" + `${avatar}` + ")",
              }}
            ></div>
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
                  <span>Follow</span>
                </button>
                <button>
                  <span>Donate</span>
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  // loading: state.auth.loading,
  user: state.auth.user,
  profile: state.profile,
});

export default connect(mapStateToProps)(index);

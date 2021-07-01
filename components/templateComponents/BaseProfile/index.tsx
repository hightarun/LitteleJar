import React, { Fragment, useEffect, useState } from "react";
import styles from "./baseProfile.module.scss";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import { followUser } from "../../../redux/actions/profile";

import Spinner from "../../layouts/Spinner";
import Alert from "../../layouts/Alert";
import { setAlert } from "../../../redux/actions/alert";

const index = (props: any) => {
  const router = useRouter();
  //profile data
  const [banner, setBanner] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [name, setName] = useState<String>("");
  const [followers, setFollowers] = useState<Number>(0);
  const [toggleFollow, setToggleFollow] = useState<Boolean>(true);

  const followHandler = async () => {
    if (props.profile.profile.followers.includes(props.user._id)) {
      return props.setAlert("Following already", "danger");
    }
    await props.followUser(props.profile.profile.user.username);
    setTimeout(() => {
      router.reload();
    }, 2000);
  };

  useEffect(() => {
    if (props.user) {
      if (props.profile.profile.followers.includes(props.user._id)) {
        setToggleFollow(false);
      }
    }
  }, [props.user]);

  //to update profile data
  useEffect(() => {
    if (props.profile.profile !== "") {
      const bannerSrc = `${props.profile.profile.banner}`;
      const avatarSrc = `${props.profile.profile.user.avatar}`;
      setBanner(bannerSrc);
      setAvatar(avatarSrc);
      const fullName = `${props.profile.profile.user.name[0].firstName} ${props.profile.profile.user.name[0].lastName}`;
      setName(fullName);
      setFollowers(props.profile.profile.followers.length);
    }
  }, [props.profile]);

  return (
    <Fragment>
      {props.profile.loading && props.profile.profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className={styles.bannerContain}>
            <img className={styles.banner} src={banner} alt="Banner" />
          </div>
          <Alert />
          <div className={styles.container}>
            <div className={styles.head}>
              <img className={styles.avatar} src={avatar} alt="Avatar" />
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
                  {toggleFollow ? (
                    <button onClick={followHandler}>
                      <span>Follow</span>
                    </button>
                  ) : (
                    <div>
                      <p>Following</p>
                    </div>
                  )}
                  <button>
                    <span>Donate</span>
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
  isAuthenticated: state.auth.isAuthenticated,
  // loading: state.auth.loading,
  user: state.auth.user,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg: string, alertType: string) =>
      dispatch(setAlert(msg, alertType)),
    followUser: (uname: String) => dispatch(followUser(uname)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);

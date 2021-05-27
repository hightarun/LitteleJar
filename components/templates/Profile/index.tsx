import React, { Fragment, useEffect } from "react";
import styles from "./profile.module.scss";

//redux
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../redux/actions/profile";

//components
import FourOFour from "../../layouts/404";
import Spinner from "../../layouts/Spinner";
import BaseProfile from "../../pageComponents/BaseProfile";
import CurrentUserProfile from "../../pageComponents/CurrentUserProfile";

const index = (props: any) => {
  useEffect(() => {
    props.getCurrentProfile(props.query);
  }, [props.query]);

  return (
    <div className={styles.container}>
      {props.profile.loading && props.profile.profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          {/* If no user was found */}
          {props.profile.profile === "No User Found" ? (
            <FourOFour />
          ) : (
            <Fragment>
              {/* If user is not loged in then render Base profile  */}
              {props.user === null ? (
                <BaseProfile />
              ) : (
                <div>
                  {/* If user is logged in then render Base Profile for everyone other than the loged in user */}
                  {props.user.username === props.query ? (
                    <CurrentUserProfile />
                  ) : (
                    <BaseProfile />
                  )}
                </div>
              )}
            </Fragment>
          )}
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
    // loginUser: (emailOrUname, password) =>
    //   dispatch(loginUser(emailOrUname, password)),
    //loadUser: () => dispatch(loadUser()),
    getCurrentProfile: (query: string) => dispatch(getCurrentProfile(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);

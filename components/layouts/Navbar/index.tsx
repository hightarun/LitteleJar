import React, { useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import Link from "next/link";

//redux
import { connect } from "react-redux";
import { logout } from "../../../redux/actions/auth";
import { useRouter } from "next/router";

const index: React.FC = (props: any) => {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string>("");
  const [showMenu, setShowMenu] = useState<Boolean>(false);

  const profileMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const logoutHandler = async () => {
    await props.logout();
    router.push("/login");
  };

  const profileHandler = () => {
    router.push("/account");
  };

  const settingsHandler = () => {
    router.push("/account/settings");
  };

  const authLinks = (
    <div className={styles.menu}>
      <div onClick={profileMenuToggle}>
        <img className={styles.profile} src={avatar} alt="Profile" />
      </div>
      {showMenu ? (
        <div className={styles.dropdown}>
          <div onClick={profileHandler}>
            <p>Profile</p>
          </div>
          <div onClick={settingsHandler}>
            <p>Settings</p>
          </div>
          <div onClick={logoutHandler}>
            <p>Logout</p>
          </div>
        </div>
      ) : null}
    </div>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link href="/register">Register</Link>
      </li>
      <li>
        <Link href="/login">Login</Link>
      </li>
    </ul>
  );

  useEffect(() => {
    if (props.user) {
      const srcString = `${props.user.avatar}`;
      setAvatar(srcString);
    }
  }, [props.user]);

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/logo.png" alt="LittleJar" />
        </Link>
      </div>
      <div className={styles.links}>
        {props.isAuthenticated ? authLinks : guestLinks}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);

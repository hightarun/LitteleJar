import React, { Fragment, useEffect } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import styles from "./uname.module.scss";
import Navbar from "../../components/layouts/Navbar";
import Head from "next/head";

//import { useRouter } from "next/router";

import { connect } from "react-redux";

import Profile from "../../components/pageTemplates/Profile";

import { loadUser } from "../../redux/actions/auth";

import { initializeStore } from "../../redux/store";
import { getCurrentProfile } from "../../redux/actions/profile";

//UserLoadedNoSSR component made to use localstorage while SSR is false, cant use window or document while SSR is true
//So we have to do this in every page because of token in localstorage
const UserLoadedNoSSR = dynamic(() => import("../../utils/loadUser"), {
  ssr: false,
});

const uname: NextPage = (props: any) => {
  useEffect(() => {
    // if (!props.isAuthenticated) {
    //   router.push("/login");
    // }
  });

  return (
    <Fragment>
      <UserLoadedNoSSR />
      <Head>
        <meta name="description" content="User Profile" />
        <title>{process.env.site}</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <Profile query={props.props.query} />
      </div>
    </Fragment>
  );
};

uname.getInitialProps = async (ctx) => {
  // @ts-ignore
  const store = initializeStore();

  await store.dispatch(getCurrentProfile(ctx.query.uname));
  return {
    props: { initialReduxState: store.getState(), query: ctx.query.uname },
  };
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // setAlert: (msg: string, alertType: string) =>
    //   dispatch(setAlert(msg, alertType)),
    loadUser: () => dispatch(loadUser()),
    getCurrentProfile: (query) => dispatch(getCurrentProfile(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(uname);

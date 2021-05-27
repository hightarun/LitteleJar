import Head from "next/head";
import type { NextPage } from "next";
// import styles from "./account.module.scss";
import { useRouter } from "next/router";

import { connect } from "react-redux";

import dynamic from "next/dynamic";

import Navbar from "../../components/layouts/Navbar";

import { Fragment, useEffect } from "react";
import { loadUser } from "../../redux/actions/auth";

const UserLoadedNoSSR = dynamic(() => import("../../utils/loadUser"), {
  ssr: false,
});

const index: NextPage = (props: any) => {
  const router = useRouter();

  //if user not authenticated redirect to login page , if user authenticated redirect to user profile page
  useEffect(() => {
    if (!props.isAuthenticated) {
      router.push("/login");
    } else {
      if (props.user) {
        router.push(`/${props.user.username}`);
      }
    }
  }, [props.isAuthenticated, props.user]);

  return (
    <Fragment>
      <UserLoadedNoSSR />
      <Head>
        <meta name="description" content="Account" />
        <title>{process.env.site}</title>
      </Head>
      <Navbar />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: () => dispatch(loadUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);

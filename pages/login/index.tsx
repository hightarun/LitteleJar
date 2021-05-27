import Head from "next/head";
import type { NextPage } from "next";
//import styles from "./login.module.scss";
import { Fragment } from "react";

import Navbar from "../../components/layouts/Navbar";
import Login from "../../components/templates/Login";

import dynamic from "next/dynamic";

const UserLoadedNoSSR = dynamic(() => import("../../utils/loadUser"), {
  ssr: false,
});

const login: NextPage = () => {
  return (
    <Fragment>
      <UserLoadedNoSSR />
      <Head>
        <meta name="description" content="Login Page" />
        <title>{process.env.site}</title>
      </Head>
      <Navbar />
      <Login />
    </Fragment>
  );
};

export default login;

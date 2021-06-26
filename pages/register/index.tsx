import Head from "next/head";
import type { NextPage } from "next";
//import styles from "./register.module.scss";
import React, { Fragment } from "react";

//component imports
import Navbar from "../../components/layouts/Navbar";

import SignUp from "../../components/pageTemplates/SignUp";

import dynamic from "next/dynamic";
const UserLoadedNoSSR = dynamic(() => import("../../utils/loadUser"), {
  ssr: false,
});

const register: NextPage = () => {
  return (
    <Fragment>
      <UserLoadedNoSSR />
      <Head>
        <meta name="description" content="Registration Page" />
        <title>{process.env.site}</title>
      </Head>
      <Navbar />
      <SignUp />
    </Fragment>
  );
};

export default register;

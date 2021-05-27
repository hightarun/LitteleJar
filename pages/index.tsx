import Head from "next/head";
import { Fragment } from "react";
import type { NextPage } from "next";
import styles from "./Home.module.scss";

import HomePage from "../components/templates/HomePage";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import dynamic from "next/dynamic";
const UserLoadedNoSSR = dynamic(() => import("../utils/loadUser"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <Fragment>
      <UserLoadedNoSSR />
      <Head>
        <meta name="description" content="zProject home page" />
        <title>{process.env.site}</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <HomePage />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Home;

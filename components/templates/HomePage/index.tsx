import React, { Fragment, useEffect } from "react";
import styles from "./homepage.module.scss";
import Link from "next/link";

import Aos from "aos";
import "aos/dist/aos.css";

const index: React.FC = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  });
  return (
    <Fragment>
      <div className={styles.container}>
        <div>
          <h1>{process.env.site}</h1>
        </div>
        <div className={styles.auth}>
          <Link href="/account">Explore</Link>
        </div>
      </div>
      <div className={styles.container2}>
        <div
          data-aos="fade-left"
          style={{ height: 30, width: 50, background: "red" }}
        ></div>
      </div>
    </Fragment>
  );
};

export default index;

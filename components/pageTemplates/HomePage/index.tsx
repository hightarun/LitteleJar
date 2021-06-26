import React, { Fragment, useEffect } from "react";
import styles from "./homepage.module.scss";
//import Link from "next/link";

import Aos from "aos";
import "aos/dist/aos.css";

const index: React.FC = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  });
  return (
    <Fragment>
      <div className={styles.container}>
        <div
          data-aos="zoom-in-down"
          data-aos-easing="ease-in-linear"
          className={styles.quote}
        >
          <img src="/motto.png" alt="logo" />
        </div>
        <div className={styles.claimTxt}>
          <p>Claim and start your own page now!</p>
        </div>
        <div className={styles.start}>
          <div className={styles.userStart}>
            <p className={styles.domain}>www.littlejar.in/</p>
            <input
              type="text"
              placeholder="username"
              id="uname"
              className={styles.uname}
            />
          </div>
          <button className={styles.butn}>
            <span>Lets Go!</span>
          </button>
        </div>
      </div>
      <div className={styles.container2}>
        <div className={styles.intro}>
          <div
            data-aos="zoom-in-right"
            data-aos-easing="ease-in-linear"
            className={styles.aboutTxt}
          >
            <p>
              Get the freedom to create full time, powered by your fans.&#32;
            </p>
            <p>
              Award your loyal supporters by sharing the amazing journey of
              creation with them.
            </p>
          </div>
          <div
            data-aos="zoom-in-right"
            data-aos-easing="ease-in-sine"
            data-aos-delay="800"
            className={styles.logo}
          >
            <img src="/jar.png" alt="logo" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default index;

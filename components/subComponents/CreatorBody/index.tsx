import React, { Fragment } from "react";
import styles from "./creatorBody.module.scss";

const index = () => {
  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>hi</h1>
        </div>
        <div className={styles.content}>
          <h1>body</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default index;

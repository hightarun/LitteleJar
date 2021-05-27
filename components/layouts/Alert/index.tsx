import React from "react";
import styles from "./alert.module.scss";
//import PropTypes from "prop-types";

import { connect } from "react-redux";
import { alertPropType } from "../../../utils/interface";

const Alert: React.FC<alertPropType> = (props: any) => {
  return (
    props.alerts != null &&
    props.alerts.map((alert) => (
      <div
        key={alert.id}
        className={
          alert.alertType === "danger"
            ? styles.alert_danger
            : styles.alert_success
        }
      >
        {alert.msg}
      </div>
    ))
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, null)(Alert);

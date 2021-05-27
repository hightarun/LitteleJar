import React, { useEffect } from "react";

import { loadUser } from "../redux/actions/auth";
import setAuthToken from "./setAuthtoken";
import { connect } from "react-redux";

//this component is for setting the global x-auth-token header with token value in local storage
//loadUser action will get the user from the database if the token verifies at the server
const UserLoad = (props) => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    props.loadUser();
  });
  return <div></div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: () => dispatch(loadUser()),
  };
};
export default connect(null, mapDispatchToProps)(UserLoad);

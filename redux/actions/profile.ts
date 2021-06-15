import { GET_PROFILE, PROFILE_ERROR } from "./../types";

import axios from "axios";
//import api from "../../utils/api";
import { setAlert } from "./alert";

//Get current users profile
export const getCurrentProfile = (query) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.baseUrl}/api/profile/user/${query}`
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

//update dp of user
export const updateDp = (formData: FormData) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    await axios.post(`${process.env.baseUrl}/api/profile/dp`, formData, config);
    dispatch(setAlert("Image uploaded successfully", "success"));
  } catch (err) {
    dispatch(setAlert("Image update failed", "danger"));
  }
};

//follow user

export const followUser = (uname: String) => async (dispatch) => {
  try {
    await axios.post(
      `${process.env.baseUrl}/api/profile/follow?username=${uname}`
    );
    dispatch(setAlert("Now Following", "success"));
  } catch (err) {
    dispatch(setAlert(err.msg, "danger"));
  }
};

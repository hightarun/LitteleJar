import { GET_PROFILE, PROFILE_ERROR } from "./../types";

import axios from "axios";

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

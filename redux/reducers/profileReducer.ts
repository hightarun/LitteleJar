import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR } from "./../types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
        error: {},
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        error: {},
      };
    default:
      return state;
  }
};

export default profileReducer;

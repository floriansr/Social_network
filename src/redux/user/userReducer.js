import { PROFILE } from "redux/user/userType";

const initialState = {
  user: false,
};

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE:
      return {
        ...state,
        log: true,
      };
    default:
      return state;
  }
};

export default logReducer;
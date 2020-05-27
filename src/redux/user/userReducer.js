import { PROFILE } from "redux/user/userType";

const initialState = {
  data: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default userReducer;
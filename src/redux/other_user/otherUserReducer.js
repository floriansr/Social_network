import { DETAILS_USER, POSTS_USER } from "redux/other_user/otherUserType";

const initialState = {
  other_user_data: {},
};

const otherUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAILS_USER:
      return {
        ...state,
        other_user_data: action.details,
      };
    case POSTS_USER:
      return {
        ...state.other_user_data,
        posts: action.posts,
      };
    default:
      return state;
  }
};

export default otherUserReducer;
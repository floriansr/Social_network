import { ALL_POSTS, CREATE_POST, EDIT_POST, DELETE_POST } from "redux/posts/postsType";

const initialState = {
  posts: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {

    case ALL_POSTS:
      return {
        ...state,
        posts: action.posts,
      };

    case CREATE_POST:
      return {
        ...state,
        posts: state.posts.concat(action.posts),
    };

    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post) => post.id === action.posts.id ? action.posts : post)
    }

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.posts.id),
    };

    default:
      return state;
  }
};

export default postsReducer;
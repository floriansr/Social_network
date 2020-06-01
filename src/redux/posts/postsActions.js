import { ALL_POSTS, CREATE_POST, EDIT_POST, DELETE_POST } from "redux/posts/postsType";

export const setPosts = (data) => {
	return {
		type: ALL_POSTS,
		posts: data,
	};
};

export const createPost = (data) => {

	return {
		type: CREATE_POST,
		posts: data,
	};
};

export const editPost = (data) => {

	return {
		type: EDIT_POST,
		posts: data,
	};
};

export const deletePost = (data) => {

	return {
		type: DELETE_POST,
		posts: data,
	};
};
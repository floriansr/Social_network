import { DETAILS_USER, POSTS_USER } from "redux/other_user/otherUserType";

export const setDetailsUser = (data) => {
	return {
		type: DETAILS_USER,
		details: data,
	};
};

export const setPostsUser = (data) => {
	return {
		type: POSTS_USER,
		posts: data,
	};
};
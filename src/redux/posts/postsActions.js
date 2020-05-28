import { ALL_POSTS } from "redux/posts/postsType";

export const setPosts = (data) => {
	return {
		type: ALL_POSTS,
		posts: data,
	};
};
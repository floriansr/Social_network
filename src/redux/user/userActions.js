import { PROFILE, MODIFICATE_MY_PROFILE } from "redux/user/userType";

export const setProfile = (data) => {
	return {
		type: PROFILE,
		details: data,
	};
};

export const modificateProfile = (username, description) => {

	return {
		type: MODIFICATE_MY_PROFILE,
		username,
		description,
	};
};
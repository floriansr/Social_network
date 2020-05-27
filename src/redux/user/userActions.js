import { PROFILE } from "redux/user/userType";

export const setProfile = (data) => {
	return {
		type: PROFILE,
		data: [data],
	};
};
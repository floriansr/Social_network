import React from "react";
import Loader from "react-loader";
import { Descriptions } from 'antd';

import ModificationMyProfile from "components/ModificationMyProfile"

import { useSelector } from "react-redux"

const Profile = () => {
  const myProfile = useSelector(state => state.user.data);

  if (!myProfile) {
    return (
      <Loader />
    )
  }
  
	return (
		<>
      <Descriptions
        title="My Profile"
        bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label="Username">{myProfile.username}</Descriptions.Item>
        <Descriptions.Item label="Email">{myProfile.email}</Descriptions.Item>
        <Descriptions.Item label="ID">{myProfile.id}</Descriptions.Item>
        <Descriptions.Item label="Amount">{myProfile.created_at}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {myProfile.description}
        </Descriptions.Item>
      </Descriptions>
      
      <ModificationMyProfile/>
		</>
	);
};

export default Profile;

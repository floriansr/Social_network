import React, { useEffect } from "react";
import Loader from "react-loader";

 // import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"

import Cookies from 'js-cookie'
import { setProfile } from "../../redux";
  // const history = useHistory();

const Profile = () => {
  const dispatch = useDispatch();
  const token = Cookies.get('token')

  useEffect(() => {

    fetch('https://api-minireseausocial.mathis-dyk.fr/users/me', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        dispatch(setProfile(response))
      })
      .catch(error => console.log(error));

}, []);

  const myProfile = useSelector(state => state.user.data);

  if (myProfile.length === 0) {
    return (
      <Loader />
    )
  }


  
	return (
		<>
      <p>{myProfile[0].email}</p>
		</>
	);
};

export default Profile;

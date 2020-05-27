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

  const data = useSelector(state => state.user.data[0]);

  if (!data.email) {
    return (
      <Loader />
    )
  }


  
	return (
		<>
      <p>{data.email}</p>
		</>
	);
};

export default Profile;

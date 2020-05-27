import React from "react";
 // import { useHistory } from "react-router-dom";
// import { useDispatch } from "react-redux"

import Cookies from 'js-cookie'

   // import { setConnexion } from "../../redux";
  // const history = useHistory();
 //  const dispatch = useDispatch();

const Profile = () => {


    const token = Cookies.get('token')

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
      })
      .catch(error => console.log(error));


	return (
		<>
		</>
	);
};

export default Profile;

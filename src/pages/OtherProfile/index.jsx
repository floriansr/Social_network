import React, { useEffect } from "react";

import Loader from "react-loader";

import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { Descriptions, Card } from 'antd';
import shortid from "shortid";
import Cookies from 'js-cookie'

import { setDetailsUser, setPostsUser } from "../../redux";


const OtherProfile = () => {
  const dispatch = useDispatch();
  const { userSlug } = useParams();
  const token = Cookies.get('token')
  const allPosts = useSelector(state => state.posts.posts);



  useEffect(() => {

    const checkProfileId = allPosts.find((x) => x.user.username === userSlug)

    fetch(`https://api-minireseausocial.mathis-dyk.fr/users/${checkProfileId.id}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setDetailsUser(response))
      })
      .catch(error => console.log(error));


    fetch(`https://api-minireseausocial.mathis-dyk.fr/posts?user.id=${checkProfileId.id}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setPostsUser(response))
      })
      .catch(error => console.log(error)); 


}, [allPosts, dispatch, token, userSlug]);


  const thisUser = useSelector(state => state.other_user_data);

  if (!thisUser || !thisUser.posts) {
    return (
      <Loader />
    )
  }
  
	return (
		<>

    <Descriptions
        title={`User Profile n°${thisUser.id}`}
        bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label="Username">{thisUser.username}</Descriptions.Item>
        <Descriptions.Item label="Description">{thisUser.description}</Descriptions.Item>
    </Descriptions>



    { thisUser.posts.map((x) => (
        <div className="site-card-border-less-wrapper" key={shortid.generate()}>
          <Card title="titre" bordered={false} style={{ width: 300 }}>
             <p>{x.text}</p>
          </Card>
        </div>

    ))}


		</>
	);
};

export default OtherProfile;
import React, { useEffect } from "react";

import Loader from "react-loader";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"

import Cookies from 'js-cookie'
import shortid from "shortid";
import { Descriptions, Card } from 'antd';

import { setDetailsUser, setPostsUser } from "../../redux";

const OtherProfile = () => {
  const dispatch = useDispatch();
  const { userSlug } = useParams();
  const allPosts = useSelector(state => state.posts.posts);
  const token = Cookies.get('token')


useEffect(() => {
     
    const checkProfileId = allPosts.find((x) => {
       if (x.user && x.user.username === userSlug) {
         return true
       } else {
         return false
       }
     }) || []
      console.log(checkProfileId)
    
    if (checkProfileId.user) {
         fetch(`https://api-minireseausocial.mathis-dyk.fr/users/${checkProfileId.user.id}`, {
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
         fetch(`https://api-minireseausocial.mathis-dyk.fr/posts?user.id=${checkProfileId.user.id}`, {
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
          }
       }, [allPosts, userSlug, token, dispatch]);

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
          <Card title={`${x.user.username}`} bordered={false}>
             <p>{x.text}</p>
            {(x.like === null ? 0 : x.like)}
          </Card>
        </div>
    ))}
    </>
  );
};
export default OtherProfile;
import React, { useEffect } from "react";

import { uploads } from "../../utils/config";

import Message from "../../components/Message";
import { Link, useParams } from "react-router-dom";
import { BsFillEyeFill, BsFillPenFill, BsXLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../slices/userSlices";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  //load user data
  useEffect(() => {
    console.log(id)
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  if(loading) {
    return <p>Carregando...</p>
  }

  return <div id="profile">
      <div className="profile-Header">
          {user.profileImage && (
            <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
          )}
          <div className="profile-description">
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
          </div>
      </div>
    </div>;
};

export default Profile;

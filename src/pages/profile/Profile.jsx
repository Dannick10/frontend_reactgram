import React, { useEffect, useRef } from "react";
import "./profile.css"
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

  const newPhotoForm = useRef()
  const editPhotoForm = useRef()

  const submithandle = (e) => {
    e.preventDefualt()
  }

  if(loading) {
    return <p>Carregando...</p>
  }

  return <div id="profile">
      <div className="profile-header">
          {user.profileImage && (
            <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
          )}
          <div className="profile-description">
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
          </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
              <h2>Compartilhe algum momento seu</h2>
              <form onSubmit={submithandle}>
                <label>
                  <span>Titulo para a foto</span>
                  <input type="text" placeholder="Insira um Titulo" />
                </label>
                <label>
                    <span>Image:</span>
                    <input type="file" />
                </label>
                <input type="submit" value="postar" />
              </form>
          </div>
        </>
      )}
    </div>;
};

export default Profile;

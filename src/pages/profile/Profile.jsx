import React, { useEffect, useRef, useState } from "react";
import "./profile.css";
import { uploads } from "../../utils/config";

import Message from "../../components/Message";
import { Link, useParams } from "react-router-dom";
import { BsFillEyeFill, BsFillPenFill, BsXLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../slices/userSlices";
import { object } from "zod";
import { getUserPhotos, publishPhoto, reset } from "../../slices/photoSlice";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: MessagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  console.log(errorPhoto);

  const [title, SetTitle] = useState("");
  const [image, SetImage] = useState("");

  //load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  const submithandle = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    setTimeout(() => {
      dispatch(reset());
    }, 3000);
  };

  const handleFile = (e) => {
    const image = e.target.files[0];

    SetImage(image);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="profile">
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
                <input
                  type="text"
                  placeholder="Insira um Titulo"
                  onChange={(e) => SetTitle(e.target.value)}
                  value={title}
                />
              </label>
              <label>
                <span>Image:</span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loadingPhoto && <input type="submit" value="postar" />}
              {loadingPhoto && <input type="submit" value="aguarde" disabled />}
            </form>
            {errorPhoto && <Message type={"error"} msg={errorPhoto} />}
            {MessagePhoto && <Message type={"sucess"} msg={MessagePhoto} />}
          </div>
        </>
      )}
      <div className="user-photos">
        <h2>Fotos Publicadas:</h2>
        <div className="photos-container">
          {photos &&
            photos?.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img src={`${uploads}/photos/${photo.image}`} />
                )}
          {id === userAuth._id ? "actions" : <Link className="btn" to={`/photos/${photo._id}`}> </Link>}
              </div>
            ))}
            {photos.length === 0 && <p>Ainda não tem fotos publicadas.</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;

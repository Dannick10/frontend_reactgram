import React, { useEffect, useRef, useState } from "react";
import "./profile.css";
import { uploads } from "../../utils/config";

import Message from "../../components/Message";
import { Link, useParams } from "react-router-dom";
import { BsFillEyeFill, BsFillPenFill, BsXLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../slices/userSlices";
import {
  deletePhoto,
  getUserPhotos,
  publishPhoto,
  reset,
  updatePhoto,
} from "../../slices/photoSlice";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
    sucess: sucessPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState();
  const [editImage, setEditImage] = useState();
  const [editTitle, setEditTitle] = useState();

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const submitHandle = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    const formData = new FormData();
    Object.entries(photoData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    dispatch(publishPhoto(formData));

    setTimeout(() => {
      dispatch(reset());
    }, 3000);
  };

  const handleFile = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

    setTimeout(() => {
      dispatch(reset());
    }, 3000);
  };

  const hideOrShow = () => {
    newPhotoForm.current.classList.toggle("hide");
    editPhotoForm.current.classList.toggle("hide");
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    };

    dispatch(updatePhoto(photoData));

    setTimeout(() => {
      dispatch(reset());

      if(sucessPhoto) hideOrShow()
    }, 3000);
  };

  const handleEdit = (photo) => {
    if (editPhotoForm.current.classList.contains("hide")) {
      hideOrShow();
    }

    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  };

  const handleCancelEdit = () => {
    hideOrShow();
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
            <form onSubmit={submitHandle}>
              <label>
                <span>Título para a foto</span>
                <input
                  type="text"
                  placeholder="Insira um Título"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loadingPhoto && <input type="submit" value="Postar" />}
              {loadingPhoto && (
                <input type="submit" value="Aguarde" disabled />
              )}
            </form>
            {errorPhoto && <Message type="error" msg={errorPhoto} />}
            {messagePhoto && <Message type="success" msg={messagePhoto} />}
          </div>

          <div className="edit-photo hide" ref={editPhotoForm}>
            <p>Editando:</p>
            {editImage && (
              <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
            )}
            <form onSubmit={handleUpdate}>
              <label>
                <span>Título para a foto</span>
                <input
                  type="text"
                  placeholder="Insira um Título"
                  onChange={(e) => setEditTitle(e.target.value)}
                  value={editTitle || ""}
                />
              </label>
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancelar edição
              </button>
              {!loadingPhoto && <input type="submit" value="Atualizar" />}
              {loadingPhoto && (
                <input type="submit" value="Aguarde" disabled />
              )}
            </form>
            {errorPhoto && <Message type="error" msg={errorPhoto} />}
            {messagePhoto && <Message type="success" msg={messagePhoto} />}
          </div>
        </>
      )}
      <div className="user-photos">
        <h2>Fotos Publicadas:</h2>
        <div className="photos-container">
          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
                )}
                {id === userAuth._id ? (
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsFillPenFill onClick={() => handleEdit(photo)} />
                    <BsXLg onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`}>
                    Ver
                  </Link>
                )}
              </div>
            ))}
          {photos.length === 0 && <p>Ainda não tem fotos publicadas.</p>}
        </div>
        {messagePhoto && <Message msg={messagePhoto} type="success" />}
      </div>
    </div>
  );
};

export default Profile;
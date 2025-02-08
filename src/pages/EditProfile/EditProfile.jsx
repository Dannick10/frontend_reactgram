import React from "react";
import "./EditProfile.css";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { resetMessage, profile, updateProfile } from "../../slices/userSlices";

import Message from "../../components/Message";
import { uploads } from "../../utils/config";

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  // states
  const [name, SetName] = useState();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const [profileImage, SetProfileImage] = useState();
  const [bio, SetBio] = useState();
  const [previewImage, SetPreviewImage] = useState();

  //load user data

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      SetName(user.name);
      SetEmail(user.email);
      SetBio(user.bio);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    //build form data

    const formdata = new FormData();

    const userFormData = Object.keys(userData).forEach((key) =>
      formdata.append(key, userData[key])
    );

    formdata.append("user", userFormData);

    await dispatch(updateProfile(formdata));

    console.log(formdata)

    setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
  };

  const handleFile = (e) => {
    //image Preview
    const image = e.target.files[0];

    SetPreviewImage(image);

    SetProfileImage(image);
  };

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre voçê
      </p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(profileImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt=""
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="nome"
          value={name || ""}
          onChange={(e) => SetName(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          disabled
          value={email || ""}
          onChange={(e) => SetEmail(e.target.value)}
        />
        <label>
          <span>Imagem do perfil:</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>bio</span>
          <input
            type="text"
            placeholder="descriçao do perfil"
            value={bio || ""}
            onChange={(e) => SetBio(e.target.value)}
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="digite sua senha"
            value={password || ""}
            onChange={(e) => SetPassword(e.target.value)}
          />
        </label>
        {!loading && <input type="submit" placeholder="atualizar" />}
        {loading && <input type="submit" value={"Aguarde..."} disabled />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="sucess" />}
      </form>
    </div>
  );
};

export default EditProfile;

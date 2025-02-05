import React from "react";
import "./EditProfile.css";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { resetMessage, profile } from "../../slices/userSlices";

import Message from "../../components/Message";

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre voçê
      </p>

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
          <input type="file" name="" id="" />
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
        <input type="submit" value="alterar" />
      </form>
    </div>
  );
};

export default EditProfile;

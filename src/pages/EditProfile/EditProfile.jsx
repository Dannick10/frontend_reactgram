import React from 'react'
import './EditProfile.css'

const EditProfile = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <div id="edit-profile">
        <h2>Edite seus dados</h2>
        <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre voçê</p>


        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="nome" />
            <input type="email" placeholder="E-mail" disabled />
            <label>
                <span>Imagem do perfil:</span>
                <input type="file" name="" id="" />
            </label>
            <label>
                <span>bio</span>
                <input type="text" placeholder="descriçao do perfil" />
            </label>
            <label>
                <input type="password" placeholder="digite sua senha" />
            </label>
            <input type="submit" value="alterar" />
        </form>
    </div>
  )
}

export default EditProfile
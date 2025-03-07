import './photo.css'
import React from 'react'

import { uploads } from '../../utils/config'


import Message from '../../components/Message'
import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPhoto } from '../../slices/photoSlice'
import PhotoItem from '../../components/photoItem'

const Photo = () => {

  const {id} = useParams()

  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {photo, loading,error,message} = useSelector((state) => state.photo)


  useEffect(() => {
    dispatch(getPhoto(id))
  },[dispatch,id])


  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id='photo'> 
        <PhotoItem photo={photo}/>
    </div>
  )
}

export default Photo
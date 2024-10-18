import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks/useField'
import icons from '../assets/icons/icon'
import { updateUser } from '../reducers/userReducer'
import '../styles/profile.css'

const ProfileView = ({ show, onclose }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const { reset: nameReset, ...name } = useField('name', 'text')
  const [selectedImage, setSelectedImage] = useState(null)
  const [showEdit, setShowEdit] = useState(false)

  const [err, setErr] = useState({ status: false, msg:'' })

  const handleEdit = () => setShowEdit(!showEdit)

  const handleErr = (message) => {
    setErr({ status: true, msg: message })
    setTimeout(() => {
      setErr({ status: false, msg:'' })
    }, 1500)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    const updatedData = {}

    if (name.value !== user.name) {
      updatedData.name = name.value
    }
    if (selectedImage) {
      updatedData.imagePath = selectedImage
    }
    if (!updatedData.name && !updatedData.imagePath) {
      handleErr('Please change (Name or Image).')
      return
    }

    dispatch(updateUser(updatedData, user.id))
    handleErr('Success')
  }

  if (!show) return null

  return (
    <div className="profile-view">
      {err.status && <div className={err.msg !== 'Success!'? 'err' : 'success'}>{err.msg}</div>}
      <div className='p-img'>
        <img
          src={selectedImage || user.imageLink || icons.profileIcon}
          alt="Profile"
          className='pr-img'
        />
      </div>
      <div className="user-name">@{user.username}</div>
      <div className="name">{user.name}</div>
      <div className="user-created">{user.createdAt}</div>
      {showEdit && <div className="edit">
        <div className="name">
          <input {...name} placeholder='Change Name' />
        </div>
        <div className="image-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-input"
          />
        </div>
        <div className="sub-btn">
          <button className="sub" onClick={handleEdit}>Hide</button>
          <button className="sub" onClick={handleSubmit}>Submit</button>
        </div>
      </div>}
      <div className="close-edit">
        {!showEdit && <button className="sub" onClick={handleEdit}>Edit</button>}
        <button className="sub" onClick={onclose}>Close</button>
      </div>
    </div>
  )
}

export default ProfileView

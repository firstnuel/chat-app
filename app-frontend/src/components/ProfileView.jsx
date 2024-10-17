import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks/useField'
import icons from '../assets/icons/icon'
import { updateUser } from '../reducers/userReducer'

const ProfileView = ({ show }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const { reset: nameReset, ...name } = useField('name', 'text', user.name || '')
  const [selectedImage, setSelectedImage] = useState(null)

  const [err, setErr] = useState({ status: false, msg:'' })

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
  }

  if (!show) return null

  return (
    <div className="profile-view">
      {err.status && <div className="err">{err.msg}</div>}
      <div className='p-img'>
        <img
          src={selectedImage || user.imageLink || icons.profileIcon}
          alt="Profile"
          className='pr-img'
        />
      </div>
      <div className="name">
        <input {...name} />
      </div>
      <div className="user-name">@{user.username}</div>
      <div className="user-created">{user.createdAt}</div>
      <div className="image-upload">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="image-input"
        />
      </div>
      <div className="sub-btn">
        <button className="sub" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default ProfileView

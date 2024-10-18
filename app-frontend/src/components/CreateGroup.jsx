import React, { useState } from 'react'
import '../styles/profile.css'

const CreateGroup = ({ userChats, onCreateGroup, isOpen, onClose }) => {
  const [groupName, setGroupName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [err, setErr] = useState({ status: false, msg:'' })

  const handleErr = (message) => {
    setErr({ status: true, msg: message })
    setTimeout(() => {
      setErr({ status: false, msg:'' })
    }, 1500)
  }

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value)
  }

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!groupName || selectedUsers.length === 0) {
      handleErr('Select at least one User')
      return
    }

    if (onCreateGroup({ groupName, members: selectedUsers })) {
      setGroupName('')
      setSelectedUsers([])
      handleErr('Success!')
    }
  }

  return (
    <dialog className="create-group" open={isOpen}>
      <form onSubmit={handleSubmit} className='d-form'>
        {err.status && <div className={err.msg !== 'Success!'? 'err' : 'success'}>{err.msg}</div>}
        <div className="form-group">
          <input
            type="text"
            id="group-name"
            value={groupName}
            onChange={handleGroupNameChange}
            placeholder="Enter group name"
            minLength="4"
            required
          />
        </div>

        <div className="form-group">
          <label>Select users to add to the group:</label>
          <div className="checkbox-list">
            {userChats.map((chat) => (
              <div key={chat.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`user-${chat.id}`}
                  value={chat.id}
                  checked={selectedUsers.includes(chat.id)}
                  onChange={() => handleCheckboxChange(chat.id)}
                />
                <label htmlFor={`user-${chat.id}`}>{chat.name}</label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="create-group-btn">
          Create Group
        </button>
        <button type="button" onClick={onClose} className="close-btn">Close</button>
      </form>
    </dialog>
  )
}

export default CreateGroup

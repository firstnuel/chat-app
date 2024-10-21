import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setReceiver } from '../reducers/receiverReducer'
import icons from '../assets/icons/icon'
import CreateGroup from './CreateGroup'
import userService from '../services/user'
import { setExpand } from '../reducers/expandReducer'
import { addGroup } from '../reducers/groupsReducer'
import '../styles/users.css'

const GroupCard = ({ group }) => {
  return (
    <div className='user-card'>
      <div className="img">
        <img src={group.imageLink || icons.groupProfile} alt="" className="profile-img" />
      </div>
      <div className="card-details">
        <div className="name">{group.name}</div>
        <div className="sent-text">See what members are saying!</div>
      </div>
    </div>
  )
}

const Groups = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const groups = useSelector(state => state.groups)
  const user = useSelector(state => state.user)
  const userChats = useSelector(state => state.userChats)
  const [isDialogOpen, setDialogOpen] = useState(false)

  const handleClick = (group) => {
    dispatch(setExpand())
    dispatch(setReceiver(group))
    navigate(`/chats/groups/${group.id}`, { replace: false })
  }

  const dt = (dateString) => dateString ? new Date(dateString) : null

  const handleCreateGroup = async ({ groupName, members }) => {
    const groupData = {
      name: groupName,
      creatorId: user.id,
      membersIds: members
    }
    try {
      const res = await userService.createGroup(groupData)
      dispatch(addGroup(res))
      return true
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <CreateGroup
        userChats={userChats}
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreateGroup={handleCreateGroup}
      />
      <div className="usrnav">
        <div className='head'>Groups</div>
        <div className='expand'>
          <img src={icons.addGroup} onClick={() => setDialogOpen(true)} className="add-icon icon" title='Add Group' />
          <img src={icons.expandIcon} className="nav-view-icon icon" />
        </div>
      </div>
      {groups.length > 0 ? (
        <div className="users">
          {[...groups].sort((a, b) => {
            const dateA = dt(a.lastMsgTime)
            const dateB = dt(b.lastMsgTime)

            // Handle null or undefined dates
            if (dateA === null && dateB === null) return 0
            if (dateA === null) return 1 // Push null to the end
            if (dateB === null) return -1 // Pull null to the end

            return dateB - dateA
          }).map(group => (
            <div key={group.id} onClick={() => handleClick(group)}>
              <GroupCard group={group} />
            </div>
          ))}
        </div>
      ) : (
        <div className="no-chat-info">
          No Groups yet
        </div>
      )}
    </>
  )
}

export default Groups

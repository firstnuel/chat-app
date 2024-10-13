import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { redirect } from 'react-router-dom'
import { useEffect } from 'react'
import { setReceiver } from '../reducers/receiverReducer'
import expandIcon from '../assets/icons/expandIcon.png'
import shrinkIcon from '../assets/icons/shrinkIcon.png'
import '../styles/users.css'


const UserCard = ({ user }) => {

  return(
    <div className='user-card'>
      <div className="img">IMG</div>
      <div className="card-details">
        <div className="name">{user.name}</div>
        <div className="text">@{user.username}</div>
      </div>
    </div>
  )

}

const Users = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()



  const users = useSelector(state => state.users)
  const filteredUsers = users.filter(usr => usr.id !== user.id)

  if(!users) return(
    <div className="users">
            No users yet
    </div>
  )

  const handleClick = (usr) => {
    dispatch(setReceiver(usr))
    navigate(`/chats/${usr.id}`, { replace: false })

  }


  return(
    <div className='user-container'>
      <div className="usrnav">
        <div className='head'>CHATS</div>
        <div className='expand'>
          <img src={expandIcon} className="nav-view-icon icon" />
        </div>
      </div>
      <div className="users" >
        {filteredUsers.map(usr =>
          <div key={usr.id} onClick={() => handleClick(usr)}>
            <UserCard key={usr.id} user={usr} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Users
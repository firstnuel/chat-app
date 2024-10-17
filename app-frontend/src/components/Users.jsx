import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setReceiver } from '../reducers/receiverReducer'
import icons from '../assets/icons/icon'
import '../styles/users.css'


const UserCard = ({ user }) => {

  return(
    <div className='user-card'>
      <div className="img">
        <img src={user.imageLink || icons.profileIcon} alt="" className="profile-img" />
      </div>
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
    <>
      <div className="usrnav">
        <div className='head'>Users</div>
        <div className='expand'>
          <img src={icons.expandIcon} className="nav-view-icon icon" />
        </div>
      </div>
      <div className="users" >
        {filteredUsers.map(usr =>
          <div key={usr.id} onClick={() => handleClick(usr)}>
            <UserCard key={usr.id} user={usr} />
          </div>
        )}
      </div>
    </>
  )
}

export default Users
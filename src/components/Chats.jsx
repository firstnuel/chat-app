import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setReceiver } from '../reducers/receiverReducer'
import { setExpand } from '../reducers/expandReducer'
import icons from '../assets/icons/icon'
import '../styles/users.css'
import { lastMsg, lastMsgTime as lt } from '../utils/lastMessage'

const ChatCard = ({ user }) => {

  return (
    <div className="user-card">
      <div className="img">
        <img src={user.imageLink || icons.profileIcon} alt="" className="profile-img" />
      </div>
      <div className="card-details">
        <div className="name">{user.name}</div>
        <div className="sent-text">… {lastMsg(user.sentMessages, user.receivedMessages)}</div>
      </div>
    </div>
  )
}

const Chats = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userChats = useSelector(state => state.userChats || [])

  const handleClick = (usr) => {
    dispatch(setReceiver(usr))
    dispatch(setExpand())
    navigate(`/chats/${usr.id}`, { replace: false })
  }

  return (
    <>
      <div className="usrnav">
        <div className="head">Chats</div>
      </div>
      {userChats.length > 0 ? (
        <div className="users">
          {userChats.length < 2 ? (
            userChats.map(usr => (
              <div key={usr.id} onClick={() => handleClick(usr)}>
                <ChatCard user={usr} />
              </div>
            ))
          ) : (
            [...userChats].sort((a, b) =>
              lt(b.sentMessages, b.receivedMessages) -
              lt(a.sentMessages, a.receivedMessages)
            ).map(usr => (
              <div key={usr.id} onClick={() => handleClick(usr)}>
                <ChatCard user={usr} />
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="no-chat-info">
          No Chats yet
        </div>
      )}
    </>
  )
}

export default Chats
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setReceiver } from '../reducers/receiverReducer'
import expandIcon from '../assets/icons/expandIcon.png'
import '../styles/users.css'
import { lastMsg } from '../utils/lastMessage'


const GroupCard = ({ group }) => {

  return(
    <div className='user-card'>
      <div className="img">IMG</div>
      <div className="card-details">
        <div className="name">{group.name}</div>
        <div className="sent-text">see what members are saying!</div>
      </div>
    </div>
  )
}
const Groups = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const groups = useSelector(state => state.groups)

  const handleClick = (group) => {
    dispatch(setReceiver(group))
    navigate(`/chats/groups/${group.id}`, { replace: false })
  }

  const dt = (dateString) => dateString ? new Date(dateString) : null

  return (
    <>
      <div className="usrnav">
        <div className='head'>Groups</div>
        <div className='expand'>
          <img src={expandIcon} className="nav-view-icon icon" />
        </div>
      </div>
      {groups.length > 0 ? (
        <div className="users">
          {[...groups].sort((a, b) => {
            const dateA = dt(a.lastMsgTime)
            const dateB = dt(b.lastMsgTime)
            if (dateA === null) return 1
            if (dateB === null) return -1

            return dateB - dateA
          }).map(group =>
            <div key={group.id} onClick={() => handleClick(group)}>
              <GroupCard key={group.id} group={group} />
            </div>
          )}
        </div>
      ) : (
        <div className="no-chat-info">
          No Group yet
        </div>
      )}
    </>
  )
}

export default Groups

import { useSelector, useDispatch } from 'react-redux'
import { useField } from '../hooks/useField'
import { useEffect, useRef } from 'react'
import { initializeChats, sendChat, LastMsgTime } from '../reducers/chatReducer'
import { initializeGroupChats , sendGroupChat } from '../reducers/groupChatReducer'
import { formatDate, isSameMinute, isSameMonthAndYear } from '../utils/dateformatter'
import userFinder from '../utils/userFinder'
import sendIcon from '../assets/icons/sendIcon.png'
import '../styles/chatbox.css'

const Chatbox = () => {

  const chatEndRef = useRef(null)
  const { reset, ...chatBox } = useField('Chat-box', 'text')

  const dispatch = useDispatch()
  const sender = useSelector(state => state.user)
  const receiver = useSelector(state => state.receiver)
  const onOnechats = useSelector(state => state.chats)
  const groupChats = useSelector(state => state.groupChat)
  const users = useSelector(state => state.users)
  const view = useSelector(state => state.view)

  const chats = view !== 'groups' ? onOnechats : groupChats

  useEffect(() => {
    if (view !== 'groups' && sender && receiver) {
      dispatch(initializeChats(sender.id, receiver.id))
    }
  }, [dispatch, sender, receiver, view])

  useEffect(() => {
    if (view === 'groups' && receiver && sender ) {
      //the receiver in this case is a group
      dispatch(initializeGroupChats(sender.id, receiver.id))
    }
  }, [dispatch, sender, receiver, view])


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats])

  const handleSend = () => {
    if (chatBox.value.trim() && receiver) {
      const chatPayload = {
        senderId: sender.id,
        content: chatBox.value,
        lastMsgTime: LastMsgTime,
      }

      if (view !== 'groups') {
        chatPayload.receiverId = receiver.id
        dispatch(sendChat(chatPayload))
      } else {
        chatPayload.groupId = receiver.id
        dispatch(sendGroupChat(chatPayload))
      }

      reset()
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend()
    }
  }

  if (!receiver) return <div className='chat-page'>
    <div className="no-chat-info"> Click on a user or group to start chat </div>
  </div>

  return (
    <div className="chat-page">
      <div className="chat-head">
        <div className="user-details">
          <div className="user-div">
            <div className="c-img">IMG</div>
            <div className="username">
              <div className="name">{receiver.name}</div>
              <div className="usr-name">@{view !== 'groups' ? receiver.username :
                receiver.name }</div>
            </div>
          </div>
          <div className="chat-stgns">...</div>
        </div>
        <div className="options"></div>
      </div>
      <div className="chats">
        {chats && chats.length > 0 ?
          chats.map(chat =>
            <div key={chat.id} className='msgdate'>
              <div className={isSameMinute(chat.createdAt, chat.lastMsgTime) ? 'hide': 'chat-time'}>{
                isSameMonthAndYear(chat.createdAt, chat.lastMsgTime) ?
                  formatDate(chat.createdAt)
                  :formatDate(chat.createdAt)} </div>
              <div className={view !== 'groups' ? (chat.senderId === sender.id ? 'sender' : 'receiver') : (chat.senderId === sender.id ? 'sender' : 'grp')}>
                {view !== 'groups'
                  ? chat.content
                  : (
                    <div className={chat.senderId === sender.id ? 'sender-grp' : 'grp-member'}>
                      <div className={chat.senderId === sender.id ? 'sender-user' : 'grp-user'}>@{userFinder(users, chat.senderId)}</div>
                      <div className={chat.senderId === sender.id ? 'sender-grp' : 'grp-member'}>{chat.content}</div>
                    </div>
                  )
                }
              </div>
              <div ref={chatEndRef} />
            </div>
          ) : <div className="chat-load">Say Hi...</div>
        }
      </div>
      <div className="chat-input">
        <input {...chatBox} onKeyDown={handleKeyPress}/>
        <img src={sendIcon} onClick={handleSend} className="send-icon" />
      </div>
    </div>
  )
}

export default Chatbox


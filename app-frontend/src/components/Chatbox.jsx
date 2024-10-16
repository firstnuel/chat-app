import { useSelector, useDispatch } from 'react-redux'
import { useField } from '../hooks/useField'
import { useEffect, useRef, useState } from 'react'
import { initializeChats, sendChat, LastMsgTime } from '../reducers/chatReducer'
import { formatDate, isSameMinute, isSameMonthAndYear } from '../utils/dateformatter'
import sendIcon from '../assets/icons/sendIcon.png'
import '../styles/chatbox.css'

const Chatbox = () => {

  const chatEndRef = useRef(null)
  const { reset, ...chatBox } = useField('Chat-box', 'text')
  // const [chatType, setChatType] = useState('onOneChat')

  const dispatch = useDispatch()
  const sender = useSelector(state => state.user)
  const receiver = useSelector(state => state.receiver)
  const chats = useSelector(state => state.chats)

  useEffect(() => {
    if (sender && receiver) {
      dispatch(initializeChats(sender.id, receiver.id))
    }
  }, [dispatch, sender, receiver])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats])

  const handlePress = (event) => {
    if (chatBox.value.trim() && receiver && event.key === 'Enter') {
      dispatch(sendChat({
        senderId: sender.id,
        receiverId: receiver.id,
        content: chatBox.value,
        lastMsgTime: LastMsgTime
      }))
      reset()
    }
  }

  const handleClick = () => {
    if (chatBox.value.trim() && receiver) {
      dispatch(sendChat({
        senderId: sender.id,
        receiverId: receiver.id,
        content: chatBox.value,
        lastMsgTime: LastMsgTime
      }))
      reset()
    }
  }
  if (!receiver) return <div className='chat-page'>
    <div className="no-chat-info"> Click on a user to start chat </div>
  </div>

  return (
    <div className="chat-page">
      <div className="chat-head">
        <div className="user-details">
          <div className="user-div">
            <div className="c-img">IMG</div>
            <div className="username">
              <div className="name">{receiver.name}</div>
              <div className="usr-name">@{receiver.username}</div>
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
              <div className={chat.senderId === sender.id ? 'sender' : 'receiver'}>{chat.content}</div>
              <div ref={chatEndRef} />
            </div>
          ) : <div className="chat-load">Say Hi...</div>
        }
      </div>
      <div className="chat-input">
        <input {...chatBox} onKeyDown={handlePress}/>
        <img src={sendIcon} onClick={handleClick} className="send-icon" />
      </div>
    </div>
  )
}

export default Chatbox
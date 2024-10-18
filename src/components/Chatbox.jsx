import { useSelector, useDispatch } from 'react-redux'
import { useField } from '../hooks/useField'
import { useEffect, useRef, useState } from 'react'
import { initializeChats, sendChat, LastMsgTime, receiveChatMessage } from '../reducers/chatReducer'
import { initializeGroupChats, sendGroupChat, receiveGroupChatMessage } from '../reducers/groupChatReducer'
import { formatDate, isSameMinute, isSameMonthAndYear } from '../utils/dateformatter'
import { deleteGroup } from '../reducers/groupsReducer'
import { resetReceiver } from '../reducers/receiverReducer'
import userFinder from '../utils/userFinder'
import icons from '../assets/icons/icon'
import io from 'socket.io-client'
import '../styles/chatbox.css'

const socket = io('http://192.168.101.110:3000')

const Chatbox = () => {
  const chatEndRef = useRef(null)
  const { reset, ...chatBox } = useField('Chat-box', 'text')
  const [preview, setPreview] = useState(false)
  const handleView = () => setPreview(!preview)
  const [menuDisplay, setMenuDisplay] = useState(false)

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
      dispatch(initializeGroupChats(sender.id, receiver.id))
    }
  }, [dispatch, sender, receiver, view])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats])

  // Socket.IO connection and message receiving
  useEffect(() => {
    if (sender && receiver) {
      socket.emit('join', { senderId: sender.id, receiverId: receiver.id })

      socket.on('receiveMessage', (message) => {
        if (view !== 'groups') {
          dispatch(receiveChatMessage(message))
        } else {
          dispatch(receiveGroupChatMessage(message))
        }
      })
      return () => {
        socket.off('receiveMessage')
        socket.emit('leave', { senderId: sender.id, receiverId: receiver.id })
      }
    }
  }, [dispatch, sender, receiver, view])

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

  const handleDropDown = () => setMenuDisplay(!menuDisplay)

  const handleDelGroup = (receiverId) => {
    setMenuDisplay(false)
    dispatch(deleteGroup(receiverId))
    dispatch(resetReceiver())
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend()
    }
  }

  if (!receiver) return (
    <div className='chat-page'>
      <div className="no-chat-info">Click on a user or group to start chat</div>
    </div>
  )

  return (
    <div className="chat-page">
      <div className="chat-head">
        <div className="user-details">
          <div className="user-div">
            <div className="c-img">
              <img src={view !== 'groups' ? (receiver.imageLink || icons.profileIcon) : (receiver.imageLink || icons.groupProfile)}
                className='profile-img pv-img' onClick={handleView} />
            </div>
            {preview && <div className="preview-img"><img src={view !== 'groups' ? (receiver.imageLink || icons.profileIcon) : (receiver.imageLink || icons.groupProfile)} 
              className='view-img' onClick={handleView} /></div>}
            <div className="username">
              <div className="name">{receiver.name}</div>
              <div className="usr-name">@{view !== 'groups' ? receiver.username : receiver.name}</div>
            </div>
          </div>
          <div className="chat-stgns">
            <div className="dropbtn" onClick={handleDropDown}>...</div>
            <div id="myDropdown" className={menuDisplay ? 'dropdown-content' : 'hide'}>
              <div className="d-content">Clear Chats</div>
              {view === 'groups' && <div className="d-content">Exit Group</div>}
              {view === 'groups' && <div className="d-content" onClick={() => handleDelGroup(receiver.id)}>Delete Group</div>}
            </div>
          </div>
        </div>
        <div className="options"></div>
      </div>
      <div className="chats">
        {chats && chats.length > 0 ?
          chats.map(chat =>
            <div key={chat.id} className='msgdate'>
              <div className={isSameMinute(chat.createdAt, chat.lastMsgTime) ? 'hide' : 'chat-time'}>
                {isSameMonthAndYear(chat.createdAt, chat.lastMsgTime) ? formatDate(chat.createdAt) : formatDate(chat.createdAt)}
              </div>
              <div className={view !== 'groups' ? (chat.senderId === sender.id ? 'sender' : 'receiver') : (chat.senderId === sender.id ? 'sender' : 'grp')}>
                {view !== 'groups'
                  ? chat.content
                  : (
                    <div className={chat.senderId === sender.id ? 'sender-grp' : 'grp-member'}>
                      <div className={chat.senderId === sender.id ? 'sender-user' : 'grp-user'}>@{userFinder(users, chat.senderId)}</div>
                      <div className={chat.senderId === sender.id ? 'sender-grp' : 'grp-member'}>{chat.content}</div>
                    </div>
                  )}
              </div>
              <div ref={chatEndRef} />
            </div>
          ) : <div className="chat-load">Say Hi...</div>
        }
      </div>
      <div className="chat-input">
        <input {...chatBox} onKeyDown={handleKeyPress} />
        <img src={icons.sendIcon} onClick={handleSend} className="send-icon" />
      </div>
    </div>
  )
}

export default Chatbox

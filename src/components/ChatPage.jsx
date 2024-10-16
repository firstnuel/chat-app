import Chatbox from './Chatbox'
import Nav from './Nav'
import '../styles/chatpage.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import View from './View'


const ChatPage = () => {

  const navigate = useNavigate()
  const user =  useSelector(state => state.user)

  useEffect(() => {
    if(!user) navigate('/login')
  }, [user, navigate])

  return (
    <div className="chatpage">
      <div className="chat-area">
        <Nav />
        <View />
        <Chatbox />
      </div>
    </div>
  )
}

export default ChatPage
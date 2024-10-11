import Chatbox from './Chatbox'
import Users from './Users'
import Nav from './Nav'
import '../styles/chatpage.css'



const ChatPage = () => {



  return (
    <div className="chatpage">
      <div className="chat-area">
        <Nav />
        <Users />
        <Chatbox />
      </div>
    </div>
  )
}

export default ChatPage
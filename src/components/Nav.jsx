import '../styles/nav.css'
import chatIcon from '../assets/icons/chatIcon.png'
import groupIcon from '../assets/icons/groupIcon.png'
import searchIcon from '../assets/icons/searchIcon.png'
import userIcon from '../assets/icons/userIcon.png'
import logoutIcon from '../assets/icons/logoutIcon.png'
import logoIcon from '../assets/icons/logoIcon.png'



const Nav = () => {
  return(
    <div className="nav">
      <div className="lg-icon"><img src={logoIcon} title="Chat" className="logo-icon" /></div>
      <div className="menu">
        <div className="chat"><img src={chatIcon} title="Chat" className="icon" /></div>
        <div className="group"><img src={groupIcon} title="Groups" className="icon" /></div>
        <div className="search"><img src={searchIcon} title="Search" className="icon" /></div>
        <div className="user-st"><img src={userIcon} title="User" className="icon" /></div>
      </div>
      <div className="log-out"><img src={logoutIcon} title="Log Out" className="icon" /></div>
    </div>
  )
}

export default Nav
import '../styles/nav.css'
import icons from '../assets/icons/icon'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'


const Nav = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useSelector(state => state.theme)

  const handleLogOut = () => {
    dispatch(logOut())
    navigate('/login')
  }


  return(
    <div className="nav">
      <div className="lg-icon"><img src={icons.logoIcon} title="Buzz-Me" className="logo-icon" /></div>
      <div className="menu">
        <div className="chat"><img src={theme === 'dark' ? icons.chatIcon :
          icons.darkChatIcon
        } title="Chat" className="icon" /></div>
        <div className="group"><img src={theme === 'dark' ? icons.groupIcon :
          icons.darkGroupIcon
        } title="Groups" className="icon" /></div>
        <div className="search"><img src={theme === 'dark' ? icons.searchIcon :
          icons.darkSearchIcon
        } title="Search" className="icon" /></div>
        <div className="user-st"><img src={theme === 'dark' ? icons.userIcon :
          icons.darkUserIcon
        } title="User" className="icon" /></div>
      </div>
      <div className="log-out">
        <ThemeToggle />
        <img src={theme === 'dark' ? icons.logoutIcon :
          icons.darkLogoutIcon
        } onClick={handleLogOut}title="Log Out" className="icon" /></div>
    </div>
  )
}

export default Nav
import '../styles/nav.css'
import icons from '../assets/icons/icon'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { viewChats, viewUsers, viewGroups } from '../reducers/viewReducer'
import { resetReceiver, setReceiver } from '../reducers/receiverReducer'

const Nav = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useSelector(state => state.theme)
  const updateUrl = (newView) => window.history.replaceState(null, '', `/${newView}`)

  const handleLogOut = () => {
    dispatch(logOut())
    navigate('/login')
  }

  const handleChats = () => {
    updateUrl('chats')
    dispatch(resetReceiver())
    dispatch(viewChats())
  }

  const handleUsers = () => {
    updateUrl('users')
    dispatch(resetReceiver())
    dispatch(viewUsers())
  }

  const handleGroups = () => {
    updateUrl('groups')
    dispatch(resetReceiver())
    dispatch(viewGroups())
  }

  return(
    <div className="nav">
      <div className="lg-icon"><img src={icons.logoIcon} title="Buzz-Me" className="logo-icon" /></div>
      <div className="menu">
        <div className="chat"><img src={theme === 'dark' ? icons.chatIcon :
          icons.darkChatIcon
        } title="Chats" className="icon" onClick={handleChats}/></div>

        <div className="user-st"><img src={theme === 'dark' ? icons.userIcon :
          icons.darkUserIcon
        } title="Users" className="icon"  onClick={handleUsers}/></div>

        <div className="group"><img src={theme === 'dark' ? icons.groupIcon :
          icons.darkGroupIcon
        } title="Groups" className="icon" onClick={handleGroups}/></div>

        <div className="search"><img src={theme === 'dark' ? icons.searchIcon :
          icons.darkSearchIcon
        } title="Search" className="icon" /></div>

      </div>
      <div className="log-out">
        <ThemeToggle />
        <img src={theme === 'dark' ? icons.logoutIcon :
          icons.darkLogoutIcon
        } onClick={handleLogOut} title="Log Out" className="icon" /></div>
    </div>
  )
}

export default Nav
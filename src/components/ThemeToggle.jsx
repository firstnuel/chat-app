import { useEffect } from 'react'
import lightIcon from '../assets/icons/lightIcon.png'
import darkIcon from '../assets/icons/darkIcon.png'
import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from '../reducers/themeReducer'

const ThemeToggle = () => {
  const theme = useSelector(state => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    dispatch(setTheme())
  }

  const currentIcon = theme === 'dark' ? lightIcon : darkIcon

  return (
    <div onClick={toggleTheme} >
      <img src={currentIcon} alt="Toggle theme icon" className="icon" />
    </div>
  )
}

export default ThemeToggle

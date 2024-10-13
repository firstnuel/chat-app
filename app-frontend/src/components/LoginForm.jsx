import { useField } from '../hooks/useField'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import logoIcon from '../assets/icons/logoIcon.png'
import '../styles/login.css'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { useNavigate } from 'react-router-dom'
import { clearError } from '../reducers/errorReducer'
import ThemeToggle from './ThemeToggle'

const LoginForm = () => {

  const { reset: usernameReset, ...username } = useField('Username', 'text')
  const { reset: passwordReset, ...password } = useField('Password', 'password')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const error = useSelector(state => state.error)
  const style = error.status ? { color: 'red' } : { color: 'white' }
  const typedElement = useRef(null)

  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(clearError())
    dispatch(loginUser({ username: username.value, password: password.value }))

    if (user) {
      usernameReset()
      passwordReset()
    }
  }
  useEffect(() => {
    if(user) navigate('/')
  }, [user, navigate])

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: ['Connect.', 'Chat..', 'Hangout...'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <div className="loginPage">
      <div className="logo-nav">
        <div className="logo-text">
          <div className="main-logo">
            <img src={logoIcon} className="main-logo-icon" /></div>
          <div className="main-text">Buzz-Me</div>
        </div>
        <ThemeToggle />
      </div>
      <div className="container">
        <div className="form-container">
          <div className='login form'>
            <h1 className='w-head wlcome'>Welcome Back</h1>
            <h2 className='w-body wlcome' style={error.status? style : null} >{error.status? error.msg
              :'Log into your account'}</h2>
            <form onSubmit={handleLogin}>
              <div>
                <input {...username}
                  placeholder='username'
                  autoComplete="username" />
              </div>
              <div>
                <input {...password}
                  autoComplete="current-password"
                  placeholder='password'
                  type="password" />
              </div>
              <div className="button-div">
                <button type="submit">login</button>
              </div>
              <div className="sign-up">Dont have an account?
                <a href="/signup"  className="sign-up-link"> Sign Up</a></div>
            </form>
          </div>
        </div>
        <div className="welocme">
          <div><img src={logoIcon} className="main-logo-icon" /></div>
          <span className="page-text" ref={typedElement}></span>
        </div>
      </div>
      <div className="footer">
        <div className="footer-text">right reserved Emmanuel Ikwunna</div>
      </div>
    </div>

  )
}

export default LoginForm
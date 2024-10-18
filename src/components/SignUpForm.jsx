import { useField } from '../hooks/useField'
import userService from '../services/user'
import logoIcon from '../assets/icons/logoIcon.png'
import '../styles/login.css'
import { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, setError } from '../reducers/errorReducer'
import ThemeToggle from './ThemeToggle'

const SignUpForm = () => {
  const error = useSelector(state => state.error)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const style = error.status ? { color: 'red' } : { color: 'white' }

  const { reset: nameReset, ...name } = useField('Name', 'text')
  const { reset: usernameReset, ...username } = useField('Username', 'text')
  const { reset: emailReset, ...email } = useField('Email', 'email')
  const { reset: passwordReset, ...password } = useField('Password', 'password')
  const typedElement = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    dispatch(clearError())

    const newUser = {
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value
    }

    try {
      const user = await userService.create(newUser)
      if (user) {
        nameReset()
        usernameReset()
        emailReset()
        passwordReset()
        navigate('/login') // Navigate to login after successful signup
      }
    } catch (error) {
      dispatch(setError(error))
      console.error('Error creating user:', error)
    } finally {
      setIsLoading(false)
    }
  }

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

  const handleLoginClick = () => {
    navigate('/login') // Navigate to login page
  }

  return (
    <div className="loginPage">
      <div className="logo-nav">
        <div className="logo-text">
          <div className="main-logo">
            <img src={logoIcon} className="main-logo-icon" />
          </div>
          <div className="main-text">Buzz-Me</div>
        </div>
        <ThemeToggle />
      </div>
      <div className="container">
        <div className="form-container">
          <div className='login form'>
            <h1 className='w-head wlcome'>Join Us</h1>
            <h2 style={error.status ? style : null} className='w-body wlcome'>
              {error.status ? error.msg : 'Create your account'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input {...name} placeholder="name" autoComplete="name" />
              </div>
              <div>
                <input {...username} placeholder="username" autoComplete="username" minLength={5} />
              </div>
              <div>
                <input {...email} placeholder="email" autoComplete="email" type="email" />
              </div>
              <div>
                <input {...password} placeholder="password" type="password" autoComplete="new-password" minLength={5} />
              </div>
              <div className="button-div">
                <button className={isLoading ? 'loading' : 'null'}
                  disabled={isLoading ? true : false}
                  type="submit">{isLoading ? 'creating..' : 'sign up'}</button>
              </div>
              <div className="sign-up">Already have an account?
                <a href=""className="sign-up-link" onClick={handleLoginClick}> Log In</a></div>
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

export default SignUpForm

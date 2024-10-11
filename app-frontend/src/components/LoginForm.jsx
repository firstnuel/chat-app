import { useField } from '../hooks/useField'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {

  const { reset: usernameReset, ...username } = useField('Username', 'text')
  const { reset: passwordReset, ...password } = useField('Password', 'password')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username: username.value, password: password.value }))
    usernameReset()
    passwordReset()
  }

  return (
    <div className='login form'>
      <h2>log into application</h2>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input {...username}
            autoComplete="username" />
        </div>
        <div>
            password
          <input {...password}
            autoComplete="current-password"
            type="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
import { useField } from '../hooks/useField'
import userService from '../services/user'


const SignUpForm = () => {

  const { reset: nameReset, ...name } = useField('Name', 'text')
  const { reset: usernameReset, ...username } = useField('Username', 'text')
  const { reset: emailReset, ...email } = useField('Email', 'email')
  const { reset: passwordReset, ...password } = useField('Password', 'password')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value
    }
    const user = await userService.create(newUser)
    console.log(user)
  }

  return(
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="contact-form" >
        <div>
                    Username: <input {...username} minLength={5} />
        </div>
        <div>
                    Name: <input {...name} minLength={5} />
        </div>
        <div>
                    Email: <input {...email} />
        </div>
        <div>
                    Password: <input {...password} />
        </div>
        <div className="button-div">
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}


export default SignUpForm
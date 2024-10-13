import LoginForm from './components/LoginForm'
import { fetchUsers } from './reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchAndSetUser } from './reducers/userReducer'
import { redirect, Route, Routes, useNavigate } from 'react-router-dom'
import SignUpForm from './components/signUpForm'
import ChatPage from './components/ChatPage.jsx'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const signUp = useSelector((state) => state.signUp)

  useEffect(() => {
    dispatch(fetchAndSetUser())
  }, [dispatch])

  useEffect(() => {
    if (user) dispatch(fetchUsers())
  }, [dispatch, user])


  return(
    <>
      <Routes>
        <Route path="/" element={<ChatPage /> } />
        <Route path='/chats/:id' element={<ChatPage />}/>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </>
  )
}


export default App
import LoginForm from './components/LoginForm'
import { fetchUsers } from './reducers/usersReducer'
import { fetchUsersChats } from './reducers/userChatsReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchAndSetUser } from './reducers/userReducer'
import { fetchGroups } from './reducers/groupsReducer.js'
import { Route, Routes, Navigate } from 'react-router-dom'
import SignUpForm from './components/signUpForm'
import ChatPage from './components/ChatPage.jsx'


const App = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const chats = useSelector((state) => state.chats)

  useEffect(() => {
    dispatch(fetchAndSetUser())
  }, [dispatch])

  useEffect(() => {
    if (user) dispatch(fetchUsersChats(user.id))
  }, [dispatch, user, chats])

  useEffect(() => {
    if (user) dispatch(fetchUsers())
  }, [dispatch, user])

  useEffect(() => {
    if (user) dispatch(fetchGroups())
  }, [dispatch, user])

  return(
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/chats" /> } />
        <Route path='/chats/:id' element={<ChatPage />}/>
        <Route path='/chats/groups/:id' element={<ChatPage />}/>
        <Route path='/chats' element={<ChatPage />}/>
        <Route path='/users' element={<ChatPage />}/>
        <Route path='/groups' element={<ChatPage />}/>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </>
  )
}


export default App
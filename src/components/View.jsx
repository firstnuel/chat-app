import Users from './Users'
import Chats from './Chats'
import Groups from './Group'
import { useSelector } from 'react-redux'
import '../styles/users.css'



const View = () => {

  const view = useSelector(state => state.view)

  return(
    <div className='user-container'>
      {view === 'chats'? <Chats />
        : view === 'users'? <Users />
          : <Groups />
      }

    </div>
  )
}

export default View
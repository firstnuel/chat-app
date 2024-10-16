import Users from './Users'
import Chats from './Chats'
import { useSelector } from 'react-redux'
import '../styles/users.css'



const View = () => {

  const view = useSelector(state => state.view)

  return(
    <div className='user-container'>
      {view === 'chats'? <Chats />
        : <Users />
      }

    </div>
  )
}

export default View
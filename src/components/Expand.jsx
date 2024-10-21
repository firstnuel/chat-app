import { useDispatch, useSelector } from 'react-redux'
import { setExpand } from '../reducers/expandReducer'
import icons from '../assets/icons/icon'



const Expand = () => {

  const dispatch = useDispatch()
  const expand = useSelector(state => state.expand)

  const handleExpand = () => dispatch(setExpand())


  return(
    <div className='expand'>
      <img src={expand? icons.shrinkIcon : icons.expandIcon}
        onClick={handleExpand}
        className="nav-view-icon icon" />
    </div>
  )
}

export default Expand
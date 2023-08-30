import {useSelector, useDispatch} from 'react-redux';
import {toggleLogReg} from '../../utils/authActions';

import './logRegToggle.style.css'

const LogRegToggle =()=>{
    const isToggleLogReg = useSelector((state)=> state.auth.isToggleLogReg);
    const dispatch = useDispatch()
    const handleToggleClick =()=>{
      dispatch(toggleLogReg())
    }
    return(

        <>

{isToggleLogReg ? <div className="gxtrade"><span>Don't have an account?</span><p onClick={handleToggleClick}>Sign-up</p></div>:<div className="gxtrade"><span>Already have an account?</span><p onClick={handleToggleClick}>Log In</p></div>}
        </>
    )
}

export default LogRegToggle
import {useLocation, Navigate, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { selectCurrentToken } from './authActions'


const RequireAuth = () => {
    // const userdata = localStorage.getItem("userdata");
    const token = localStorage.getItem("accessToken")
    // const token = useSelector(selectCurrentToken)
    const location = useLocation()
    // const token = null


    return (

        token ? <Outlet /> : <Navigate to='/auth' state={{from: location}} replace />
    )
}
export default RequireAuth
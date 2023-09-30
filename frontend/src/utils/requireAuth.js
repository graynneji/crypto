import {useLocation, Navigate, Outlet} from 'react-router-dom'



const RequireAuth = () => {

    const storedUser = sessionStorage.getItem("user")

    const location = useLocation()


    return (

        storedUser ? <Outlet /> : <Navigate to='/auth' state={{from: location}} replace />
    )
}
export default RequireAuth
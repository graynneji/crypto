import './dashboard.style.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';


const Dashboard = () =>{
const [error, setError] = useState(null)
const accessToken = useSelector(state => state.auth.accessToken)
const userId = useSelector((state => state.auth.userId))

useEffect( ()=>{
    const fetchUser = async ()=>{
    try{

        const res = await axios.get(`http://localhost:9000/api/v1/user${userId}`, {
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
         })
         console.log(res.data)
        }catch(err){
setError(err.response.data.message)
        }
}
    fetchUser()
}, [accessToken, userId])
    return (

        <div>
<h1>{error}</h1>
        </div>
    )
}

export default Dashboard
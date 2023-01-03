import React from 'react'
import { useState ,useEffect} from 'react';
import axios from 'axios'

const Auth = (code) => {
    const [accessToken,setAccessToken]=useState();
    const [refreshToken,setRefreshToken]=useState();
    const [expiresIn,setExpiresIn]=useState();

    useEffect(()=>{
        axios.post('http://localhost:3001/spotifyLogin',{code}).then((res)=>{
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            //removing all the line after localhost:3000
            window.history.pushState({},null,'/');
            console.log(res.data);
        }).catch((err)=>{//since the code expires after sometime of login , hence login once again to attain new one
            // window.location="/"
            // console.log('Error in Auth.js:',err);
        })
    },[code])

    useEffect(()=>{
        if(!refreshToken || !expiresIn) return

        const interval=setInterval(()=>{
            axios.post('http://localhost:3001/refresh',{refreshToken}).then((res)=>{
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
        }).catch((err)=>{//since the code expires after sometime of login , hence login once again to attain new one
            // window.location="/"
            // console.log('Error in Auth.js:',err);
        })
        },(expiresIn - 60)*1000)
        
        return ()=>clearInterval(interval)

    },[refreshToken,expiresIn])

  return (
    accessToken
  )
}

export default Auth
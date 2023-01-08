import React from 'react'
//css
import '../css/SpotifyLogin.css'
//Import
import SpotifyBack from '../assets/spotifyback.png'
//Allowed Redirect URI in Spotify2 in Developer Dashboard
// const redirect_uri="http://localhost:3000"
const redirect_uri=window.location.href;
//Client ID in Spotify2 in Developer Dashboard
const clientId="78d07a7eeacf40f88a43d72a7036b3ff"

const AUTH_URL=`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirect_uri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

const Spotifylogin = () => {
    const gotoSpotifyLogin=()=>{
        window.location.href=AUTH_URL;
    }
  return (
    <div className='spotifyLoginMain'>
      <div className='spotifyLoginMainDiv'>
      <img className='spotifyLoginPhoto' src={SpotifyBack}/>
        <button className='spotify-login-btn' onClick={()=>{gotoSpotifyLogin()}}>Login With Spotify</button>
        </div>
    </div>
        
  )
}

export default Spotifylogin
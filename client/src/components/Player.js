import React from 'react'
//using react-spotify-web-playback NPM Package
import SpotifyPlayer from 'react-spotify-web-playback'

const Player = ({accessToken,trackUri}) => {
    if(!accessToken) return null
  return (
    <SpotifyPlayer token={accessToken} showSaveIcon uris={trackUri?[trackUri]:[]}/>
  )
}

export default Player
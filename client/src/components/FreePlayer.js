import React from 'react'
import '../css/FreePlayer.css'

const FreePlayer = () => {
  return (
<div className='freePlayerMain' style={{display:'flex',justifyContent:'center'}}> 
<iframe className='dashboardIframe' height='100'  className='freeiFrame' src="https://embed.spotify.com/?uri=spotify:track:561jH07mF1jHuk7KlaeF0s" name="targetframe" allowTransparency="true" scrolling="no" frameborder="0" >
    </iframe></div>
  )
}

export default FreePlayer
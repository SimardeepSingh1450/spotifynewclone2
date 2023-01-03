import React from 'react'
//css
import '../css/TrackSearchResult.css'
const TrackSearchResult = ({track,chooseTrack}) => {
    function handlePlay(){
        chooseTrack(track);
    }

  return (
    <div onClick={()=>{handlePlay(track)}} className='trackmainDiv'>
        <img className='track-image' src={track.albumUrl}/>
        <div>
            <p className='trackTitle'>{track.title}</p>
            <p className='trackArtist'>{track.artist}</p>
        </div>
    </div>
  )
}

export default TrackSearchResult
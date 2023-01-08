import React, { useEffect, useState } from 'react'
import axios from 'axios'
//importing Auth Component
import Auth from './Auth'
//css
import '../css/Dashboard.css'
//Importing spotify-web-api-node
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import FreePlayer from './FreePlayer';
//importing react-icons
import {BsSpotify} from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'
//CONSOLE LOG LINE 38 & 26 FOR REVIEWING RECIEVED ARRAY DATA

const spotifyApi=new SpotifyWebApi({
    clientId:'78d07a7eeacf40f88a43d72a7036b3ff'
})


const Dashboard = ({code}) => {
    const accessToken=Auth(code);
    const [searchSong,setSearchSong]=useState('');
    const [searchResults,setSearchResults]=useState([]);
    const [embedUri,setEmbedUri]=useState();

    // console.log(searchResults);

    useEffect(()=>{
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken);
    },[accessToken])

    useEffect(()=>{
        if(!searchSong) return setSearchResults([])
        if(!accessToken) return 

        spotifyApi.searchTracks(searchSong).then(res=>{
            // console.log('All Items Details :',res.body.tracks.items);
            setSearchResults(res.body.tracks.items.map(track=>{
                return {
                    artist:track.artists[0].name,
                    title:track.name,
                    uri:track.uri,
                    albumUrl:track.album.images[0].url
                }
            }))
        });

    },[searchSong,accessToken])

    const getIframe=async()=>{
        window.open(`${embedUri}`,"_blank")
    }

    const chooseTrack=async(track)=>{
        // console.log(track);
        const trackUri=track.uri;
        // setCurrentUri(trackUri);
        setEmbedUri(`https://open.spotify.com/embed?uri=${trackUri}`)
        console.log(embedUri);

    }
    

  return (
    <div className='dashboardMain'>
       <button className='listenFullSong' onClick={()=>{getIframe()}}>Listen Current Full Song <BsSpotify className='spotifyLogo'/></button>
      <div className='searchDiv'>
      <AiOutlineSearch className='searchIcon'/> <input className='songInput' onChange={(e)=>{setSearchSong(e.target.value)}} placeholder='Search Song..'/>
        </div> 
        {/* <h3>Code : {code}</h3> */}
    <div className='songsDiv'>
    {/* <h2>Songs :</h2> */}
    {searchResults.map(track=>(
        <TrackSearchResult chooseTrack={chooseTrack} track={track} key={track.uri}/>
    ))}
    </div>
    <div className='dashboardBottom'>
        {
            embedUri?<iframe className='dashboardIframe' height='200'  className='freeiFrame' src={embedUri} name="targetframe" allowTransparency="true" scrolling="no" frameborder="0" >
            </iframe>:<></>
        }
            
        
        {/* <FreePlayer/> */}
        {/* <Player accessToken={accessToken}/></div> */}
        </div>
    </div>
  )
}

export default Dashboard
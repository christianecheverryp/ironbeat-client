import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AudioPlayer from "../components/AudioPlayer"
import PlayList from '../components/PlayList'
import { getSingleListService } from '../services/playlist.services'
import Waveform from './Waveform'

function PlayListRender() {

 const [ singleList, setSingleList ] = useState(null)  // aqui tenemos que renderizar la playlist por id
    const [selectedTrack, setSelectedTrack] = useState(null)  

 const { id } = useParams()
 const navigate = useNavigate();


 useEffect(() => {
    getSingleList()
 }, []) 

 const getSingleList = async () => {
    
     try{
        const response = await getSingleListService(id)   
        setSingleList(response.data.list) 
        setSelectedTrack(response.data.list[0])
     }catch(err){
        navigate("/error")
     }
 }
 if(!singleList || !selectedTrack){
     return <p>...Loading</p>
 }

  return (
    <div>
    <h2>Hellooo</h2>
    



         {/* <Waveform url={selectedTrack.audioUrl} />  PASAR LA URL DE LA CANCIONES  */}
         <AudioPlayer eachSong={selectedTrack} />
         <PlayList singleList={singleList} selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack}/> 
         


    </div>
  )
}

export default PlayListRender

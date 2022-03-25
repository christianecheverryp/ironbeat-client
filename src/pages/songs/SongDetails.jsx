import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteSongService, getSongDetailsService } from '../../services/song.services';
import "../../images/style.css"
import AudioPlayer from '../../components/AudioPlayer';




function SongDetails(props) {


  const [ songDetail, setSongDetail ] = useState(null);
  const { id } = useParams();
  const {isLogin} = props


  







  const navigate = useNavigate();

  useEffect(()=> {
    
    getSong(); 
    
    

  }, [])

  const handleDeleteYourSong = async() => {
    try{

      await deleteSongService(id)
      console.log(id)
      navigate("/")
    }catch(err){
      navigate("/error")
    }


  }




  const getSong = async () => {
    try{

      const response = await getSongDetailsService(id)

      setSongDetail(response.data)
    }catch(err){
      if(err.response.status === 401){
        navigate("/")
      }
    }
  }
  if(!songDetail){
    return <h3>...Loading</h3>
  }


  return (
    <div className='song-details'>
    
    <h2>This is your song!</h2>
    

    
    <div className='wave-container'>
      
    <AudioPlayer eachSong={songDetail} isLogin={isLogin} />
    </div>

    <button onClick={handleDeleteYourSong}>Delete Song</button>

    

   
    
    
    </div>
  )
}

export default SongDetails
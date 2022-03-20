import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSongDetailsService } from '../../services/song.services';
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

    <p>{songDetail.title}</p>
    {/* <img src={songDetail.imgSong} alt="Img-song" width={100} /> */}
    <p>Price: {songDetail.price} €</p>

    <p>Audio: </p>
    {/* <p>Owner: {songDetail.owner.username}</p> */}
    

    
    <div className='wave-container'>
      
    <AudioPlayer eachSong={songDetail} isLogin={isLogin} />
    </div>
    

   
    
    
    </div>
  )
}

export default SongDetails
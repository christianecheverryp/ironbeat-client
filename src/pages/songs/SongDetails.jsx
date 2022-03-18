import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSongDetailsService } from '../../services/song.services';

function SongDetails() {

  const [ songDetail, setSongDetail ] = useState(null);
  const { id } = useParams();

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
    <div>
    
    <h2>This is your song!</h2>

    <p>{songDetail.title}</p>
    <img src={songDetail.imgSong} alt="Img-song" />
    <p>Price: {songDetail.price} €</p>

    <p>Audio: {songDetail.audioUrl}</p>
    <p>Owner: {songDetail.owner.username}</p>

    
    
    </div>
  )
}

export default SongDetails
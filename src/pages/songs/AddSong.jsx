import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addSongService } from '../../services/song.services'
import { uploadAlbumImgService, uploadSongService } from '../../services/upload.services'
import SongDetails from './SongDetails'



function AddSong() {

const [ title, setTitle ] = useState("")
const [ imgSong, setImgSong ] = useState("")
const [ price, setPrice ] = useState(0)
const [ audioUrl, setAudioUrl ] = useState("")
const [ imageUploading, setImageUploading ] = useState(false)
const [ audioUploading, setAudioUploading ] = useState(false)

const navigate = useNavigate();

const handleImgUpload = (e) => {
  const uploadData = new FormData();
  uploadData.append("albumImg", e.target.files[0])
  setImageUploading(true)
  uploadAlbumImgService(uploadData)
    .then(response => {
      setImageUploading(false)
      setImgSong(response.data.imageUrl);

      
    })
    .catch(err => console.log("Error while uploading the file: ", err));

}


const handleAudioUpload = (e) => {
  const uploadData = new FormData();
  uploadData.append("music", e.target.files[0])
  setAudioUploading(true)
  uploadSongService(uploadData)
    .then(response => {
      console.log(response)
      setAudioUploading(false)
      setAudioUrl(response.data.musicUrl);
      console.log("consoe", response.data)

      
    })
    .catch(err => console.log("Error while uploading the file: ", err));
}


const handleSubmit =async (e) => {
  e.preventDefault()

  try{
    await addSongService({title, imgSong, price, audioUrl})
    navigate("/")

  }catch(err){
    navigate("/error")

  }
}



  return (
    <div>

    <h3>Add your music</h3>

    <form onSubmit={handleSubmit}>

      <label htmlFor="title">Title:</label>
      <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
      <br />

      <label htmlFor="imgSong">Song picture:</label>
      <input type="file" name='imgSong' onChange={(e) => handleImgUpload(e)}/>

      { imageUploading ? <div>...Loading</div> : <img src={imgSong} alt="current-pic" width={100} />}
      <br />

      <label htmlFor="price">Price:</label>
      <input type="number" name='price' value={price} onChange={(e) => setPrice(e.target.value)}/>
      <br />

      <label htmlFor="audioUrl">Your song:</label>
      <input type="file" name='audioUrl' onChange={(e) => handleAudioUpload(e)}/>

      { imageUploading ? <div>...Loading</div> : <p>{SongDetails.audioUrl}</p>} 

    <button>Add</button>

    </form>
    
    
    
    
    
    
    </div>
  )
}

export default AddSong
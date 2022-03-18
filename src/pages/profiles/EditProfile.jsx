import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteProfileService, getMyProfileService, getUpdateService } from '../../services/user.services'

import { uploadImageService } from "../../services/upload.services"

function EditProfile() {

  const [ username, setUsername] = useState("")
  const [imgProfile, setImgProfile] = useState("")
  const [ bio, setBio] = useState("")
  const [ imageUploading, setImageUploading ] = useState(false)

  const navigate = useNavigate()

  useEffect(()=> {
    getProfile()
    



  }, [])



  const getProfile = async() => {
    try{
      const response = await getMyProfileService()
      setUsername(response.data.username)
      setImgProfile(response.data.imgProfile)
      setBio(response.data.bio)

    } catch(err){
      navigate("/error")
    }

  }


  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0])
    setImageUploading(true)
    uploadImageService(uploadData)
      .then(response => {
        console.log(response)
        setImageUploading(false)
        setImgProfile(response.data.imageUrl);
  
        
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };
 


 

 
 
 
 
  const handleSubmit = async(e) => {
    e.preventDefault()

    try{
      await getUpdateService({username, imgProfile, bio})
        // AQUI ACTUALIZAMOS PERFIL!
      navigate("/profile")
    } catch(err){
      navigate("/error")
    }

 }


 const handleClick = async() => {
   try{
     await deleteProfileService()
     localStorage.removeItem("authToken")    //AQUI ESTAMOS BORRANDO CUENTA Y BORRANDO TOKEN  REDIRECCION?? PREGUNTAR JORGE
     navigate("/signup")

   }catch(err){
     navigate("/error")
   }
 }






  return (
    <div>


    <h3>Edit your profile</h3>

    <form onSubmit={handleSubmit} encType="multipart/form-data">

    <label htmlFor="username">Username:</label>
    <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
    <br />

    <label htmlFor="imgProfile">Profile picture:</label>
    <input type="file" name='imgProfile' onChange={(e) => handleFileUpload(e)}/>
    <br />

    { imageUploading ? <div>...Loading</div> : <img src={imgProfile} alt="current-pic" width={100} />}
 
    

    <label htmlFor="bio">Bio:</label>
    <input type="text" name='bio' value={bio} onChange={(e) => setBio(e.target.value)}/>
    <br />
    <button>Update profile</button>

    <br /><br /><br /><br />






    </form>

    <button onClick={handleClick}>Delete your account</button>




    
    
    
    
    
    
    
    
    
    </div>
  )
}

export default EditProfile
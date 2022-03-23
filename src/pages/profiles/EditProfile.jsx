import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteProfileService, getMyProfileService, getUpdateService } from '../../services/user.services'

import { uploadImageService } from "../../services/upload.services"
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
    <Box component="form"sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">

      
      <TextField id="outlined-basic" label="Username" variant="outlined" />   


      <TextField
          id="outlined-multiline-flexible"
          label="Bio"
          multiline
          maxRows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />


    </Box>
    
    
    
    
  )
}

export default EditProfile
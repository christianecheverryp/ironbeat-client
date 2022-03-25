import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteProfileService, getMyProfileService, getUpdateService } from '../../services/user.services'

import { uploadImageService } from "../../services/upload.services"
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar, Button, Grid, IconButton, Input } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { PhotoCamera } from '@material-ui/icons';



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

const Input = styled('input')({
  display: 'none',
});






const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});






  return (


    <Paper
      sx={{
        p: 10,
        margin: 'auto',
        maxWidth: 600,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >


<Grid container  columnSpacing={3} rowSpacing={5}>
        <Grid item>
        
        <Avatar src={imgProfile} 
              sx={{ width: 200, height: 200 }}
            />

          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" multiple type="file" onChange={(e) => handleFileUpload(e)}/>
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
          </label>

        </Grid>


        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs >
              <TextField id="outlined-required" label="Username"
              value={username} onChange={(e) => setUsername(e.target.value)}
              />  
              </Grid>
              <Grid item xs spacing={2}>
               <TextField 
              id="outlined-multiline-static"
              label="Bio"
              multiline
              rows={4}
              
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              />   
            </Grid>


            <Grid item >
              <Button onClick={(e) => handleSubmit(e)} variant="outlined" size="medium">
                Update Profile
              </Button>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
      <br />
      <br />
<Button onClick={handleClick} size="small" >Delete account</Button>

    </Paper>



    
    
    
    
  )
}

export default EditProfile
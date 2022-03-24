import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteProfileService, getMyProfileService, getUpdateService } from '../../services/user.services'

import { uploadImageService } from "../../services/upload.services"
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar, Button, Grid, Input } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';



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














  return (

/*     <Grid container>

        <Box encType="multipart/form-data" component="form"sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">

      <Grid item>

          <Avatar src={imgProfile} 
              sx={{ width: 200, height: 200 }}
            />

          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => handleFileUpload(e)}/>
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>

      </Grid>

      <Grid item>
        <Grid item container direction="column" spacing={2}>
          <Grid item>

            <TextField id="outlined-required" label="Username"
            value={username} onChange={(e) => setUsername(e.target.value)}
            />  

              <TextField
              id="outlined-multiline-static"
              label="Bio"
              multiline
              rows={4}
              
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              />    

          </Grid>

        </Grid>
      </Grid>
       

        


         




          
          <Button variant="contained" onClick={(e) => handleSubmit(e)} component="span" >
            Update Profile
          </Button>



        </Box>


    </Grid> */
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >


<Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            {/* <Img alt="complex" src="/static/images/grid/complex.jpg" /> */}
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Standard license
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Remove
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>



    
    
    
    
  )
}

export default EditProfile
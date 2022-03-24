import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMyProfileService } from '../../services/user.services'
import "../../css/details_profile.css"
import { Avatar, Button, Grid, IconButton, Input, Paper, TextField, Typography } from '@mui/material'
import { Label, PhotoCamera } from '@material-ui/icons'

function MyProfile() {

  const [ myProfile, setMyProfile ] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {

    try{

      const response = await getMyProfileService()
      setMyProfile(response.data)
      

    }catch(err){

      if(err.response.status === 401){
        navigate("/")
      }/* else{
        navigate("/error")
      } */

    }
  }

   if (!myProfile) {
    return <h3>...Loading</h3>
  } 

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
        
        <Avatar src={myProfile.imgProfile} 
              sx={{ width: 200, height: 200 }}
            />

        </Grid>


        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs >
              <Typography variant="h5" gutterBottom component="div">
              {myProfile.username}
              </Typography>

              </Grid>

              <Grid item xs spacing={2}>
                <Typography variant="body1" gutterBottom>
                {myProfile.bio}
                </Typography>
            </Grid>


            <Grid item >
              <Button href="/profile/edit" variant="outlined" size="medium">
                Edit
              </Button>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </Paper>



    
  )
}

export default MyProfile
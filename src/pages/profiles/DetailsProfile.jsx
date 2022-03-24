import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { followService, getOtherProfile } from "../../services/user.services";
import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import "../../css/details_profile.css";
import { Box } from "@mui/system";

function DetailsProfile(props) {
  const { isLogin, logUserId, getFollowers, follows } = props;
  const { id } = useParams();
  const [otherProfile, setOtherProfile] = useState(null);
  const [follow, setFollow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
    
  }, []);

  const getProfile = async () => {
    try {
      const response = await getOtherProfile(id);
      if(!follows){
        return <div>...loading</div>
      }
      
      const followArray = follows.filter((eachFollow) => {
        return eachFollow._id.includes(id)
        })
        
       


        if (followArray.length < 1){
        setFollow(false)
        } else {
        setFollow(true)
        }


      // console.log(follows)
      // kata
      // tienen follows
      // tienen response.data con el usuario actual
      // cambiarian SetFollow a true o false

      setOtherProfile(response.data);
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/");
      }
    }
  };

  const handleFollow = async () => {
    try {
      await followService(otherProfile._id);
      setFollow(!follow);

      getFollowers();

      
      
    } catch (err) {
      navigate("/error");
    }
  };








  

  if (logUserId == id) {
    navigate("/profile");
  }

  



  if (!otherProfile) {
    return <h3>...Loading</h3>;
  }
// "container-profile-details"
  return (
/*     <div >
            <h3>Ventana del perfil de {otherProfile.username}</h3>

      <img src={otherProfile.imgProfile} alt="Profile-Picture" width={100} />
      <p>{otherProfile.username}</p>
      <p>{otherProfile.bio}</p>

      {isLogin && (
        <Button onClick={handleFollow}>{follow ? "UnFollow" : "Follow"}</Button>
      )}


    </div> */
<Box sx={{  flexGrow: 1}}>


    <Paper
    sx={{
      p: 10,
      margin: 'auto',
      maxWidth: 500,
      flexGrow: 1,
      backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    }}
  >


    <Grid  container spacing={3}  columnSpacing={7} rowSpacing={5}>
    
          <Grid item>
          
          <Avatar src={otherProfile.imgProfile} 
                sx={{ width: 200, height: 200 }}
              />

          </Grid>


          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs >
                <Typography variant="h5" gutterBottom component="div">
                {otherProfile.username}
                </Typography>

                </Grid>

                <Grid item xs spacing={2}>
                  <Typography variant="body1" gutterBottom>
                  {otherProfile.bio}
                  </Typography>
                </Grid>


              <Grid item >
                {isLogin && (
                  <Button onClick={handleFollow}>{follow ? "UnFollow" : "Follow"}</Button>
                )}

{/*                 <Button href="/profile/edit" variant="outlined" size="medium">
                  Edit
                </Button> */}
              </Grid>
            </Grid>

          </Grid>
        </Grid>
  </Paper>

  <Paper
   sx={{
      p: 10,
      margin: 'auto',
      maxWidth: 500,
      flexGrow: 1,
      backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    }}>

    




  </Paper>

</Box>
  );
}

export default DetailsProfile;

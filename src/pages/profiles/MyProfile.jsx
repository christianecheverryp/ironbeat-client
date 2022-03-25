import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getFavoritesService,
  getMyProfileService,
} from "../../services/user.services";
import "../../css/details_profile.css";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Label, PhotoCamera } from "@material-ui/icons";
import MusicIcon from "@mui/icons-material/QueueMusic";
import { getMySongsService } from "../../services/song.services";

function MyProfile() {
  const [myProfile, setMyProfile] = useState(null);
  const navigate = useNavigate();
  const [myFavouriteSongs, setFavouriteSongs] = useState(null);
  const [MySongs, setMySongs] = useState(null);

  useEffect(() => {
    getProfile();
    getMyFavouriteSongs();
    getMySongs();
  }, []);

  const getMyFavouriteSongs = async () => {
    try {
      const response = await getFavoritesService();
      setFavouriteSongs(response.data);
    } catch (err) {}
  };

  const getMySongs = async () => {
    try {
      const response = await getMySongsService();
      setMySongs(response.data);
      console.log("he", response.data)
    } catch (err) {}
  };

  const getProfile = async () => {
    try {
      const response = await getMyProfileService();
      setMyProfile(response.data);
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/");
      } /* else{
        navigate("/error")
      } */
    }
  };

  if (!myProfile || !myFavouriteSongs || !MySongs) {
    return <h3>...Loading</h3>;
  }

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Paper
        sx={{
          p: 10,
          margin: "auto",
          maxWidth: 600,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container columnSpacing={3} rowSpacing={5}>
          <Grid item>
            <Avatar
              src={myProfile.imgProfile}
              sx={{ width: 200, height: 200 }}
            />
          </Grid>

          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h5" gutterBottom component="div">
                  {myProfile.username}
                </Typography>
              </Grid>

              <Grid item xs spacing={2}>
                <Typography variant="body1" gutterBottom>
                  {myProfile.bio}
                </Typography>
              </Grid>

              <Grid item>
                <Button href="/profile/edit" variant="outlined" size="medium">
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 10,
              margin: "auto",
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            <List>
              <Typography variant="h6" gutterBottom component="div">
                My Favourites Songs
              </Typography>
              <Divider />

              {myFavouriteSongs.favorites.map((eachSong) => { // REVISAR ESTO POR SI TENEMOS FALLO OJO***************
                return (
                  <Link to={`/song/${eachSong._id}/details`}>
                  <ListItem button key={eachSong}>
                    <ListItemAvatar>
                      <Avatar src={eachSong.imgSong}/>
                    </ListItemAvatar> 
                   {/* <ListItem button key={eachSong}> */}
                 

                    <ListItemText
                      underline="none"
                      primary={eachSong.title}
                      secondary={eachSong.owner.username}
                    />
                  </ListItem>
                  </Link>
                );
              })}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper
            sx={{
              p: 10,
              margin: "auto",
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            <List>
              <Typography variant="h6" gutterBottom component="div">
                My Songs
              </Typography>
              <Divider />

              {MySongs.map((eachSong) => { // REVISAR ESTO ********************** OJOOOOOOOOOOOOOOOOOOO
                return (
                  <Link to={`/song/${eachSong._id}/details`}> 
                  <ListItem button key={eachSong}>
                    <ListItemAvatar>
                      <Avatar src={eachSong.imgSong}/>
                    </ListItemAvatar> 
                 


                    <ListItemText underline="none" primary={eachSong.title} />
                  </ListItem>
                  </Link>
                );
              })}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default MyProfile;

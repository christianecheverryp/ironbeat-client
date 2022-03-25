import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  followService,
  getOtherProfile,
  getFavoritesOtherService,
  getFavoritesService,
} from "../../services/user.services";
import {
  getMySongsService,
  getOwnerSongsService,
} from "../../services/song.services";
import {
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import "../../css/details_profile.css";
import { Box } from "@mui/system";
import MusicIcon from "@mui/icons-material/QueueMusic";

function DetailsProfile(props) {
  const { isLogin, logUserId, getFollowers, follows } = props;
  const { id } = useParams();
  const [otherProfile, setOtherProfile] = useState(null);
  const [follow, setFollow] = useState(null);

  const [mySongs, setMySongs] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();

    getMyOtherSongs();
  }, []);

  const getProfile = async () => {
    try {
      const response = await getOtherProfile(id);
      if (!follows) {
        return <div>...loading</div>;
      }

      const followArray = follows.filter((eachFollow) => {
        return eachFollow._id.includes(id);
      });

      if (followArray.length < 1) {
        setFollow(false);
      } else {
        setFollow(true);
      }

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

  const getMyOtherSongs = async () => {
    try {
      const response = await getOwnerSongsService(id);
      setMySongs(response.data);
    } catch (err) {}
  };

  if (logUserId == id) {
    navigate("/profile");
  }

  if (!otherProfile || !mySongs) {
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
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={3} columnSpacing={7} rowSpacing={5}>
          <Grid item>
            <Avatar
              src={otherProfile.imgProfile}
              sx={{ width: 200, height: 200 }}
            />
          </Grid>

          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h5" gutterBottom component="div">
                  {otherProfile.username}
                </Typography>
              </Grid>

              <Grid item xs spacing={2}>
                <Typography variant="body1" gutterBottom>
                  {otherProfile.bio}
                </Typography>
              </Grid>

              <Grid item>
                {isLogin && (
                  <Button onClick={handleFollow}>
                    {follow ? "UnFollow" : "Follow"}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

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
              Songs of {otherProfile.username}
            </Typography>
            <Divider />

            {mySongs.map((eachSong) => {
              return (
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to={`/song/${eachSong._id}/details`}
                >
                  <ListItem button key={eachSong}>
                    <ListItemAvatar>
                      <Avatar src={eachSong.imgSong} />
                    </ListItemAvatar>

                    <ListItemText underline="none" primary={eachSong.title} />
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Paper>
      </Grid>
    </Stack>
  );
}

export default DetailsProfile;

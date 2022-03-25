import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { getListService } from "../services/playlist.services";
import {
  Navigate,
  Link as RouterLink,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  Typography,
} from "@mui/material";
import { getRankingPlaysService } from "../services/song.services";

export default function TemporaryDrawer() {
  const [allPlaylist, setAllPlaylist] = useState(null);
  const navigate = useNavigate();
  const [topSongs, setTopSongs] = useState(null);
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  React.useEffect(() => {
    getRenderPlayList();
    getTopSongs();
  }, []);

  const getRenderPlayList = async () => {
    try {
      const response = await getListService();
      setAllPlaylist(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  const getTopSongs = async () => {
    try {
      const response = await getRankingPlaysService();
      setTopSongs(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  if (!allPlaylist || !topSongs) {
    return <p>...Loading</p>;
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Typography variant="h6" gutterBottom>
          PlayList
        </Typography>
        {allPlaylist.map((eachList) => (
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/${eachList._id}/playlist`}
            underline="none"
          >
            <ListItem button key={eachList}>
              <ListItemAvatar>
                <Avatar>
                  <MusicNoteIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                underline="none"
                primary={eachList.name}
                secondary={`${eachList.list.length} Songs`}
              />
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />

      <List>
        <Typography variant="h6" gutterBottom>
          Top 5
        </Typography>

        {topSongs.map((eachSong, index) => (
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/song/${eachSong._id}/details`}
          >
            <ListItem button key={eachSong._id}>
              <ListItemText primary={index + 1} secondary={eachSong.title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <QueueMusicIcon fontSize="large" />
          </Button>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

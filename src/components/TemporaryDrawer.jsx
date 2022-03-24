import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { getListService } from '../services/playlist.services';
import { Navigate } from 'react-router-dom';
import { Avatar, ListItemAvatar, Typography } from '@mui/material';

export default function TemporaryDrawer() {
    const [ allPlaylist, setAllPlaylist ] = useState(null)
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  React.useEffect(() => {
    getRenderPlayList()
  }, [])



  const getRenderPlayList = async () =>{
    try{

      const response = await getListService()
      setAllPlaylist(response.data)
    }catch(err){
      Navigate("/error")
    }
  }

  if(!allPlaylist){
    return <p>...Loading</p>
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

    <List >
        <Typography variant="h6" gutterBottom>
            PlayList
        </Typography>
        {allPlaylist.map((eachList) => (
          <ListItem button key={eachList}>
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}

            <ListItemAvatar>
          <Avatar>
            <MusicNoteIcon />
          </Avatar>
        </ListItemAvatar>
            <ListItemText primary={eachList.name} secondary={`${eachList.list.length} Songs`}/>


          </ListItem>
        ))}
    </List>


      <Divider />

      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
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


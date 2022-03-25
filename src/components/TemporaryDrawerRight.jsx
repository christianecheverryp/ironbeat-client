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
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { getListService } from '../services/playlist.services';
import { Link, Navigate } from 'react-router-dom';
import { Avatar, IconButton, ListItemAvatar, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function TemporaryDrawerRight(props) {

    const [ allPlaylist, setAllPlaylist ] = useState(null)
    const [state, setState] = useState({
        right: false,
    });
    const {follows, setFollows} = props

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  React.useEffect(() => {
  }, [])

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

    <List >
        <Typography variant="h6" gutterBottom>
            Follows
        </Typography>
        {follows.map((eachFollow) => (
            <Link style={{color:'inherit', textDecoration: 'none' }} to={`/profile/${eachFollow._id}/details`}>
                
          <ListItem button key={eachFollow}>
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}

            <ListItemAvatar>
          <Avatar src={eachFollow.imgProfile}>
             <AccountCircleIcon /> 
          </Avatar>
        </ListItemAvatar>
            <ListItemText underline="none" primary={eachFollow.username} />


          </ListItem>
            </Link>

        ))}
    </List>


      <Divider />

{/*       <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Box>
  );


  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
        
            
            <Button onClick={toggleDrawer(anchor, true)}><PeopleIcon fontSize='large'/></Button>
        
          
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
  )
}

export default TemporaryDrawerRight
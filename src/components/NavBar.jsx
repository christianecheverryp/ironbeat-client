import { NavLink, useNavigate, Link as RouterLink } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from '@mui/material/ListItemIcon';

import SearchField from "./SearchField";
// const pages = ['Products', 'Pricing', 'Blog'];
import PasswordIcon from '@mui/icons-material/Password';
import LoginIcon from '@mui/icons-material/Login';

import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { getMyProfileService } from "../services/user.services";





function NavBar(props) {
  const { isLogin, setIsLogin } = props;
  const [imgNavProfile, setImgNavProfile] = useState("")


  

  const navigate = useNavigate();

  useEffect(()=> {
    getProfile()
  }, [])
 
  const getProfile = async() => {
    try{
      const response = await getMyProfileService()
      setImgNavProfile(response.data)
      

    } catch(err){
      navigate("/error")
    }

  }



  const handleLogOut = () => {
    setIsLogin(false);
    localStorage.removeItem("authToken");

    navigate("/");
  };



  /* INICIO ESTILOS MUI */

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElUser2, setAnchorElUser2] = React.useState(null);

  // FUNCION DE BOTONES DEL NAV EN VENTANA PEQUEÑA(MOVILES)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // FUNCION CUANDO CLICKAMOS EN LA IMAGEN NAVBAR DEL PERFIL
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenUserMenu2 = (event) => {
    setAnchorElUser2(event.currentTarget);
  };

  // FUNCION DE BOTOONES DEL NAV EN VENTANA GRANDE
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseUserMenu2 = () => {
    setAnchorElUser2(null);
  };

  /* FIN ESTILOS MUI */

  return (
    <div>
      {/*         

        <NavLink to="/add-song"> <img src={add_icon} alt="AddImg" width={20}/> </NavLink>


        <NavLink to="/messages">
            <img src={message_icon} alt="MessageImg" width={20}/>
        </NavLink> 

         <NavLink to="/profile">
            <img src={profile_icon} alt="ProfileImg" width={20} />
        </NavLink>
        

        <NavLink to="/">
            <img src={home_icon} alt="HomeImg" width={20} />
        </NavLink>

        <NavLink to="/signup">
            signup
        </NavLink>

        <NavLink to="/login">
            login
        </NavLink>

        <button onClick={handleLogOut}>Logout</button> */}

      {/* INICIO ESTILOS MUI */}

      {/*         <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel control={ <Switch  checked={auth} onChange={handleChange} aria-label="login switch" /> } label={auth ? 'Logout' : 'Login'} />
      </FormGroup> 
      </Box> */}

      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>

          <SearchField /> {/* BARRA DE BUSQUEDA */}
                        
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              {/* <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    {" "}
                 
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu> */}
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              
            >
              {/* LOGO */}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>

            {/* <NavLink to="/">
              <HomeIcon fontSize="large" />
            </NavLink> */}
              {/* AQUI IBAN LOS  LINKS ANTES PODRIAMOS PONER EL LOGO AQUI */}
              <IconButton component={RouterLink}
                      to="/" size="large" color="inherit">
                <HomeIcon />
            </IconButton>



        
            </Box>








  {/* CUANDO ESTA CONECTADO */}

     
              {isLogin ?
              <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp"  src={imgNavProfile.imgProfile}/>        
                  {/* AQUI PONEMOS LA FOTO DEL USUARIO */}
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* <MenuItem onClick={handleCloseUserMenu}>
                  {" "}
           
                  <Button
                    component={RouterLink}
                    to="/add-song"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Add Song
                  </Button>
                  <NavLink to="/messages">
                    <img src={message_icon} alt="MessageImg" width={20} />
                  </NavLink>
                  <NavLink to="/profile">
                    <img src={profile_icon} alt="ProfileImg" width={20} />
                  </NavLink>
                  
                  
                  <Typography textAlign="center">
                    {" "}
                    <button onClick={handleLogOut}>Logout</button>
                  </Typography>
                </MenuItem> */}

              <MenuItem component={RouterLink}
                      to="/add-song">
                <ListItemIcon>
                  <AddIcon fontSize="small" />
                </ListItemIcon>
                  Add Song
              </MenuItem>

              <MenuItem component={RouterLink}
                      to="/messages">
                <ListItemIcon>
                  <EmailIcon fontSize="small" />
                </ListItemIcon>
                  Messages
              </MenuItem>

              <MenuItem component={RouterLink}
                      to="/profile">
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                  Profile
              </MenuItem>

              <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                  Logout
              </MenuItem>

                






              </Menu>
            </Box>
             :  <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu2} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={imgNavProfile.imgProfile} />{" "}
                  {/* AQUI PONEMOS LA FOTO DEL USUARIO */}
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser2}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser2)}
                onClose={handleCloseUserMenu2}
              >
                {/* <MenuItem onClick={handleCloseUserMenu2}>
                  {" "}

                  { FUNCIONALIDADES DEL MENU USUARIO *

                  <Typography textAlign="center">SignUp</Typography>
                  
                  <Typography textAlign="center">LogIn</Typography>

                   <Button
                    component={RouterLink}
                    to="/signup"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    SignUp
                  </Button> */}


                  {/* <Button
                    component={RouterLink}
                    to="/login"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Login
                  </Button> 

                </MenuItem>
 */}
                <MenuItem component={RouterLink}
                    to="/signup">
          <ListItemIcon>
            <PasswordIcon fontSize="small" />
          </ListItemIcon>
          Sig Up
        </MenuItem>

        <MenuItem component={RouterLink}
                    to="/login">
          <ListItemIcon>
            <LoginIcon fontSize="small" />
          </ListItemIcon>
          Login
        </MenuItem>
{/*         <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem> */}



              </Menu>
            </Box>}
            









        




            
          </Toolbar>
        </Container>
      </AppBar>

      {/* FIN ESTILOS MUI */}
    </div>
  );
}

export default NavBar;

import { NavLink, useNavigate, Link as RouterLink } from "react-router-dom"
import profile_icon from "../images/profile_icon.png"
import message_icon from "../images/message.png"
import home_icon from "../images/home_icon.png"
import add_icon from "../images/add_icon.png"
import SearchBar from "./SearchBar"



import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AccessAlarm, PagesSharp, ThreeDRotation } from '@mui/icons-material';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import SearchField from "./SearchField"



const pages = ['Add Song', 'SignUp', 'LogIn'];  // BORRAR
const links = ["/add-song", "/signup", "/login"]
const settings = ['Profile', 'Messages', 'Songs', 'Logout']; // BORRAR

function NavBar(props) {

const { isLogin, setIsLogin } = props

const navigate = useNavigate();

const handleLogOut = () => {

  setIsLogin(false)
  localStorage.removeItem("authToken")

  navigate("/")
}


/* INICIO ESTILOS MUI */

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  // FUNCION DE BOTONES DEL NAV EN VENTANA PEQUEÑA(MOVILES)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    
  };

  // FUNCION CUANDO CLICKAMOS EN LA IMAGEN NAVBAR DEL PERFIL
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    
  };

  // FUNCION DE BOTOONES DEL NAV EN VENTANA GRANDE
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  
    
 
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


 

/* FIN ESTILOS MUI */

  return (
    <div>
        <NavLink to="/profile">
            <img src={profile_icon} alt="ProfileImg" width={20} />
        </NavLink>

        <NavLink to="/add-song"> <img src={add_icon} alt="AddImg" width={20}/> </NavLink>


        <NavLink to="/messages">
            <img src={message_icon} alt="MessageImg" width={20}/>
        </NavLink> 

        <SearchBar />

        <NavLink to="/">
            <img src={home_icon} alt="HomeImg" width={20} />
        </NavLink>

        <NavLink to="/signup">
            signup
        </NavLink>

        <NavLink to="/login">
            login
        </NavLink>

        <button onClick={handleLogOut}>Logout</button>



        {/* INICIO ESTILOS MUI */}


{/*         <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel control={ <Switch  checked={auth} onChange={handleChange} aria-label="login switch" /> } label={auth ? 'Logout' : 'Login'} />
      </FormGroup> 
      </Box> */}
      
        
        <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <SearchField />            {/* BARRA DE BUSQUEDA */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (

                
                
                <MenuItem key={page} onClick={handleCloseNavMenu} >          {/* FUNCIONALIDADES DE LA BARRA NAV */}
               
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
                
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            {/* LOGO */}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            

              

              <Button component={RouterLink} to="/add-song" sx={{ my: 2, color: 'white', display: 'block' }}>
                Add Song
              </Button>

              <Button component={RouterLink} to="/signup" sx={{ my: 2, color: 'white', display: 'block' }}>
                SignUp
              </Button>

              <Button component={RouterLink} to="/login" sx={{ my: 2, color: 'white', display: 'block' }}>
                Login
              </Button>

              <Button component={RouterLink} to="/logout" sx={{ my: 2, color: 'white', display: 'block' }}>
                LogOut
              </Button>
              

            
          </Box>

          <Box sx={{ flexGrow: 0 }}>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />   {/* AQUI PONEMOS LA FOTO DEL USUARIO */}
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>   {/* FUNCIONALIDADES DEL MENU USUARIO */}
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
   




        {/* FIN ESTILOS MUI */}
        

    
    
    </div>
  )
}

export default NavBar;

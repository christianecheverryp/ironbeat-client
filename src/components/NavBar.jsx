import { NavLink, useNavigate, Link as RouterLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
import ListItemIcon from "@mui/material/ListItemIcon";

import SearchField from "./SearchField";
// const pages = ['Products', 'Pricing', 'Blog'];
import PasswordIcon from "@mui/icons-material/Password";
import LoginIcon from "@mui/icons-material/Login";

import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { getMyProfileService } from "../services/user.services";
import HeadphonesIcon from "@mui/icons-material/Headphones";

function NavBar(props) {
  const { isLogin, setIsLogin } = props;
  const [imgNavProfile, setImgNavProfile] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    isLogin && getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await getMyProfileService();
      setImgNavProfile(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  const handleLogOut = () => {
    setIsLogin(false);
    localStorage.removeItem("authToken");

    navigate("/");
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElUser2, setAnchorElUser2] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenUserMenu2 = (event) => {
    setAnchorElUser2(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseUserMenu2 = () => {
    setAnchorElUser2(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <SearchField />

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                {/* <MenuIcon /> */}
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
            <Box
              className="container-follows"
              sx={{ flexGrow: 1, display: "flex" }}
            >
              <IconButton
                component={RouterLink}
                to="/"
                size="large"
                color="inherit"
              >
                <HeadphonesIcon />
                <Typography>Ironbeat</Typography>
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <img
                className="photo-navbar"
                src="../images/headphone.jpg"
                alt=""
                width={50}
              />
            </Box>

            {isLogin ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={imgNavProfile.imgProfile} />
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
                  <MenuItem component={RouterLink} to="/add-song">
                    <ListItemIcon>
                      <AddIcon fontSize="small" />
                    </ListItemIcon>
                    Add Song
                  </MenuItem>

                  <MenuItem component={RouterLink} to="/profile">
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
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu2} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={imgNavProfile.imgProfile} />{" "}
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
                  <MenuItem component={RouterLink} to="/signup">
                    <ListItemIcon>
                      <PasswordIcon fontSize="small" />
                    </ListItemIcon>
                    Sig Up
                  </MenuItem>

                  <MenuItem component={RouterLink} to="/login">
                    <ListItemIcon>
                      <LoginIcon fontSize="small" />
                    </ListItemIcon>
                    Login
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default NavBar;

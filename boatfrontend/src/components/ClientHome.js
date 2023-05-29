import React from "react";
import {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Button} from '@material-ui/core';
import welcomebackPic from '../resources/welcome.png';
import hotelIcon from '../resources/hotel-icon.png';
import bookingIcon from '../resources/bookings-icon.png';
import logo from '../resources/logo.png';
import axios from 'axios';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const pages = ['Search Properties', 'My Bookings'];
const settings = ['Profile','Logout'];

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 50,
  },
  button: {
    borderRadius: 50,
    width: "600px",
    height: "400px",
},
}));

export default function ClientHome() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("user-name"));
  const paperStyle={padding:"60px",width:1500,margin:"20px auto"}
  const classes = useStyles();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
    if(e.currentTarget.value === 'Search Properties')
      navigate("/client-hotels");
    if(e.currentTarget.value === 'My Bookings')
      navigate("/client-bookings");
  };

  const handleCloseUserMenu = (event) => {
    if(event.target.innerText === 'Profile')
      navigate("/clientprofile");
    if(event.target.innerText === 'Logout')
      {
        localStorage.setItem("user-name", "");
        navigate("/");
      }
    setAnchorElUser(null);
  };

  useEffect(() => {
    getInfo();
  }, []);

  // Get info
  const getInfo = () => {
      if(username === "")
        navigate("/");
      axios.get("http://localhost:8080/accounts/getFirstName", { params: {
        username: username
        },})
        .then((result) => {
          console.log(result);
          console.log("res is", result.data);
          console.log("res is", result.status);
          setFirstName(result.data);
        })
        .catch(error => {
          if (error.response)
            console.log("error is", error.response.data);
        });
      axios.get("http://localhost:8080/accounts/getLastName", { params: {
          username: username
          },})
          .then((result) => {
            console.log(result);
            console.log("res is", result.data);
            console.log("res is", result.status);
            setLastName(result.data);
          })
          .catch(error => {
            if (error.response)
              console.log("error is", error.response.data);
          });
      axios.get("http://localhost:8080/accounts/getImageLink", { params: {
        username: username
        },})
        .then((result) => {
          console.log(result);
          console.log("res is", result.data);
          console.log("res is", result.status);
          setImageLink(result.data);
        })
        .catch(error => {
          if (error.response)
            console.log("error is", error.response.data);
        });
    };

  return(
    <div>
      <AppBar position="static" style={{backgroundColor: '#7DDCF0'}}>
      <Container maxWidth="50px">
        <Toolbar disableGutters>
          <img weight="90px" height="90px" src ={logo} alt='logo' />  
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                value = {page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
               {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={imageLink}/>
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

          
    <div className="homebox">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet"></link>
      <div>
        <Paper className={classes.paper} elevation={3} style={paperStyle}>
          <div className="welcome-back">
            <div>
            <img weight="130px" height="130px" src ={welcomebackPic} alt='welcome' />
            </div>
            <div className="welcome-backtext">
            <div size='large' style={{fontSize: 38, fontFamily: 'Poppins', textTransform: 'none', fontWeight: "bold", color: "#2870B2"}}>
              Welcome back {firstName} {lastName}!
            </div>  
            <div size='large' style={{fontSize: 20, fontFamily: 'Poppins', textTransform: 'none'}}>
              What would you like to view today?
            </div>  
            </div>
          </div>
        </Paper>
      </div>
      <div className="homeoptionsbox">
        <div>
        <a href="./client-hotels">
                <Button variant='contained' className={classes.button} style={{ backgroundColor: "white"}}>
                <div className="hotel-buton">
                <div>
                <img weight="250px" height="250px" src = {hotelIcon}/>
                </div>
                <div size='normal' style={{fontSize: 30, fontFamily: 'Poppins', textTransform: 'none', color: "#B8B6B6"}}>
                Properties
                </div>
                </div>
                </Button>
        </a>
        </div>
        <div>
        <a href="./client-bookings">
                <Button variant='contained' className={classes.button} style={{ backgroundColor: "white"}}>
                <div className="hotel-buton">
                <div>
                <img weight="240px" height="240px" src = {bookingIcon}/>
                </div>
                <div size='normal' style={{fontSize: 30, fontFamily: 'Poppins', textTransform: 'none', color: "#B8B6B6"}}>
                Bookings
                </div>
                </div>
                </Button>
         </a>
        </div>
      </div>
    </div>
    </div>
  );
}
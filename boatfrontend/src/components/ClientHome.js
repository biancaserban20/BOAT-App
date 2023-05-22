import React from "react";
import {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Button} from '@material-ui/core';
import welcomebackPic from '../resources/welcome.png';
import logo from '../resources/logo.png'
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

const pages = ['Search Hotels', 'My Bookings'];
const settings = ['Profile','Logout'];

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 50,
  },
  button: {
    borderRadius: 50,
    width: "500px",
    height: "350px",
},
}));

export default function ClientHome() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("user-name"));
  const paperStyle={padding:"60px",width:1500,margin:"20px auto"}
  const classes = useStyles();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    getInfo();
  }, []);

  //de incluit cu o functie generala de getinfo
  const getInfo = () => {
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
    };

  return(
    <div>
      <AppBar position="static" style={{backgroundColor: '#7DDCF0'}}>
      <Container maxWidth="50px">
        <Toolbar disableGutters>
          <img weight="90px" height="90px" src ={logo} alt='logo' />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
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
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
      <div>
        <Paper className={classes.paper} elevation={3} style={paperStyle}>
          <div className="welcome-back">
            <div>
            <img weight="120px" height="120px" src ={welcomebackPic} alt='welcome' />
            </div>
            <div size='large' style={{fontSize: 20, fontFamily: 'Poppins', textTransform: 'none'}}>
            Welcome back {firstName} {lastName} !
            </div>  
          </div>
        </Paper>
      </div>
      <div className="homeoptionsbox">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet"></link>
        <div>
        <a href="./client-hotels">
                <Button variant='contained' className={classes.button} size='large' style={{fontSize: 40, fontFamily: 'Poppins', backgroundColor: "white", textTransform: 'none'}}>Hotels</Button>
        </a>
        </div>
        <div>
        <a href="./client-bookings">
                <Button variant='contained' className={classes.button} size='large' style={{fontSize: 40, fontFamily: 'Poppins', backgroundColor: "white", textTransform: 'none'}}>Bookings</Button>
        </a>
        </div>
      </div>
    </div>
    </div>
  );
}
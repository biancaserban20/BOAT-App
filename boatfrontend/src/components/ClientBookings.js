import React from "react";
import {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Button} from '@material-ui/core';
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

export default function ClientBookings() {
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
                <Avatar src={imageLink} sx={{ width: 60, height: 60 }}/>
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
    </div>

  );
  //return <h1>Hello client {localStorage.getItem("user-name")}</h1>;
}
// import React from "react";

// export default function OwnerPropertyDetails() {
//   return <h1>Hello owner property {localStorage.getItem("property-name")} details</h1>;
// }

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Paper } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { TextField, InputLabel, InputAdornment } from "@mui/material";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import logo from '../resources/logo.png';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Search Properties', 'My Bookings'];
const settings = ['Profile','Logout'];

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function OwnerPropertyDetails() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const adminStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [rooms, setRooms] = useState([]);
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("user-name"));
  const navigate = useNavigate();

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

  async function getRooms() {
    try {
      const response = await axios.post(
        "http://localhost:8080/properties/getRooms",
        {
          name: localStorage.getItem("hotel-name"),
        }
      );
      setRooms(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    getRooms();
  }, []);

  console.log(localStorage.getItem("property-image"));

  return (
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
    <Container>
      <div className="property-container">
        <div className="property-flex">
          <img src={localStorage.getItem("property-image")} className="property2-image"></img>
          <div className="text">
            <p className="property-text-name"> {localStorage.getItem("property-name")}</p>
            <p className="property-text-location">{localStorage.getItem("property-location")}</p>
            <p className="property-text-description">{localStorage.getItem("property-description")}</p>
          </div>
        </div>
      </div>
      <div className="flex-container">
        {rooms.map((room) => (
          <div className="flex-card">
            <div className="flex-details">
              <p className="room-type"> {room.type}</p>
              <p className="room-description">{room.description}</p>
              <p className="room-price">Price: {room.price}</p>
              <p className="room-noPeople">No. of people: {room.noPeople}</p>
            </div>
            <button
              type="button"
              className="bookings-button"
            >
              Book
            </button>
          </div>
        ))}
      </div>
    </Container>
    </div>
  );
}

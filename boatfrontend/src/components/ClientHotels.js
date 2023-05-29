import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Paper,
  Modal,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import logo from '../resources/logo.png';

const pages = ['Search Properties', 'My Bookings'];
const settings = ['Profile','Logout'];

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paperStyle: {
    padding: "50px 20px",
    width: 800,
    margin: "20px auto",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
}));

export default function ClientHotels() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [type, setType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("user-name"));
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setName(e.target.value);
  };

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

  async function filterByRoleAndSort() {
    try {
      const response = await axios.post(
        "http://localhost:8080/properties/filterByAnythingProperties",
        {
          name: name,
          location: location,
          price: maxPrice,
          type: type,
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    filterByRoleAndSort();
  }, [name,location,maxPrice,type]);

    const handleCancel = () => {
      setModalOpen(false);
    };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

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
      <h1>Hotel Search</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <div className="filter-container">
      <FormControl id="outlined-basic" className="inputs" variant="outlined">
        <InputLabel>Filter by Location:</InputLabel>
        <Select
          label="Filter by Location--"
          value={location}
          onChange={handleLocationChange}
        >
          <MenuItem value={"Constanta"}>Constanta</MenuItem>
          <MenuItem value={"Costinesti"}>Costinesti</MenuItem>
          <MenuItem value={"Londra"}>Londra</MenuItem>
          <MenuItem value={"Paris"}>Paris</MenuItem>
          <MenuItem value={"Barcelona"}>Barcelona</MenuItem>
          <MenuItem value={"Rome"}>Rome</MenuItem>
        </Select>
      </FormControl>
      <FormControl id="outlined-basic" className="inputs" variant="outlined">
        <InputLabel>Filter by Type:</InputLabel>
        <Select
          label="Filter by Type--"
          value={type}
          onChange={handleTypeChange}
        >
          <MenuItem value={"Vila"}>Vila</MenuItem>
          <MenuItem value={"Hotel"}>Hotel</MenuItem>
        </Select>
      </FormControl>

      </div>
      <div className="flex-container">
        {users.map((user) => (
          <div className="flex-card" key={user.username}>
            <img src={user.image} className="profile-image" alt="Profile"></img>
            <div className="flex-details">
              <p>{user.name}</p>
              <p>{user.location}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                localStorage.setItem("property-name", user.name);
                localStorage.setItem("property-location", user.location);
                localStorage.setItem("property-description", user.description);
                localStorage.setItem("hotel-name", user.name);
                navigate("/client-hotel-details");
              }}
              className="details-button"
            >
              View details
            </button>
          </div>
        ))}
      </div>
    </Container>
    </div>
  );
};

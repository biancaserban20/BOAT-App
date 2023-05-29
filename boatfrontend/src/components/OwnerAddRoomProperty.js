import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Container,
  Paper,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import logo from "../resources/logo.png";
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

const pages = ['Manage Properties'];
const settings = ['Profile','Logout'];

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    borderRadius: 15,
    width: "130px",
  },
  paper: {
    borderRadius: 15,
  },
}));

export default function OwnerAddRoomProperty() {
  const navigate = useNavigate();
  const paperStyle = { padding: "5px 20px", width: 600, margin: "20px auto" };
  const [type, setType] = useState("");
  const [noPeople, setNoPeople] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({
    type: null,
    noPeople: null,
    price: null,
    description: null,
    err: null,
    submit: null,
  });
  const [imageLink, setImageLink] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("user-name"));

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
    if(e.currentTarget.value === 'Manage Properties')
      navigate("/owner-properties");
  };

  const handleCloseUserMenu = (event) => {
    if(event.target.innerText === 'Profile')
      navigate("/ownerprofile");
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


  function isValidNoPeople() {
    if (noPeople === "") {
      setError({ ...error, noPeople: "Number of people is required." });
      return false;
    } else if (noPeople !== "2" && noPeople !== "3") {
      setError({
        ...error,
        noPeople: "Number of people should be 2 or 3.",
      });
      return false;
    } else {
      setError({ ...error, noPeople: null });
      setSubmitted(false);
      return true;
    }
  }

  function isValidPrice() {
    if (price === "") {
      setError({ ...error, price: "Price is required." });
      return false;
    } else if (isNaN(price) === true) {
      setError({
        ...error,
        price: "Price should be a number.",
      });
      return false;
    } else {
      setError({ ...error, price: null });
      setSubmitted(false);
      return true;
    }
  }

  function isValidDescription() {
    if (description === "") {
      setError({ ...error, description: "Description is required." });
      return false;
    } else if (description.length > 55) {
      setError({
        ...error,
        description: "Description should have maximum 55 characters.",
      });
      return false;
    } else {
      setError({ ...error, description: null });
      setSubmitted(false);
      return true;
    }
  }

  // Handling the number of people change
  const handleNoPeople = (e) => {
    setNoPeople(e.target.value);
    setSubmitted(false);
  };

  // Handling the price change
  const handlePrice = (e) => {
    setPrice(e.target.value);
    setSubmitted(false);
  };

  // Handling the description change
  const handleDescription = (e) => {
    setDescription(e.target.value);
    setSubmitted(false);
  };

  // Handling the type of room change
  const handleType = (e) => {
    setType(e.target.value);
    setSubmitted(false);
  };

  console.log('localStorage.getItem("user-name")');
    console.log(localStorage.getItem("user-name"));
    console.log('localStorage.getItem("property-name")');
    console.log(localStorage.getItem("property-name"));
  // Handling the form submission
  const handleClick = (e) => {
    e.preventDefault();
    if (
      type === "" ||
      !isValidNoPeople() ||
      !isValidPrice() ||
      !isValidDescription()
    ) {
      setError({ ...error, err: "Please fill in all the fields." });
      setSubmitted(false);
    } else {
      const room = { type, noPeople, price, description };
      console.log(room);
      axios
        .put("http://localhost:8080/properties/add", {
          type: type,
          noPeople: noPeople,
          price: price,
          description: description,
          username: localStorage.getItem("user-name"),
          hotelName: localStorage.getItem("property-name")
        })
        .then((result) => {
          console.log(result);
          console.log("res is", result.data);
          console.log("res is", result.status);
          setError({ ...error, err: null, submit: result.data });
          setSubmitted(true);
        })
        .catch((error) => {
          if (error.response) console.log("error is", error.response.data);
          setError({ ...error, err: error.response.data });
          setSubmitted(false);
        });
    }
  };

  const mystyle = {
    float: "center",
    marginLeft: "150px",
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
    <Container style={mystyle}>
      <div className="boxSignLog">
        <Paper className={classes.paper} elevation={3} style={paperStyle}>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;700&display=swap"
            rel="stylesheet"
          ></link>
          <div className="loginbox">
            <div>
              <h1
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "normal",
                  color: "black",
                }}
              >
                Add a room
              </h1>
            </div>

            <div>
              <form className={classes.root} noValidate autoComplete="off">
                <FormControl
                  required
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                >
                  <InputLabel>Type Of Room</InputLabel>
                  <Select
                    label="Type Of Room--"
                    value={type}
                    onChange={handleType}
                  >
                    <MenuItem value={"Twin Room"}>Twin Room</MenuItem>
                    <MenuItem value={"Double Room"}>Double Room</MenuItem>
                    <MenuItem value={"Triple Room"}>Triple Room</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  required
                  id="outlined-basic"
                  label="Number of People"
                  variant="outlined"
                  fullWidth
                  value={noPeople}
                  onChange={handleNoPeople}
                  onBlur={isValidNoPeople}
                />
                {error?.noPeople && (
                  <h2
                    style={{
                      color: "red",
                      textAlign: "left",
                      fontSize: "small",
                    }}
                  >
                    {error?.noPeople}
                  </h2>
                )}

                <TextField
                  required
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  fullWidth
                  value={price}
                  onChange={handlePrice}
                  onBlur={isValidPrice}
                />
                {error?.price && (
                  <h2
                    style={{
                      color: "red",
                      textAlign: "left",
                      fontSize: "small",
                    }}
                  >
                    {error?.price}
                  </h2>
                )}

                <TextField
                  required
                  id="outlined-basic"
                  label="Description (max 55 characters)"
                  variant="outlined"
                  fullWidth
                  value={description}
                  onChange={handleDescription}
                  onBlur={isValidDescription}
                />
                {error?.description && (
                  <h2
                    style={{
                      color: "red",
                      textAlign: "left",
                      fontSize: "small",
                    }}
                  >
                    {error?.description}
                  </h2>
                )}
              </form>
            </div>

            <div>
              <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
                rel="stylesheet"
              ></link>
              <Button
                variant="contained"
                className={classes.button}
                size="large"
                style={{
                  fontSize: 10,
                  fontFamily: "Poppins",
                  backgroundColor: "blue",
                  color: "white",
                  marginLeft: "10px",
                  textTransform: "none",
                }}
                onClick={handleClick}
              >
                Add a room
              </Button>
            </div>
            <div>
              {!error?.submit && error?.err && (
                <h2
                  style={{ color: "red", textAlign: "left", fontSize: "small" }}
                >
                  {error?.err}
                </h2>
              )}
              {error?.submit && error?.err === null && (
                <h2
                  style={{
                    color: "green",
                    textAlign: "left",
                    fontSize: "small",
                  }}
                >
                  {error?.submit}
                </h2>
              )}
            </div>
          </div>
        </Paper>
        <div className="App-logo-sign-owner">
          <img weight="110%" height="110%" src={logo} alt="logo" />
        </div>
        <a href="/owner-property-details" className="previousPage">
          Return to previous page
        </a>
      </div>
    </Container>
    </div>
  );
}

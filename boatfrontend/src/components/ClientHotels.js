// import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { Container, Paper} from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),

//     },
//   },
// }));

// export default function ClientHotels() {
//     const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
//     const[users,setUsers]=useState([])
//     const classes = useStyles();

//     useEffect(()=>{
//       fetch("http://localhost:8080/properties/listProperties")
//       .then(res=>res.json())
//       .then((result)=>{
//         console.log(result);
//         console.log("res is", result.data);
//         console.log("res is", result.status);
//         setUsers(result);
//       }
//     )
//     },[])
//   return (

//     <Container>
//     <h1>Users</h1>

//     <Paper elevation={3} style={paperStyle}>

//       {users.map(user=>(
//         <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={user.id}>
//          Id:{user.id}<br/>
//          Name:{user.name}<br/>

//         </Paper>
//       ))
//     }

//     </Paper>

//     </Container>
//   );
// }

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Paper } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { TextField, InputLabel, InputAdornment } from "@mui/material";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import logo from "../resources/logo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const pages = ["Search Properties", "My Bookings"];
const settings = ["Profile", "Logout"];

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function ClientHotels() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const adminStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [properties, setProperties] = useState([]);
  const [imageLink, setImageLink] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("user-name"));
  const classes = useStyles();
  const [input, setInput] = useState("");
  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInput(lowerCase);
  };
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
    if (e.currentTarget.value === "Search Properties")
      navigate("/client-hotels");
    if (e.currentTarget.value === "My Bookings") navigate("/client-bookings");
  };

  const handleCloseUserMenu = (event) => {
    if (event.target.innerText === "Profile") navigate("/clientprofile");
    if (event.target.innerText === "Logout") {
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
    axios
      .get("http://localhost:8080/accounts/getImageLink", {
        params: {
          username: username,
        },
      })
      .then((result) => {
        console.log(result);
        console.log("res is", result.data);
        console.log("res is", result.status);
        setImageLink(result.data);
      })
      .catch((error) => {
        if (error.response) console.log("error is", error.response.data);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/properties/listProperties")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        console.log("res is", result.data);
        console.log("res is", result.status);
        setProperties(result);
      });
  }, []);
  const filteredData = properties.filter((el) => {
    //if no input the return the original
    if (input === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.name.toLowerCase().includes(input);
    }
  });

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#7DDCF0" }}>
        <Container maxWidth="50px">
          <Toolbar disableGutters>
            <img weight="90px" height="90px" src={logo} alt="logo" />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  value={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={imageLink} sx={{ width: 60, height: 60 }} />
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
      <h1>Search Properties</h1>
        <div className="search">
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
        <div className="flex-container">
          {filteredData.map((property) => (
            <div className="flex-card">
              <img src={property.image} className="property-image"></img>
              <div className="flex-details">
                <p className="property-name"> {property.name}</p>
                <p className="property-location">{property.location}</p>
              </div>
              <button
                type="button"
                className="rooms-button"
                href="/client-hotel-details"
                onClick={() => {
                  localStorage.setItem("property-name", property.name);
                  localStorage.setItem("property-location", property.location);
                  localStorage.setItem(
                    "property-description",
                    property.description
                  );
                  localStorage.setItem("property-image", property.image);
                  navigate("/client-hotel-details");
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

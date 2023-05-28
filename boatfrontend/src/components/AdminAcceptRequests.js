import React from 'react';
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


export default function AdminAcceptRequests() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("user-name"));
  const paperStyle={padding:"60px",width:1500,margin:"20px auto"}
  const classes = useStyles();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const[requests,setRequests]=useState([]);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function acceptOwner(request) {
    console.log(request);
    axios.put("http://localhost:8080/admins/acceptRequest", {_id: request.id})
        .then((result) => {
          console.log(result);
          console.log("res is", result.data);
          console.log("res is", result.status);
        })
        .catch(error => {
          if (error.response)
            console.log("error is", error.response.data);
        });
  }

  function declineOwner(request) {
    console.log(request);
    axios.delete("http://localhost:8080/admins/declineRequest", { params: {
      _id: request.id
    },})
        .then((result) => {
          console.log(result);
          console.log("res is", result.data);
          console.log("res is", result.status);
        })
        .catch(error => {
          if (error.response)
            console.log("error is", error.response.data);
        });
  }

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = () => {
    axios.get("http://localhost:8080/admins/getRequests", { })
      .then((result) => {
        console.log(result);
        console.log("res is", result.data);
        console.log("res is", result.status);
        setRequests(result.data);
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
        {/* <Paper className={classes.paper} elevation={3} style={paperStyle}>
          <div className="welcome-back">
            <div>
            <img weight="120px" height="120px" src ={welcomebackPic} alt='welcome' />
            </div>
            <div size='large' style={{fontSize: 30, fontFamily: 'Poppins', backgroundColor: "white", textTransform: 'none'}}>
            Welcome back {firstName} {lastName} !
            </div>  
          </div>
        </Paper> */}

        {requests.map(request=>(
        // <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={request.id}>
        //  {/* Id:{request.id}<br/> */}
        //  Name:{request.firstName}<br/>
        //  {/* Password:{user.password}<br/> */}
        //  {/* Email:{user.email}<br/> */}
        //  {/* Role:{user.role}<br/> */}
         
        //  {/* <button type="button" onClick={() => deleteUser(user.username)}>
        //     Delete account
        //  </button> */}
        
        // </Paper>
        <Paper className={classes.paper} elevation={3} style={paperStyle} key={request.id}>
          <div>
          <img weight="120px" height="120px" src ={welcomebackPic} alt='welcome'/>
          </div>
          <div size='large' style={{fontSize: 30, fontFamily: 'Poppins', backgroundColor: "white", textTransform: 'none'}}>
          <div>First Name:{request.firstName}</div>
          <div>Last Name:{request.lastName}</div>
          </div>
          <Button variant='contained' style={{fontSize: 20, fontFamily: 'Poppins', backgroundColor: "#9ACD32", color: "white", marginLeft: "10px", textTransform: 'none'}} onClick={() => acceptOwner(request)}>
          Accept
          </Button>

          <Button variant='contained' style={{fontSize: 20, fontFamily: 'Poppins', backgroundColor: "#B22222", color: "white", marginLeft: "10px", textTransform: 'none'}} onClick={() => declineOwner(request)}>
          Decline
          </Button>
        </Paper>
      ))
    }
      </div>
    </div>
  </div>
  );


  return <h1>Hello admin {localStorage.getItem("user-name")}</h1>;
}

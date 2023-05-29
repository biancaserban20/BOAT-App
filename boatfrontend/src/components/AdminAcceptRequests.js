import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Modal, Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
const pages = ['Verify Requests', 'Remove Users'];
const settings = ['Profile','Logout'];
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paperStyle: {
    padding: '50px 20px',
    width: 600,
    margin: '20px auto',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
}));

export default function AdminAcceptRequests() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [clickedUserName, setClickedUserName] = useState("");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [imageLink, setImageLink] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("user-name"));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInput(lowerCase);
  };


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    if(event.target.innerText === 'Profile')
      navigate("/adminprofile");
    if(event.target.innerText === 'Logout')
      {
        localStorage.setItem("user-name", "");
        navigate("/");
      }
    setAnchorElUser(null);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
    if(e.currentTarget.value === 'Verify Requests')
      navigate("/admin-accept-requests");
    if(e.currentTarget.value === 'Remove Users')
      navigate("/admin-delete-users");
    
  };

  async function declineOwner(ownerid) {
    console.log(ownerid);
    try {
      const result = await axios.delete(
        "http://localhost:8080/admins/declineRequest",
        {
          params: { _id: ownerid },
        }
      );
      console.log(result);
      console.log("res is", result.data);
      console.log("res is", result.status);
      fetch("http://localhost:8080/admins/getRequests")
        .then((res) => res.json())
        .then((result) => {
          setUsers(result);
        });
    } catch (error) {
      if (error.response) console.log("error is", error.response.data);
    }
  }
  
  async function acceptOwner(ownerid) {
    console.log(ownerid);
    try {
      const result = await axios.put(
        "http://localhost:8080/admins/acceptRequest",
        {
          _id: ownerid
        }
      );
      console.log(result);
      console.log("res is", result.data);
      console.log("res is", result.status);
      fetch("http://localhost:8080/admins/getRequests")
        .then((res) => res.json())
        .then((result) => {
          setUsers(result);
        });
    } catch (error) {
      if (error.response) console.log("error is", error.response.data);
    }
  }

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

  useEffect(() => {
    fetch("http://localhost:8080/admins/getRequests")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      });
      getInfo();
  }, []);

  const filteredData = users.filter((el) => {
    if (input === '') {
      return el;
    } else {
      return el.username.toLowerCase().includes(input);
    }
  });

  const AcceptModal = () => {
    const handleAccept = async () => {
      await acceptOwner(clickedUserName);
      setModalOpen(false);
    };

    const handleCancel = () => {
      setModalOpen(false);
    };

    return (
      <Modal open={modalOpen} onClose={handleCancel}>
        <Paper className={classes.paperStyle}>
          <h2>Confirm Accept</h2>
          <p>Are you sure you want to give ownership permission to this user?</p>
          <div className={classes.buttonContainer}>
            <Button onClick={handleAccept} color="secondary">
              Accept
            </Button>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
          </div>
        </Paper>
      </Modal>
    );
  };


  const DeclineModal = () => {
    const handleDecline = async () => {
      await declineOwner(clickedUserName);
      setModalOpen1(false);
    };

    const handleCancel = () => {
      setModalOpen1(false);
    };

    return (
      <Modal open={modalOpen1} onClose={handleCancel}>
        <Paper className={classes.paperStyle}>
          <h2>Confirm Decline</h2>
          <p>Are you sure you want to decline ownership permission to this user?</p>
          <div className={classes.buttonContainer}>
            <Button onClick={handleDecline} color="secondary">
              Decline
            </Button>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
          </div>
        </Paper>
      </Modal>
    );
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
      <AcceptModal/>
      <DeclineModal/>
      <h1>Pending Requests</h1>
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
        {filteredData.map((user) => (
          <div className="flex-card" key={user.username}>
            <img
              src={user.account.image}
              className="profile-image"
              alt="Profile"
            ></img>
            <div className="flex-details">
              <p>Name: {user.firstName} {user.lastName}</p>
              <p>Username: {user.account.username}</p>
              <p>Address: {user.address}</p>
            </div>
            {/* <a href="#" className="show-details">
              <p>Show more details</p>
            </a> */}
            <button
              type="button"
              onClick={() => {
                setModalOpen(true);
                setClickedUserName(user.id);
              }}
              className="accept-button"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => {
                setModalOpen1(true);
                setClickedUserName(user.id);
              }}
              className="delete-button"
            >
              Decline
            </button>
          </div>
        ))}
      </div>
      </Container>
    </div>
  );
}

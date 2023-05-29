import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Modal, Button, TextField } from '@material-ui/core';
import axios from 'axios';

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
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [clickedUserName, setClickedUserName] = useState("");

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInput(lowerCase);
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


  useEffect(() => {
    fetch("http://localhost:8080/admins/getRequests")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      });
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
              src="https://www.sandiegosymphony.org/media/uploads/blog/cool-mozart.jpg"
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
  );
}
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

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paperStyle: {
    padding: "50px 20px",
    width: 600,
    margin: "20px auto",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
}));

export default function AdminDeleteUsers() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedUserName, setClickedUserName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedUsername, setSelectedUsername] = useState("");
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInput(lowerCase);
  };

  async function deleteUser(user) {
    console.log(user);
    try {
      const result = await axios.delete(
        "http://localhost:8080/accounts/delete",
        {
          params: { username: user },
        }
      );
      console.log(result);
      console.log("res is", result.data);
      console.log("res is", result.status);
      fetch("http://localhost:8080/accounts/getAll")
        .then((res) => res.json())
        .then((result) => {
          setUsers(result);
        });
    } catch (error) {
      if (error.response) console.log("error is", error.response.data);
    }
  }

  async function filterByRoleAndSort() {
    try {
      const response = await axios.post(
        "http://localhost:8080/accounts/filterByAnything",
        {
          role: selectedRole,
          mail: selectedEmail,
          username: selectedUsername,
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    filterByRoleAndSort();
  }, [selectedRole, selectedEmail, selectedUsername]);

  const filteredData = users.filter((el) => {
    if (input === "") {
      return el;
    } else {
      return el.username.toLowerCase().includes(input);
    }
  });

  const ConfirmationModal = () => {
    const handleDelete = async () => {
      await deleteUser(clickedUserName);
      setModalOpen(false);
    };

    const handleCancel = () => {
      setModalOpen(false);
    };

    return (
      <Modal open={modalOpen} onClose={handleCancel}>
        <Paper className={classes.paperStyle}>
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this user?</p>
          <div className={classes.buttonContainer}>
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
          </div>
        </Paper>
      </Modal>
    );
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleEmailChange = (e) => {
    setSelectedEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setSelectedUsername(e.target.value);
  };

  return (
    <Container>
      <ConfirmationModal />
      <h1>Home</h1>
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
        <InputLabel>Filter by Role:</InputLabel>
        <Select
          label="Filter by Role--"
          value={selectedRole}
          onChange={handleRoleChange}
        >
          <MenuItem value={"Owner"}>Owner</MenuItem>
          <MenuItem value={"Client"}>Client</MenuItem>
        </Select>
      </FormControl>
      <FormControl id="outlined-basic" className="inputs" variant="outlined">
        <InputLabel>Order by Email:</InputLabel>
        <Select
          label="Order by email--"
          value={selectedEmail}
          onChange={handleEmailChange}
        >
          <MenuItem value={""}></MenuItem>
          <MenuItem value={"Acendent"}>Acendent</MenuItem>
          <MenuItem value={"Decendent"}>Decendent</MenuItem>
        </Select>
      </FormControl>
      <FormControl id="outlined-basic" className="inputs" variant="outlined">
        <InputLabel>Order by Username:</InputLabel>
        <Select
          label="Order by username--"
          value={selectedUsername}
          onChange={handleUsernameChange}
        >
          <MenuItem value={""}></MenuItem>
          <MenuItem value={"Acendent"}>Acendent</MenuItem>
          <MenuItem value={"Decendent"}>Decendent</MenuItem>
        </Select>
      </FormControl>
      </div>
      <div className="flex-container">
        {filteredData.map((user) => (
          <div className="flex-card" key={user.username}>
            <img src={user.image} className="profile-image" alt="Profile"></img>
            <div className="flex-details">
              <p>Username: {user.username}</p>
              <p>Role: {user.role}</p>
              <p>Email: {user.email}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (user.role === "Owner") {
                  navigate("/owner-details");
                } else {
                  navigate("/client-details");
                }
              }}
              className="details-button"
            >
              Show more details
            </button>
            <button
              type="button"
              onClick={() => {
                setModalOpen(true);
                setClickedUserName(user.username);
              }}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
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
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import logo from "../resources/logo.png";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function RegisterUser() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({
    role: null,
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
    err: null,
    submit: null
  });

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
    confirmPassword: "",
    showConfirmPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  function isValidRole() {
    if (role === '') {
      setError({ ...error, role: "Please choose a role." });
      return false;
    } else {
      setError({ ...error, role: null });
      setSubmitted(false);
      return true;
    }
  }

  function isValidUsername() {
    if (username === "") {
      setError({ ...error, username: "Username is required." });
      return false;
    } else if (username.length > 0 && username.length < 4) {
      setError({
        ...error,
        username: "Username should have more than 3 characters.",
      });
      return false;
    } else {
      setError({ ...error, username: null });
      setSubmitted(false);
      return true;
    }
  }

  function isValidEmail() {
    const em = /\S+@\S+\.\S+/.test(email);
    if (email === "") {
      setError({ ...error, email: "Email is required." });
      return false;
    } else if (!em) {
      setError({ ...error, email: "Email is invalid." });
      return false;
    } else {
      setError({ ...error, email: null });
      setSubmitted(false);
      return true;
    }
  }

  function isValidPassword() {
    const pass = /^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/.test(
      password
    );
    if (password === "") {
      setError({ ...error, password: "Password is required." });
      return false;
    } else if (!pass) {
      setError({
        ...error,
        password:
          "Password should contain at least 8 characters: a lowercase letter, a capital letter, a number, a special character.",
      });
      return false;
    } else {
      setError({ ...error, password: null });
      setSubmitted(false);
      return true;
    }
  }

  function isValidConfirmPassword() {
    if (confirmPassword === "") {
      setError({ ...error, confirmPassword: "Confirm password is required." });
      return false;
    } else if (password !== confirmPassword) {
      setError({ ...error, confirmPassword: "Passwords are not the same." });
      return false;
    } else {
      setError({ ...error, confirmPassword: null });
      setSubmitted(false);
      return true;
    }
  }

  // Handling the name change
  const handleUsername = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setSubmitted(false);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleClick = (e) => {
    e.preventDefault();
    if ( role === "" || !isValidUsername() || !isValidEmail() || !isValidPassword() || !isValidConfirmPassword()) {
      setError({...error, err: "Please fill in all the fields."});
      setSubmitted(false);
    } else {
      const account =  {username, password, email, role };
      console.log(account);
      axios.post("http://localhost:8080/accounts/add", {username: username, password: password, email: email, role: role})
        .then((result) => {
          console.log(result);
          console.log("res is", result.data);
          console.log("res is", result.status);
          setError({...error, err: null, submit: result.data});
          setSubmitted(true);
        })
        .catch(error => {
          if (error.response)
            console.log("error is", error.response.data);
          setError({...error, err: error.response.data});
          setSubmitted(false);
        });
    }
  };

  const mystyle = {
    float: "right",
    padding: "10px",
  };
  const mystyle1 = {
    float: "center",
    padding: "10px",
  };
  const mystyle2 = {
    float: "left",
    padding: "10px",
  };

  return (
    <Container style={mystyle1}>
      <div className="App" style={mystyle}>
        <Paper elevation={3} style={paperStyle}>
          <h1 style={{ color: "black" }}>Sign up</h1>

          <form className={classes.root} noValidate autoComplete="off">
            <FormControl
              required
              id="outlined-basic"
              variant="outlined"
              fullWidth
            >
              <InputLabel>Role</InputLabel>
              <Select label="Role--" value={role} onChange={handleRole} onBlur={isValidRole}>
                <MenuItem value={"Proprietar"}>Owner</MenuItem>
                <MenuItem value={"Client"}>Client</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              required
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmail}
              onBlur={isValidEmail}
            />
            {error?.email && <h2 style={{ color: "red", textAlign: "left", fontSize: "small" }}>{error?.email}</h2>}

            <TextField
              required
              id="outlined-basic"
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={handleUsername}
              onBlur={isValidUsername}
            />
            {error?.username && <h2 style={{ color: "red", textAlign: "left", fontSize: "small" }}>{error?.username}</h2>}

            {/* <FormControl required id="outlined-basic" label="Password" variant="outlined" fullWidth> */}
            {/* <InputLabel>Enter your Password</InputLabel> */}
            <TextField
              required
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth
              type={values.showPassword ? "text" : "password"}
              onChange={handlePassword}
              onBlur={isValidPassword}
              value={password}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
            {error?.password && <h2 style={{ color: "red", textAlign: "left", fontSize: "small" }}>{error?.password}</h2>}

            <TextField
              required
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type={values.showConfirmPassword ? "text" : "password"}
              onChange={handleConfirmPassword}
              onBlur={isValidConfirmPassword}
              value={confirmPassword}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                  >
                    {values.showConfirmPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                ),
              }}
            />
            {error?.confirmPassword && <h2 style={{ color: "red", textAlign: "left", fontSize: "small" }}>{error?.confirmPassword}</h2>}

            <Button variant="contained" color="primary" onClick={handleClick}>
              Submit
            </Button>
            <div>
              {!error?.submit && error?.err && <h2 style={{ color: "red", textAlign: "left", fontSize: "small" }}>{error?.err}</h2>}
              {error?.submit && error?.err === null && <h2 style={{ color: "green", textAlign: "left", fontSize: "small" }}>{error?.submit}</h2>}
            </div>
          </form>
        </Paper>
      </div>
      <div style={mystyle2}>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </Container>
  );
}

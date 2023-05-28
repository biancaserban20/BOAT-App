import React, { useState } from "react";
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
import { useNavigate } from 'react-router-dom';

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

export default function SignUpOwner() {
  const navigate = useNavigate();
  const paperStyle = { padding: "5px 20px", width: 600, margin: "20px auto" };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Owner");
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

  function isValidFirstName() {
    if (firstName === "") {
      setError({ ...error, firstName: "First Name is required." });
      return false;
    } else if (firstName[0] < 'A' || firstName[0] > 'Z' ) {
      setError({
        ...error,
        firstName: "First Name should have a leading capital letter.",
      });
      return false;
    } else {
      setError({ ...error, firstName: null });
      setSubmitted(false);
      return true;
    }
  }


  function isValidLastName() {
    if (lastName === "") {
      setError({ ...error, lastName: "Last Name is required." });
      return false;
    } else if (lastName[0] < 'A' || lastName[0] > 'Z' ) {
      setError({
        ...error,
        lastName: "Last Name should have a leading capital letter.",
      });
      return false;
    } else {
      setError({ ...error, lastName: null });
      setSubmitted(false);
      return true;
    }
  }

  function isValidAge() {
    if (age === "") {
      setError({ ...error, age: "Age is required." });
      return false;
    }
    else
    {
      for (var i = 0;i<age.length;i++)
          if (age[i] < '0' || age[i] > '9' ) {
              setError({
                        ...error,
                        age: "Age should be a number",
                      });
              return false;
          }
      var a = parseInt(age,10);
      if(a < 18) {
        setError({
                  ...error,
                  age: "Age should be greater than 18",
                });
        return false;
      }

      if(a>100) {
        setError({
                  ...error,
                  age: "Invalid age",
                });
        return false;
      }
      setError({ ...error, age: null });
      setSubmitted(false);
      return true;   
    }
  }

  function isValidPassportNo() {
    if (passportNo === "") {
      setError({ ...error, passportNo: "Passport number is required." });
      return false;
    }
    else
    {
      for (var i = 0;i<passportNo.length;i++)
          if (passportNo[i] < '0' || passportNo[i] > '9' ) {
              setError({
                        ...error,
                        passportNo: "Invalid passport number",
                      });
              return false;
          }
      setError({ ...error, passportNo: null });
      setSubmitted(false);
      return true;   
    }
  }

  function isValidAddress() {
    if (address === "") {
      setError({ ...error, address: "Address is required." });
      return false;
    }
    else
    {
      if(!address.includes("Country")){
        setError({ ...address, address: "Country is required." });
        return false;
      }

      if(!address.includes("City")){
        setError({ ...address, address: "City is required" });
        return false;
      }

      if(!address.includes("Street")){
        setError({ ...address, address: "Street is required." });
        return false;
      }

      setError({ ...error, address: null });
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

  function isValidImageLink() {
    if (imageLink === "") {
      setError({ ...error, imageLink: "Image link is required." });
      return false;
    } else {
      setError({ ...error, imageLink: null });
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

  // Handling the first name change
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setSubmitted(false);
  };

  // Handling the last name change
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setSubmitted(false);
  };

  const handleAge = (e) => {
    setAge(e.target.value);
    setSubmitted(false);
  }

  const handlePassportNo = (e) => {
    setPassportNo(e.target.value);
    setSubmitted(false);
  }

  // Handling the first name change
  const handleAddress = (e) => {
    setAddress(e.target.value);
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
    if(e.target.value === "Client")
      navigate("/sign-up-client");
    setSubmitted(false);
  };

   // Handling the email change
   const handleImageLink = (e) => {
    setImageLink(e.target.value);
    setSubmitted(false);
  };


  // Handling the form submission
  const handleClick = (e) => {
    e.preventDefault();
    if ( role === "" || !isValidUsername() || !isValidEmail() || !isValidPassword() || !isValidConfirmPassword() ||  !isValidLastName() || !isValidFirstName() || !isValidAge() || !isValidAddress() || !isValidPassportNo()) {
      setError({...error, err: "Please fill in all the fields."});
      setSubmitted(false);
    } else {
      const account =  {username, password, email, firstName, lastName, role, age, address, passportNo};
      console.log(account);
      axios.post("http://localhost:8080/accounts/add", {username: username, password: password, email: email, role: role, firstName: firstName, lastName:lastName, passportNo: passportNo, age: age, address: address, image:imageLink})
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
    float: 'center',
    marginLeft: "150px",
  };
  
  
  return (
    <Container style={mystyle}>
    <div className="boxSignLog">
        <Paper className={classes.paper} elevation={3} style={paperStyle}>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;700&display=swap" rel="stylesheet"></link>
          <div className="loginbox">
            <div>
            <h1 style={{ fontFamily: 'Poppins', fontWeight:'normal', color:"black"}}>Create an account</h1>
            </div>

            <div>
            <form className={classes.root} noValidate autoComplete="off">
              <FormControl
                required
                id="outlined-basic"
                variant="outlined"
                fullWidth
              >
                <InputLabel>Role</InputLabel>
                <Select label="Role--" value={role} onChange={handleRole}>
                  <MenuItem value={"Owner"}>Owner</MenuItem>
                  <MenuItem value={"Client"}>Client</MenuItem>
                </Select>
              </FormControl>
              
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

              <TextField
                required
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={handleFirstName}
                onBlur={isValidFirstName}
              />
              {error?.firstName && <h2 style={{ color: "red", textAlign: "left", fontSize: "small" }}>{error?.firstName}</h2>}

              <TextField
                required
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={handleLastName}
                onBlur={isValidLastName}
              />
              {error?.lastName && <h2 style={{ color: "red", textAlign: "left", fontSize: "small" }}>{error?.lastName}</h2>}

              <TextField
                required
                id="outlined-basic"
                label="Age"
                variant="outlined"
                fullWidth
                value={age}
                onChange={handleAge}
                onBlur={isValidAge}
              />
              {error?.age && <h2 style={{ color: "red", textAlign: "left", fontSize: "small" }}>{error?.age}</h2>}

              <TextField
                required
                id="outlined-basic"
                label="Passport Number"
                variant="outlined"
                fullWidth
                value={passportNo}
                onChange={handlePassportNo}
                onBlur={isValidPassportNo}
              />
              {error?.passportNo && <h2 style={{ color: "red", textAlign: "left", fontSize: "small" }}>{error?.passportNo}</h2>}

              <TextField
                required
                id="outlined-basic"
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={handleAddress}
                onBlur={isValidAddress}
              />
              {error?.address && <h2 style={{ color: "red", textAlign: "left", fontSize: "small" }}>{error?.address}</h2>}

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
                label="Profile Image Link"
                variant="outlined"
                fullWidth
                value={imageLink}
                onChange={handleImageLink}
                onBlur={isValidImageLink}
              />
              {error?.imageLink && <h2 style={{ color: "red", textAlign: "left", fontSize: "small" }}>{error?.imageLink}</h2>}

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
              </form>
              </div>
              
              <div>
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet"></link>
              <Button variant='contained' className={classes.button} size='large' style={{fontSize: 20, fontFamily: 'Poppins', backgroundColor: "#ECB920", color: "white", marginLeft: "10px", textTransform: 'none'}} onClick={handleClick}>
                Sign up
              </Button>
              </div>
              <div>
              {!error?.submit && error?.err && <h2 style={{ color: "red", textAlign: "left", fontSize: "small" }}>{error?.err}</h2>}
              {error?.submit && error?.err === null && <h2 style={{ color: "green", textAlign: "left", fontSize: "small" }}>{error?.submit}</h2>}
              </div>
              <div size='large' style={{fontSize: 14, fontFamily: 'Poppins'}}>
              Already have an account? 
              <a href="./login"> Login </a>
            </div>
            </div>
            </Paper>
      <div className='App-logo-sign-owner'>
        <img weight="110%" height="110%" src ={logo} alt='logo' />
      </div>
    </div>
    </Container>
  );
}

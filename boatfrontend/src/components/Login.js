import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button, FormControl, MenuItem, Select, InputLabel, IconButton} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import '../App.css';
import logo from '../resources/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Login() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[password,setPassword]=useState('')
    const[email,setEmail]=useState('')
    const classes = useStyles();
    const [correct,setCorrect] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [values, setValues] = React.useState({
      password: "",
      showPassword: false,
    });
    
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }

  // Handling the email change
  const handleEmail = (e) => {
    if (!isValidEmail(e.target.value)) {
      setError('Email is invalid');
    } else {
      setError(null);
      setSubmitted(false);
    }

    setEmail(e.target.value);
  };
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the form submission
  const handleClick=(e)=>{
    e.preventDefault()
    if (email === '' || password === '' || !isValidEmail(email)) {
      setError(true);
    } else {
      setError(false);
      const account={password,email}
      console.log(account)
      fetch("http://localhost:8080/accounts/checkPass")
      .then(response => {
        return response.json()
      })
      .then(data => {
            setCorrect(data);
      })
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>User {email} successfully logged in!!</h1>
      </div>
    );
  };
 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        style={{
          display: error ? '' : 'none',
          color: 'red'
        }}>
        <h1>Please enter all the fields correctly</h1>
      </div>
    );
  };

  const mystyle = {
    float: 'right',
    padding: "10px",
  };
  const mystyle1 = {
    float: 'center',
    padding: "10px",
  };
  const mystyle2 = {
    float: 'left',
    padding: "10px",
  };

  return (

    <Container style={mystyle1}>
    <div className="App" style={mystyle} >
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"black"}}>Login</h1>

    <form className={classes.root} noValidate autoComplete="off">

      <TextField required id="outlined-basic" label="Email" variant="outlined" fullWidth
      value={email}
      onChange={handleEmail}
      />{error && <h2 style={{color: 'red'}}>{error}</h2>}

      {/* <FormControl required id="outlined-basic" label="Password" variant="outlined" fullWidth> */}
      {/* <InputLabel>Enter your Password</InputLabel> */}
      <TextField required id="outlined-basic" label="Password" variant="outlined" fullWidth
        type={values.showPassword ? "text" : "password"}
        onChange={handlePassword}
        value={password}
        InputProps={{
          endAdornment:
          <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
          >
            {values.showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        }}
        
      />
      
      <Button variant="contained" color="primary" onClick={handleClick}>
      Submit
      </Button>
    <div>
        {errorMessage()}
        {successMessage()}
    </div>
    </form>
   
    </Paper>
    </div>
    <div style={mystyle2}>
       <img src ={logo} className='App-logo' alt='logo' />
     </div>

    </Container>
  );
}
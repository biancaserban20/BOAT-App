import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button,IconButton} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import '../App.css';
import logo from '../resources/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
  button: {
    borderRadius: 15,
    width: "120px",
  },
  paper: {
    borderRadius: 15,
  },
}));

export default function Login() {
    const navigate = useNavigate();
    const paperStyle={padding:'20px', width:600,margin:"20px auto"}
    const[password,setPassword]=useState("");
    const[username,setUsername]=useState("");
    const[role,setRole]=useState("");
    const classes = useStyles();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState({
      username: null,
      password: null,
      submit: null,
    });

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

  // Handling the username change
  const handleUsername = (e) => {
    setSubmitted(false);
    setUsername(e.target.value);
  };
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the form submission
  const handleClick=(e)=>{
    e.preventDefault();
    if (username === '' || password === '') {
      setError({ ...error, submit: "Username and password are required." });
    } else {
      const account={username: username, password: password};
      console.log(account);
      axios.get("http://localhost:8080/accounts/checkEmailAndPassword", { params: {
        username: username,
        password: password
      },})
      .then((result) => {
        console.log(result);
        console.log("res is", result.data);
        console.log("res is", result.status);
        localStorage.setItem("user-name", username);
        const account={username: username, password: password};
        console.log(account);
        axios.get("http://localhost:8080/accounts/getRole", { params: {
        username: username
        },})
        .then((result) => {
          console.log(result);
          console.log("res is", result.data);
          console.log("res is", result.status);  
          setRole(result.data);
          if(result.data === "Admin")
            navigate("/adminhome");
          if(result.data === "Owner")
            navigate("/ownerhome");
          if(result.data === "Client")
            navigate("/clienthome");
      });
      })
      .catch(error => {
        if (error.response){
          console.log("error is", error.response.data);
          setError({ ...error, submit: "Username and password are wrong." });
        }
      });
    }
  };

  const mystyle = {
    float: 'center',
    marginLeft: "100px",
    padding: "100px",
  };

  return (

    
    <Container style={mystyle}>
    <div className="boxSignLog">
        <Paper className={classes.paper} elevation={3} style={paperStyle}>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;700&display=swap" rel="stylesheet"></link>
        <div className="loginbox">
        <div>
        <h1 style={{ fontFamily: 'Poppins', fontWeight:'normal', color:"black"}}>Sign in</h1>
        </div>

        <div>
        <form className={classes.root} noValidate autoComplete="off">
        <TextField required id="outlined-basic" label="Username" variant="outlined" fullWidth
        value={username}
        onChange={handleUsername}
        />
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
        {error?.submit && <h2 style={{ color: "red", textAlign: "left", fontSize: "small" }}>{error?.submit}</h2>}
        </form>
        </div>
        <div>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet"></link>
      <Button variant='contained' className={classes.button} size='large' style={{fontSize: 20, fontFamily: 'Poppins', backgroundColor: "#E17E23", color: "white", marginLeft: "10px", textTransform: 'none'}} onClick={handleClick}>
      Login
      </Button>
      </div>
      <div size='large' style={{fontSize: 14, fontFamily: 'Poppins'}}>
      Don't have an account?    
      <a href="./sign-up-client"> Sign up </a>
      </div>
    </div>
    </Paper>

    <div className='App-logo'>
        <img weight="110%" height="110%" src ={logo} alt='logo' />
    </div>
    </div>
    </Container>
  );
}
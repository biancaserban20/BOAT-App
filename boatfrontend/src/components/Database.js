import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button, FormControl, MenuItem, Select, InputLabel} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Database() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const[email,setEmail]=useState('')
    const[role,setRole]=useState('')
    const[users,setUsers]=useState([])
    const classes = useStyles();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);

    // Password toggle handler
    const togglePassword = () => {
      // When the handler is invoked
      // inverse the boolean state of passwordShown
      setPasswordShown(!passwordShown);
    };

    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }

    // Handling the name change
  const handleUsername = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };
 
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

  const handleRole = (e) => {
    setRole(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the form submission
  const handleClick=(e)=>{
    e.preventDefault()
    if (username === '' || email === '' || password === '' || role === '' || !isValidEmail(email)) {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      const account={username,password,email,role}
      console.log(account)
      fetch("http://localhost:8080/accounts/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(account)})
      console.log("New account added.")
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
        <h1>User {username} successfully registered!!</h1>
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

useEffect(()=>{
  fetch("http://localhost:8080/accounts/getAll")
  .then(res=>res.json())
  .then((result)=>{
    setUsers(result);
  }
)
},[])
  return (

    <Container>
    <h1>Users</h1>

    <Paper elevation={3} style={paperStyle}>

      {users.map(user=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={user.id}>
         Id:{user.id}<br/>
         Name:{user.username}<br/>
         Password:{user.password}<br/>
         Email:{user.email}<br/>
         Role:{user.role}<br/>

        </Paper>
      ))
}


    </Paper>



    </Container>
  );
}
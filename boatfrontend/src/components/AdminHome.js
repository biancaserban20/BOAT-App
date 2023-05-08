import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button, FormControl, MenuItem, Select, InputLabel} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function AdminHome() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const adminStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[users,setUsers]=useState([])
    const classes = useStyles();

  function deleteUser(user) {
    console.log(user);
    axios.delete("http://localhost:8080/accounts/delete", { params : {username : user},})
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
    <h1>Home</h1>

    <Paper elevation={3} style={paperStyle}>
      Name: John Smith<br/>
      Role: Admin<br/>
      Joined: 12 November 2022<br/>

      {users.map(user=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={user.id}>
         Id:{user.id}<br/>
         Name:{user.username}<br/>
         Password:{user.password}<br/>
         Email:{user.email}<br/>
         Role:{user.role}<br/>
         
         <button type="button" onClick={() => deleteUser(user.username)}>
            Delete account
         </button>
        
        </Paper>
      ))
    }


    </Paper>



    </Container>
  );
}
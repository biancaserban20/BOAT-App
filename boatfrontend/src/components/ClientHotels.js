import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function ClientHotels() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[users,setUsers]=useState([])
    const classes = useStyles();


    useEffect(()=>{
      fetch("http://localhost:8080/properties/listProperties")
      .then(res=>res.json())
      .then((result)=>{
        console.log(result);
        console.log("res is", result.data);
        console.log("res is", result.status);
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
         Name:{user.name}<br/>

        </Paper>
      ))
    }


    </Paper>



    </Container>
  );
}
// import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { Container, Paper} from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
     
//     },
//   },
// }));

// export default function ClientHotels() {
//     const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
//     const[users,setUsers]=useState([])
//     const classes = useStyles();


//     useEffect(()=>{
//       fetch("http://localhost:8080/properties/listProperties")
//       .then(res=>res.json())
//       .then((result)=>{
//         console.log(result);
//         console.log("res is", result.data);
//         console.log("res is", result.status);
//         setUsers(result);
//       }
//     )
//     },[])
//   return (

//     <Container>
//     <h1>Users</h1>

//     <Paper elevation={3} style={paperStyle}>

//       {users.map(user=>(
//         <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={user.id}>
//          Id:{user.id}<br/>
//          Name:{user.name}<br/>

//         </Paper>
//       ))
//     }


//     </Paper>



//     </Container>
//   );
// }

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Paper } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { TextField, InputLabel, InputAdornment } from "@mui/material";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function ClientHotels() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const adminStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [properties, setProperties] = useState([]);
  const classes = useStyles();
  const [input, setInput] = useState("");
  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInput(lowerCase);
  };
  const navigate = useNavigate();

    useEffect(()=>{
      fetch("http://localhost:8080/properties/listProperties")
      .then(res=>res.json())
      .then((result)=>{
        console.log(result);
        console.log("res is", result.data);
        console.log("res is", result.status);
        setProperties(result);
      }
    )
    },[])
  const filteredData = properties.filter((el) => {
    //if no input the return the original
    if (input === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.name.toLowerCase().includes(input);
    }
  });

  return (
    <Container>
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
        {filteredData.map((property) => (
          <div className="flex-card">
            <img src={property.image} className="property-image"></img>
            <div className="flex-details">
              <p className="property-name"> {property.name}</p>
              <p className="property-location">{property.location}</p>
            </div>
            <button
              type="button"
              className="rooms-button"
              href="/client-hotel-details"
              onClick={() => {
                localStorage.setItem("property-name", property.name);
                localStorage.setItem("property-location", property.location);
                localStorage.setItem("property-description", property.description);
                localStorage.setItem("property-image", property.image);
                navigate("/client-hotel-details");
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
}

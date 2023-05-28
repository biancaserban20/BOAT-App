// import React from "react";

// export default function OwnerPropertyDetails() {
//   return <h1>Hello owner property {localStorage.getItem("property-name")} details</h1>;
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

export default function OwnerPropertyDetails() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const adminStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [rooms, setRooms] = useState([]);
  const classes = useStyles();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  async function getRooms() {
    try {
      const response = await axios.post(
        "http://localhost:8080/properties/getRooms",
        {
          name: localStorage.getItem("property-name"),
        }
      );
      setRooms(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    getRooms();
  }, []);

  console.log(localStorage.getItem("property-image"));

  return (
    <Container>
      <div className="property-container">
        <div className="property-flex">
          <img src={localStorage.getItem("property-image")} className="property2-image"></img>
          <div className="text">
            <p className="property-text-name"> {localStorage.getItem("property-name")}</p>
            <p className="property-text-location">{localStorage.getItem("property-location")}</p>
            <p className="property-text-description">{localStorage.getItem("property-description")}</p>
          </div>
        </div>
      </div>
      <Button
        variant="contained"
        className={classes.button}
        size="large"
        style={{
          fontSize: 10,
          fontFamily: "Poppins",
          backgroundColor: "blue",
          color: "white",
          marginLeft: "10px",
          marginBottom: "10px",
          textTransform: "none",
        }}
        onClick={() => navigate("/owner-add-room-property")}
      >
        Add a room
      </Button>
      <div className="flex-container">
        {rooms.map((room) => (
          <div className="flex-card">
            <div className="flex-details">
              <p className="room-type"> {room.type}</p>
              <p className="room-description">{room.description}</p>
              <p className="room-price">Price: {room.price}</p>
              <p className="room-noPeople">No. of people: {room.noPeople}</p>
            </div>
            <button
              type="button"
              className="bookings-button"
            >
              View Bookings
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
}

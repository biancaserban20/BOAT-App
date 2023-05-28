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

export default function OwnerProperties() {
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

  async function getProperties() {
    try {
      const response = await axios.post(
        "http://localhost:8080/owners/getProperties",
        {
          username: localStorage.getItem("user-name"),
        }
      );
      setProperties(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    getProperties();
  }, []);
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
      <h1>Owner Properties</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
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
        onClick={() => navigate("/owner-add-property")}
      >
        Add a property
      </Button>
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
              href="/owner-property-details"
              onClick={() => {
                localStorage.setItem("property-name", property.name);
                localStorage.setItem("property-location", property.location);
                localStorage.setItem("property-description", property.description);
                localStorage.setItem("property-image", property.image);
                navigate("/owner-property-details");
              }}
            >
              Rooms
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
}

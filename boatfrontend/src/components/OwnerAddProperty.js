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
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import logo from "../resources/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

export default function OwnerAddProperty() {
  const navigate = useNavigate();
  const paperStyle = { padding: "5px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [typeOfProperty, setTypeOfProperty] = useState("");
  const [image, setImage] = useState("");
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({
    name: null,
    location: null,
    description: null,
    typeOfProperty: null,
    image: null,
    err: null,
    submit: null,
  });

  function isValidName() {
    if (name === "") {
      setError({ ...error, name: "Name is required." });
      return false;
    } else if (name.length > 0 && name.length < 4) {
      setError({
        ...error,
        name: "Name should have more than 3 characters.",
      });
      return false;
    } else {
      setError({ ...error, name: null });
      setSubmitted(false);
      return true;
    }
  }

  function isValidLocation() {
    if (location === "") {
      setError({ ...error, location: "Location is required." });
      return false;
    } else if (location.length > 0 && location.length < 4) {
      setError({
        ...error,
        location: "Location should have more than 3 characters.",
      });
      return false;
    } else {
      setError({ ...error, location: null });
      setSubmitted(false);
      return true;
    }
  }

  function isValidDescription() {
    if (description === "") {
      setError({ ...error, description: "Description is required." });
      return false;
    } else if (description.length > 255) {
      setError({
        ...error,
        description: "Description should have maximum 255 characters.",
      });
      return false;
    } else {
      setError({ ...error, description: null });
      setSubmitted(false);
      return true;
    }
  }

  function isValidImage() {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i').test(image); // validate fragment locator.test(image);
    if (image === "") {
      setError({ ...error, image: "Image is required." });
      return false;
    } else if (!urlPattern) {
      setError({ ...error, image: "URL for image is invalid." });
      return false;
    } else {
      setError({ ...error, image: null });
      setSubmitted(false);
      return true;
    }
  }

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the location change
  const handleLocation = (e) => {
    setLocation(e.target.value);
    setSubmitted(false);
  };

  // Handling the description change
  const handleDescription = (e) => {
    setDescription(e.target.value);
    setSubmitted(false);
  };

  // Handling the type of property change
  const handleTypeOfProperty = (e) => {
    setTypeOfProperty(e.target.value);
    setSubmitted(false);
  };

  // Handling the type of property change
  const handleImage = (e) => {
    setImage(e.target.value);
    setSubmitted(false);
  };

  console.log('localStorage.getItem("user-name")');
  console.log(localStorage.getItem("user-name"));
  // Handling the form submission
  const handleClick = (e) => {
    e.preventDefault();
    if (
      typeOfProperty === "" ||
      !isValidName() ||
      !isValidLocation() ||
      !isValidDescription() ||
      !isValidImage()
    ) {
      setError({ ...error, err: "Please fill in all the fields." });
      setSubmitted(false);
    } else {
      const property = { name, location, description, typeOfProperty, image };
      console.log(property);
      axios
        .put("http://localhost:8080/owners/addPropertyInOwner", {
          name: name,
          location: location,
          description: description,
          typeOfProperty: typeOfProperty,
          image: image,
          username: localStorage.getItem("user-name"),
        })
        .then((result) => {
          console.log(result);
          console.log("res is", result.data);
          console.log("res is", result.status);
          localStorage.setItem("property-name", name);
          setError({ ...error, err: null, submit: result.data });
          setSubmitted(true);
        })
        .catch((error) => {
          if (error.response) console.log("error is", error.response.data);
          setError({ ...error, err: error.response.data });
          setSubmitted(false);
        });
    }
  };

  const mystyle = {
    float: "center",
    marginLeft: "150px",
  };

  return (
    <Container style={mystyle}>
      <div className="boxSignLog">
        <Paper className={classes.paper} elevation={3} style={paperStyle}>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;700&display=swap"
            rel="stylesheet"
          ></link>
          <div className="loginbox">
            <div>
              <h1
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "normal",
                  color: "black",
                }}
              >
                Add a property
              </h1>
            </div>

            <div>
              <form className={classes.root} noValidate autoComplete="off">
                <FormControl
                  required
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                >
                  <InputLabel>Type Of Property</InputLabel>
                  <Select
                    label="Type Of Property--"
                    value={typeOfProperty}
                    onChange={handleTypeOfProperty}
                  >
                    <MenuItem value={"Vila"}>Vila</MenuItem>
                    <MenuItem value={"Hotel"}>Hotel</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  required
                  id="outlined-basic"
                  label="Property name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={handleName}
                  onBlur={isValidName}
                />
                {error?.name && (
                  <h2
                    style={{
                      color: "red",
                      textAlign: "left",
                      fontSize: "small",
                    }}
                  >
                    {error?.name}
                  </h2>
                )}

                <TextField
                  required
                  id="outlined-basic"
                  label="Location"
                  variant="outlined"
                  fullWidth
                  value={location}
                  onChange={handleLocation}
                  onBlur={isValidLocation}
                />
                {error?.location && (
                  <h2
                    style={{
                      color: "red",
                      textAlign: "left",
                      fontSize: "small",
                    }}
                  >
                    {error?.location}
                  </h2>
                )}

                <TextField
                  required
                  id="outlined-basic"
                  label="Description (max 255 characters)"
                  variant="outlined"
                  fullWidth
                  value={description}
                  onChange={handleDescription}
                  onBlur={isValidDescription}
                />
                {error?.description && (
                  <h2
                    style={{
                      color: "red",
                      textAlign: "left",
                      fontSize: "small",
                    }}
                  >
                    {error?.description}
                  </h2>
                )}

                <TextField
                  required
                  id="outlined-basic"
                  label="Image (insert an URL)"
                  variant="outlined"
                  fullWidth
                  value={image}
                  onChange={handleImage}
                  onBlur={isValidImage}
                />
                {error?.image && (
                  <h2
                    style={{
                      color: "red",
                      textAlign: "left",
                      fontSize: "small",
                    }}
                  >
                    {error?.image}
                  </h2>
                )}
              </form>
            </div>

            <div>
              <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
                rel="stylesheet"
              ></link>
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
                  textTransform: "none",
                }}
                onClick={handleClick}
              >
                Add a property
              </Button>
            </div>
            <div>
              {!error?.submit && error?.err && (
                <h2
                  style={{ color: "red", textAlign: "left", fontSize: "small" }}
                >
                  {error?.err}
                </h2>
              )}
              {error?.submit && error?.err === null && (
                <h2
                  style={{
                    color: "green",
                    textAlign: "left",
                    fontSize: "small",
                  }}
                >
                  {error?.submit}
                </h2>
              )}
            </div>
          </div>
        </Paper>
        <div className="App-logo-sign-owner">
          <img weight="110%" height="110%" src={logo} alt="logo" />
        </div>
        <a href="/owner-properties" className="previousPage">
          Return to previous page
        </a>
      </div>
    </Container>
  );
}

import React from 'react';
import { Container, Button} from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import logo from '../resources/logo.png';

const useStyles = makeStyles(theme => ({
    button: {
        borderRadius: 15,
        width: "175px",
    },
  }));
  

export default function Home() {
    const classes = useStyles();

    const mystyle = {
        float: 'center',
        marginLeft: "150px",
        padding: "100px",
    };

    return(
    <Container style={mystyle}>
    <div className="box">
        <div className="box2">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet"></link>
        <div className = 'welcome' style={{fontSize: 75, fontFamily: 'Poppins', fontWeight:'bolder', color: "#055169"}}><b>Find your next adventure</b></div>
        <div className = 'description' style={{fontSize: 25, fontFamily: 'Poppins', color: "#017F8D"}}>Search deals on hotels, cruises, and much more</div>
        <div className="App">
            <a href="./sign-up-client">
                <Button variant='contained' className={classes.button} size='large' style={{fontSize: 20, fontFamily: 'Poppins', backgroundColor: "#ECB920", color: "white", textTransform: 'none'}}>Sign up</Button>
            </a>
            <a href="./login">
                <Button variant='contained' className={classes.button} size='large' style={{fontSize: 20, fontFamily: 'Poppins', backgroundColor: "#E17E23", color: "white", marginLeft: "10px", textTransform: 'none'}}>Login</Button>
            </a>
        </div>
        </div>
        <div className='App-logo'>
            <img weight="110%" height="110%" src ={logo} alt='logo' />
        </div>
        </div> 
     </Container>
    );
}
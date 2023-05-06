import React from 'react';
import { Container, Button} from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import logo from '../resources/logo.png';

export default function Home() {
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
    }

    return(
    <Container style={mystyle1} >
        
        <div className="App" style={mystyle} >
            <a href="./sign-up">
                <Button variant='contained' size='large' color="primary">Sign Up</Button>
            </a>
            <a href="./login">
                <Button variant='contained' size='large' style={{backgroundColor: "white", marginLeft: "10px"}}>Login</Button>
            </a>
        </div>
        <div style={mystyle2}>
            <img src ={logo} className='App-logo' alt='logo' />
        </div>
        <h1 className = 'welcome'>Welcome on board!</h1>
        <div className = 'description'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
     </Container>  
    );
}
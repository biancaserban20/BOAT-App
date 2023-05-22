import { Container } from '@material-ui/core';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './components/Home';
import SignUpClient from './components/SignUpClient';
import Login from './components/Login';
import Database from './components/Database';
import logo from './resources/logo.png';
import AdminHome from './components/AdminHome';
import UserHome from './components/ClientHome';
import OwnerHome from './components/OwnerHome';
import SignUpOwner from './components/SignUpOwner';

// Save username globally
window.name = null;

function App() {
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


  return (
    <Router>
    <Routes>
        <Route exact path='/'  element={<Home/>} />
        <Route path='/sign-up-client' element={<SignUpClient/>}/>
        <Route path='/sign-up-owner' element={<SignUpOwner/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/database' element={<Database/>} />
        <Route path='/adminhome' element={<AdminHome/>} />
        <Route path='/ownerhome' element={<OwnerHome/>} />
        <Route path='/clienthome' element={<UserHome/>} />
    </Routes>
    </Router>
  );
}

export default App;

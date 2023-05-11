import { Container } from '@material-ui/core';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './components/Home';
import RegisterUser from './components/RegisterUser';
import Login from './components/Login';
import Database from './components/Database';
import logo from './resources/logo.png';
import AdminHome from './components/AdminHome';

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
    // <Container style={mystyle1} >
    // <div className="App" style={mystyle} >
    //   <RegisterUser/>
    // </div>
    // <div style={mystyle2}>
    //   <img src ={logo} className='App-logo' alt='logo' />
    // </div>
    // </Container>
    <Router>
    <Routes>
        <Route exact path='/'  element={<Home/>} />
        <Route path='/sign-up' element={<RegisterUser/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/database' element={<Database/>} />
        <Route path='/adminhome' element={<AdminHome/>} />
    </Routes>
    </Router>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './components/Home';
import SignUpClient from './components/SignUpClient';
import Login from './components/Login';
import AdminHome from './components/AdminHome';
import AdminAcceptRequests from './components/AdminAcceptRequests';
import ClientBookings from './components/ClientBookings';
import ClientHotels from './components/ClientHotels';
import AdminDeleteUsers from './components/AdminDeleteUsers';
import UserHome from './components/ClientHome';
import OwnerHome from './components/OwnerHome';
import SignUpOwner from './components/SignUpOwner';
import ClientProfile from './components/ClientProfile';
import AdminProfile from './components/AdminProfile';
import OwnerProfile from './components/OwnerProfile';

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

        <Route path='/adminhome' element={<AdminHome/>} />
        <Route path='/ownerhome' element={<OwnerHome/>} />
        <Route path='/clienthome' element={<UserHome/>} />

        <Route path='/adminprofile' element={<AdminProfile/>} />
        <Route path='/ownerprofile' element={<OwnerProfile/>} />
        <Route path='/clientprofile' element={<ClientProfile/>} />

        <Route path='/admin-delete-users' element={<AdminDeleteUsers/>} />
        <Route path='/admin-accept-requests' element={<AdminAcceptRequests/>} />
        
        <Route path='/client-bookings' element={<ClientBookings/>}/>
        <Route path='/client-hotels' element={<ClientHotels/>}/>
        
    </Routes>
    </Router>
  );
}

export default App;

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
import OwnerAddProperty from './components/OwnerAddProperty';
import OwnerAddRoomProperty from './components/OwnerAddRoomProperty';
import OwnerProperties from './components/OwnerProperties';
import OwnerPropertyDetails from'./components/OwnerPropertyDetails';
import ClientHotelDetails from './components/ClientHotelDetails';
import ClientDetails from './components/ClientDetails';
import OwnerDetails from './components/OwnerDetails';

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
        <Route path='/client-hotel-details' element={<ClientHotelDetails/>}/>

        <Route path='/owner-add-property' element={<OwnerAddProperty/>}/>
        <Route path='/owner-add-room-property' element={<OwnerAddRoomProperty/>}/>
        <Route path='/owner-properties' element={<OwnerProperties/>}/>
        <Route path='/owner-property-details' element={<OwnerPropertyDetails/>}/>
        
        <Route path='/client-details' element={<ClientDetails/>}/>
        <Route path='/owner-details' element={<OwnerDetails/>}/>
    </Routes>
    </Router>
  );
}

export default App;

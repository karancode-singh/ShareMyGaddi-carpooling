// import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import useToken from './libraries/UseToken';
import Navbar from './components/navbar/Navbar';
import NotFound from './components/misc/NotFound';
import TripHistory from './components/triphistory/TripHistory';
import ActiveTrip from './components/activetrip/ActiveTrip';
import { useLoadScript } from '@react-google-maps/api';
import DriveRide from './components/main/DriveRide';
import UseActiveTrip from './libraries/UseActiveTrip';

const libraries = ['places'];

function App() {
  const { activeTrip, setActiveTrip } = UseActiveTrip();
  const { token, name, setToken } = useToken(setActiveTrip);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries
  });

  if (loadError) return <h1>Map load error</h1>;
  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <Router>
      <Navbar setToken={setToken} activeTrip={activeTrip} name={name} />
      <Routes>
        <Route exact path='/' element={activeTrip ? <Navigate to="/active-trip" /> : <Navigate to="/trip-history" />} />
        <Route exact path='/login' element={token ? <Navigate to="/" /> : <Login setToken={setToken} setActiveTrip={setActiveTrip} />} />
        <Route exact path='/signup' element={token ? <Navigate to="/" /> : <SignUp setToken={setToken} />} />
        <Route exact path='/drive' element={activeTrip ? <Navigate to="/active-trip" /> : (token ? <DriveRide type='drive' setToken={setToken} setActiveTrip={setActiveTrip} /> : <Navigate to="/login" />)} />
        <Route exact path='/ride' element={activeTrip ? <Navigate to="/active-trip" /> : (token ? <DriveRide type='ride' setToken={setToken} setActiveTrip={setActiveTrip} /> : <Navigate to="/login" />)} />
        <Route exact path='/active-trip' element={token ? (activeTrip ? <ActiveTrip setActiveTrip={setActiveTrip}/> : <Navigate to="/trip-history" />) : <Navigate to="/login" />} />
        <Route exact path='/trip-history' element={token ? <TripHistory /> : <Navigate to="/login" />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;

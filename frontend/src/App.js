// import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import configData from "./config.json";
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import useToken from './libraries/UseToken';
import Navbar from './components/navbar/Navbar';
import Drive from './components/drive/Drive';
import NotFound from './components/misc/NotFound';
import TripHistory from './components/triphistory/TripHistory';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

function App() {
  const { token, setToken } = useToken();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: configData.MAPS_API_KEY,
    libraries
  });

  if (loadError) return <h1>Map load error</h1>;
  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <Router>
      <Navbar setToken={setToken} />
      {/* <Navbar /> */}
      <Routes>
        <Route exact path='/' element={token ? <Navigate to="/drive" /> : <Navigate to="/login" />} />
        <Route exact path='/login' element={token ? <Navigate to="/" /> : <Login setToken={setToken} />} />
        <Route exact path='/signup' element={token ? <Navigate to="/" /> : <SignUp setToken={setToken} />} />
        <Route exact path='/drive' element={token ? <Drive /> : <Navigate to="/" />} />        
        <Route exact path='/trip-history' element={token ? <TripHistory /> : <Navigate to="/" />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;

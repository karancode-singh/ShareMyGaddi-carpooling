import logo from './logo.svg';
import React, { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import configData from "./config.json";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import useToken from './libraries/UseToken';
import Navbar from './components/navbar/Navbar';
import Drive from './components/drive/Drive';
import NotFound from './components/misc/NotFound';
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
        {/* <Route exact path='/' element={props.is_auth ? <Login setToken={setToken} /> : (props.is_trip_active ? 'ActiveTrip' : 'TripHistory')} /> */}
        <Route exact path='/' element={token ? <NotFound /> : <Login setToken={setToken} />} />
        <Route exact path='/login' element={<Login setToken={setToken} />} />
        <Route exact path='/signup' element={<Signup setToken={setToken} />} />
        <Route exact path='/drive' element={<Drive />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;

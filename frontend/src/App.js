import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Signup from './components/auth/Signup';
import useToken from './lib/useToken';
import Navbar from './components/navbar/Navbar';
import Drive from './components/drive/Drive';
import NotFound from './components/misc/NotFound';
import { useLoadScript } from '@react-google-maps/api';
import configData from "./config.json";

const libraries = ['places'];

function App(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: configData.MAPS_API_KEY,
    libraries
  });
  return (
    <Router>
      <Navbar />
      {/* <Register/> */}
      {/* <Login/> */}
      <Signup />
      <Routes>
        {/* <Route exact path='/' element={Navbar} /> {props.is_auth ? 'LoginPage' : (props.is_trip_active ? 'ActiveTrip' : 'TripHistory')} /> */}
        <Route exact path='/drive' element={<Drive />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );

  // return (
  //   <div className="wrapper">
  //     <h1>Application</h1>
  //     {/* <BrowserRouter>
  //       <Switch> */}
  //         <Route path="/signup">
  //         <Signup/>
  //         </Route>
  //         <Route path="/Navbar">
  //         <Navbar />
  //         </Route>
  //       {/* </Switch>
  //     </BrowserRouter> */}
  //   </div>
  // );
}



export default App;

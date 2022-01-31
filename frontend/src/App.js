// import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Navbar/Login';
import Register from './components/Navbar/Register';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
function App(props) {
  return (
    <>
      <Router>
      {/* <Navbar />  */}
        <Login />
        <Routes>
          {/* <Route path='/' exact element={Navbar} /> {props.is_auth ? 'LoginPage' : (props.is_trip_active ? 'ActiveTrip' : 'TripHistory')} /> */}
          {/* <Route path='/login' exact element={Login} /> */}
          <Route path='/register' exact element={Register} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

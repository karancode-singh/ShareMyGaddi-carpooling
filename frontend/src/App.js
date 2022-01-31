// import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './components/Navbar/Navbar'

function App(props) {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={Navbar} /> {/* {props.is_auth ? 'LoginPage' : (props.is_trip_active ? 'ActiveTrip' : 'TripHistory')} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;

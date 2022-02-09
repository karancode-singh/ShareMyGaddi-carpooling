// import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/navbar/Navbar';
import Drive from './components/drive/Drive';
import NotFound from './components/misc/NotFound';

function App(props) {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route exact path='/' element={Navbar} /> {props.is_auth ? 'LoginPage' : (props.is_trip_active ? 'ActiveTrip' : 'TripHistory')} /> */}
        <Route exact path='/drive' element={<Drive/> }/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;

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

function App(props) {

  const { token, setToken } = useToken();

  // if (!token) {
  //   return <Login setToken={setToken} />
  // }
  // if (token) {
  //   return (
  //     <div className="wrapper" > Application Display </div>

  //   );
  // }


  return (
    <Router>
      <Navbar />
      {/* <Register/> */}
      {/* <Login/> */}
      <Signup />
      <Routes>
        {/* <Route exact path='/' element={Navbar} /> {props.is_auth ? 'LoginPage' : (props.is_trip_active ? 'ActiveTrip' : 'TripHistory')} /> */}
        {/* <Route path='/login' exact element={Login} /> */}
        {/* <Route path='/register' exact element={Register} /> */}
        <Route path='/signup' exact element={Signup} />
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

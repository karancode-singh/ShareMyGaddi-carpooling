import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Navbar/Login';
import Register from './components/Navbar/Register';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Navbar/Signup';
import useToken from './lib/useToken';
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
    <>
      <Router>
        {/* <Navbar />  */}
        {/* <Login /> */}
        {/* <Register/> */}
        {/* <Login/> */}
        <Signup />
        <Routes>
          {/* <Route path='/' exact element={Navbar} /> {props.is_auth ? 'LoginPage' : (props.is_trip_active ? 'ActiveTrip' : 'TripHistory')} /> */}
          {/* <Route path='/login' exact element={Login} /> */}
          {/* <Route path='/register' exact element={Register} /> */}
          <Route path='/signup' exact element={Signup} />
        </Routes>
      </Router>
    </>
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

// import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './components/Navbar/Navbar'

import Home from './temp-pages/Home';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={Home} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

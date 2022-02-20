import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import './Login.css';
import { Link } from "react-router-dom";
import { GlobalContext } from '../../lib/GlobalState'

// api post call
function loginUser(credentials, globalSate) {
  console.log(globalSate);
  return fetch(globalSate.endPoint + '/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json());
}


export default function Login({ setToken }) {

  const [globalSate, setGlobalState] = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      email,
      password
    }
    const sessionUserDetails = await loginUser(data,globalSate);
    console.log('sessionUserDetails:', sessionUserDetails);
    setToken(sessionUserDetails.token);
  }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <Form onSubmit={handleSubmit}>
          <h3 className="heading-text">Login</h3>
          <Form.Group size="lg" controlId="email" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password" className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button size="lg" type="submit" disabled={!validateForm()} className="login-button">
            Login
          </Button>
        </Form>
        <Link to='/signup' className="signup-link">SignUp</Link>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

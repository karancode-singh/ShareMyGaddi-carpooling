import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import './Login.css';

// api post call
function loginUser(credentials) {

    return "sharemygadditoken"
   }


export default function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");  

    const handleSubmit = async e => {
        e.preventDefault();
        const token =loginUser({
          email,
          password
        });
        console.log(token);
        // setToken(token);
      }

    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    // function handleSubmit(event) {
    //   event.preventDefault();
    // }
  
    return (
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    );
    // Login.propTypes = {
    //     setToken: PropTypes.func.isRequired
    //   };
    
}
    
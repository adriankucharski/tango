import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import { API_URL, AuthContext } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { authState, setAuth } = useContext(AuthContext);

  const [status, setStatus] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitJWT = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setAuth({ username: username, token: 'asd' });
    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        username: username,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setAuth({ username: username, token: data?.token });
      navigate('/');
    } catch (e) {
      setStatus('Error');
    }
  };

  if (authState)
    navigate('/');

  return (
    <Form onSubmit={submitJWT} className="bg-trello h-[100vh] w-[100vw] flex justify-center flex-col">
      <div className="w-80 mx-auto my-0 flex flex-col align-middle">
        <Form.Group controlId="username" className="p-2 text-white">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="p-2 text-white">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="m-4" size="lg" type="submit" disabled={!(username.length > 0 && password.length > 0)}>
          Sign-in
        </Button>
        <p className="text-center text-red-200">{status}</p>
      </div>
    </Form>
  );
}

export default Login;

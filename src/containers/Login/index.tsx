import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import { API_URL, TOKEN_ALS_NAME, AuthContext } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { authState, setAuth } = useContext(AuthContext);
  const [status, setStatus] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitJWT = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const body = {
      username: username,
      password: password,
    };
    const headers = {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    }
    await axios.post(`${API_URL}/public/login`, body, headers)
      .then(r => {
        const { data } = r;
        localStorage.setItem(TOKEN_ALS_NAME, JSON.stringify(data));
        setAuth(data);
        navigate('/');
      })
      .catch(e => {
        setStatus('Username or password are invalid');
        setAuth(null);
      });
  };

  useEffect(() => { authState && navigate('/') }, []);

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
        <p className="text-center text-white bg-[#ff000066] rounded-lg">{status}</p>
      </div>
    </Form>
  );
}

export default Login;

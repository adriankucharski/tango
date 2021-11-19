import React, { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Button from "react-bootstrap/Button";

const TOKEN_LS = 'token';
const API_URL = 'https://146.59.45.158:8080';

axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url || '');
    const allowedOrigins = [API_URL];
    const token = localStorage.getItem(TOKEN_LS);
    if (allowedOrigins.includes(origin) && config.headers) {
      config.headers.authorization = `${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const Login = () => {
  const storedJwt = localStorage.getItem(TOKEN_LS);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jwt, setJwt] = useState(storedJwt || null);

  const getJwt = async () => {
    const { data } = await axios.post(`${API_URL}/login`, {
      username: username,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    localStorage.setItem(TOKEN_LS, data.token);
    setJwt(data.token);

  };

  return (
    <Form onSubmit={getJwt}>
      <Form.Group controlId="email" className="mb-3 w-12">
        <Form.Label>Username</Form.Label>
        <Form.Control
          autoFocus
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button size="lg" type="submit" disabled={!(username.length > 0 && password.length > 0)}>
        Sign-in
      </Button>
    </Form>
  );
}

export default Login;

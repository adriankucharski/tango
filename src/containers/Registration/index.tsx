import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import { API_URL, TOKEN_ALS_NAME, GlobalContext } from '../../hooks/useGlobalContext'
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const { authState, setAuth } = useContext(GlobalContext);
  const [status, setStatus] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [matchingPassword, setMatchingPassword] = useState('');
  const navigate = useNavigate();
  const isButtonDisabled = !(username.length && email.length && password.length && matchingPassword.length);
  useEffect(() => setAuth(null), []);

  const submitJWT = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (password !== matchingPassword) {
      setStatus('Passwords are incorrect');
      return;
    }

    const body = {
      username: username,
      email: email,
      password: password,
      matchingPassword: matchingPassword,
    };
    await axios.post(`${API_URL}/public/register`, body)
      .then(r => {
        navigate('/tango/login');
      })
      .catch(e => {
        setStatus('Cannot create account');
        setAuth(null);
      });
  };


  return (
    <Form onSubmit={submitJWT} className="bg-trello h-[100vh] w-[100%] flex justify-center flex-col">
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
        <Form.Group controlId="email" className="p-2 text-white">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <Form.Group controlId="matchingPassword" className="p-2 text-white">
          <Form.Label>Repeat password</Form.Label>
          <Form.Control
            type="password"
            value={matchingPassword}
            onChange={(e) => setMatchingPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="m-4" size="lg" type="submit" disabled={isButtonDisabled}>
          Create account
        </Button>
        <p className="text-center text-white bg-[#ff000066] rounded-lg">{status}</p>
      </div>
    </Form>
  );
}

export default Registration;

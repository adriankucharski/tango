import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import { API_URL, TOKEN_ALS_NAME, AuthContext } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const { authState, setAuth } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg" className="overflow-hidden">
      <Container>
        <Navbar.Brand href="/">Tango</Navbar.Brand>
        {authState ?
          <Nav.Link href="/login" onClick={() => setAuth(null)}>Logout</Nav.Link>
          :
          <Nav.Link href="/login">Login</Nav.Link>
        }
      </Container>
    </Navbar>
  );
}

export default Navigation;

import { useContext } from 'react';
import { Container, Nav, Navbar, } from 'react-bootstrap';
import { AuthContext } from '../../hooks/useAuth';


const Navigation = () => {
  const { authState, setAuth } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg" className="overflow-hidden !fixed w-[100%]">
      <Container>
        <Navbar.Brand href="/tango">Tango</Navbar.Brand>
        {authState ?
          <Nav.Link href="/tango/login" onClick={() => setAuth(null)}>Logout</Nav.Link>
          :
          <Nav.Link href="/tango">Login</Nav.Link>
        }
      </Container>
    </Navbar>
  );
}

export default Navigation;

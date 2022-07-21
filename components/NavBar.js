import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DataContext } from '../store/globalState';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Cookie from 'js-cookie';

const NavBar = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const isActive = (r) => {
    if (r == router.pathname) {
      return ' active';
    } else {
      return '';
    }
  };
const handleLogout = () => {
  Cookie.remove('refreshtoken', {
    path: 'api/auth/accessToken'
  })
  localStorage.removeItem('firstLogin')

  dispatch({
    type: 'AUTH',
    payload: {} 
  })
  dispatch({
    type: 'NOTIFY',
    payload: {success: 'Logged out'}
  })
}
  const loggedRouter = () => {
    return (
      <div className='d-flex align-items-center ms-auto'>
      <img src={auth.user.avatar} alt=''
       style={{borderRadius: '50%', width: 30, height: 30, transform: 'translateX(-3px)', marginRight: '3px'}}/>
      <NavDropdown title={auth.user.name} id="basic-nav-dropdown">
        <NavDropdown.Item >Profile</NavDropdown.Item>
        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
      </NavDropdown>
      </div>
    );
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href='/'>
        <Navbar.Brand >Tastee</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ms-auto">
            <Link href="/cart" passHref>
              <Nav.Link>Cart</Nav.Link>
            </Link>

            {Object.keys(auth).length == 0 ? (
              <Link href="/signin" passHref>
                <Nav.Link>Sign in</Nav.Link>
              </Link>
            ) : (
              loggedRouter()
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

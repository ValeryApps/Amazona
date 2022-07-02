import { useContext } from "react";
import { Badge, Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT_USER, Store } from "../context/Store";

const Header = () => {
  const { state, dispatch } = useContext(Store);
  const { cart, user_info } = state;
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: LOGOUT_USER });
    navigate('/signin')
    localStorage.removeItem("user");
    localStorage.removeItem("shipping");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Amazona</Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          <Link to="/cart">
            Cart{" "}
            {cart.cartItems?.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce(
                  (sum, product) => sum + product.quantity,
                  0
                )}
              </Badge>
            )}
          </Link>
        </Nav>
        {user_info ? (
          <NavDropdown title={user_info.name}>
            <LinkContainer to="/profile">
              <NavDropdown.Item>User Profile</NavDropdown.Item>
            </LinkContainer>{" "}
            <LinkContainer to="/orders-hostory">
              <NavDropdown.Item>Orders History</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider/>
            
            <Button variant="danger" onClick={handleLogout}>
            Sign out
            </Button>
          </NavDropdown>
        ) : (
          <>
            <Nav className="m-2">
              <Link to="/signin" style={{ color: "#fff" }}>
                Sign in
              </Link>
            </Nav>
            <Nav className="m-2">
              <Link to="/register" style={{ color: "#fff" }}>
                Register
              </Link>
            </Nav>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;

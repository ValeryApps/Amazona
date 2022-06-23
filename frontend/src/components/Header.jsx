import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
    return (

        <Navbar bg="dark" variant="dark" fixed='top' >
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                        Amazona
                    </Navbar.Brand>
                </LinkContainer>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Container>
        </Navbar>


    )
}

export default Header
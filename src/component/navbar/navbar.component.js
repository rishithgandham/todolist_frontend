import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'


import { logout } from '../../auth/auth'

import {Link} from 'react-router-dom'



function NavbarComponent({ authState }) {

    // console.log(authState)

    return (
        <>

            {!authState ? 
            <Navbar className="py-2 navbar-light-red" expand="lg" bg="" variant="dark">
                <Container>
                    <Navbar.Brand href="/">TodoList</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Sign Up </Nav.Link>
                            <Nav.Link as={Link} to="/about">About </Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> 
            
            
            : 

            <Navbar className="py-2 margin user-navbar navbar-light-red" bg="" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/u/home">Todolist</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            
                            <Nav.Link href="/u/viewlists">  View Todolists</Nav.Link>
                            <Nav.Link href="/u/home"> Home </Nav.Link>
                            < NavDropdown title={localStorage.getItem('firstName')} id="basic-nav-dropdown">
                                
                                <NavDropdown.Item href="/u/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/u/settings">Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={event => logout()} style={{backgroundColor: 'light-red'}}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            }



        </>
    )
}

export default NavbarComponent;




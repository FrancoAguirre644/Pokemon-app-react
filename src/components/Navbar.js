import React, { useState } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse } from "mdbreact";
import { Link } from 'react-router-dom';
import pokeball from '../assets/pokeball.png';

export const Navbar = ({ checkboxTheme }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    }

    return (

        <MDBNavbar dark expand="md" >
            <MDBNavbarBrand>
                <Link to="/">
                    <img className="white-text" src={pokeball} alt="pokeball" width="40" height="35" />
                </Link>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                <MDBNavbarNav left>
                    <MDBNavItem active>
                        <MDBNavLink to={"/"}>Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to={"/pokedex"}>Catch 'Em All</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    {checkboxTheme}
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>

    )

}
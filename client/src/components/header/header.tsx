import React, { Component } from "react";
import "./header.css"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export default class Header extends Component{

    public render(){
        return(
        
        <div className="header" >
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand >Propit tasks managment</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          </Navbar.Collapse>
        </Navbar>
      </div>
        )
    }
}
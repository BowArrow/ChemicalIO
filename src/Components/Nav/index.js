import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';
import logo from '../../Images/AMATlogoWhite.png';
import { FaBars } from 'react-icons/fa';
import './style.css'

class Nav extends Component {
    state = {
        isOpen: false
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <>
                <MDBRow className='navbar'>
                    <MDBCol md='12'>
                        <img className='logo vertically-center' src={logo} alt='logo' />
                        <a className='floatRight vertically-center' onClick={this.toggleCollapse}><FaBars size='25' /></a>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={`drop-down ${this.state.isOpen ? 'open' : 'closed'}`}>
                    <Link className='link-box col-md-12' to='/'>Home</Link>
                    <Link className='link-box col-md-12' to='/chemlist'>Chemical List</Link>
                    <Link className='link-box col-md-12' to='/'>Report</Link>
                    <Link className='link-box col-md-12' to='/'>Log</Link>
                    
                </MDBRow>
            </>
        )
    }
}

export default Nav;
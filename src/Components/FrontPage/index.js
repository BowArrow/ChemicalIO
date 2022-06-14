import React, { Component } from 'react';
import { MDBContainer, MDBRow } from 'mdbreact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../HomePage';
import Nav from '../Nav';

class FrontPage extends Component {
    state = {

    };

    render() {
        return (
            <Router>
                <Nav />
                <MDBRow className='Pages'>
                    <Routes>
                        <Route exact path='/' component={HomePage} />
                    </Routes>
                </MDBRow>
            </Router>
        )
    }
}

export default FrontPage;
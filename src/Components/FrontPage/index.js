import React, { Component } from 'react';
import { MDBContainer, MDBRow } from 'mdbreact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../HomePage';
import ListView from '../ListView';
import PDFPage from '../PDFPage';
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
                        <Route path='/' element={<HomePage />} />
                        <Route path='/chemlist' element={<ListView />} />
                    </Routes>
                </MDBRow>
            </Router>
        )
    }
}

export default FrontPage;
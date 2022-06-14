import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import PDFUpload from '../PDFUpload';
import './style.css'

class PDFPage extends Component {
    state = {

    }

    render() {
        return (
            <MDBCol md='12'>
                <PDFUpload />
            </MDBCol>
        )
    }
}

export default PDFPage;
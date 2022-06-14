import React, { Component } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn } from 'mdbreact';
import "./style.css";

class HomePage extends Component {

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md='12' className='text-center pt-3 intro-box'>
                        <header className='title-box'>
                            <div className='title'>
                                <h1>Hello</h1>
                            </div>
                            <div className='content'>
                                <p>This is a demo app based on the idea of tracking Chemical I/O with QR Code scanning.</p>
                                <p>This project was written using React(Javascript Framework), Firebase(Database/Authentication), and Node Express(Server).</p>
                                <p>This app works on phones and computers cross platform out of box. A phone or desktop app can be easily compiled as well using a tool called electron, which we see being using by major companies like discord and even the visual studio code.</p>
                                <p>Hosted on Heroku</p>
                            </div>
                        </header>
                    </MDBCol>
                    <MDBCol md='12' className='text-center mt-4 mb-5'>
                        <button className='get-started'>Get Started</button>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default HomePage;
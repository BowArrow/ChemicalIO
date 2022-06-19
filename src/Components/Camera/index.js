import React, { Component, useRef } from 'react';
import QrScanner from 'qr-scanner';
import { MDBRow } from 'mdbreact';
import './style.css';

class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ref: useRef(null)
        }
    }

    videoStream = () => {
        const { ref } = this.state;
        let video = ref.current;

        if(navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    video.srcObject = stream;
                })
                .catch(err => {
                    console.log(`Error: \n ${err}`)
                })
        }
    }

    stop = (e) => {
        const stream = video.srcObject;
        const tracks = stream.getTracks();

        for (let i = 0; i < tracks.length; i++) {
            let track = tracks[i];
            track.stop()
        }

        video.srcObject = null;
    }

    render() {
        return (
            <MDBRow>
                {this.videoStream()}
                <video ref={this.state.ref} width="320" height="240" autoplay="true" controls></video>
            </MDBRow>
        )
    }
}
import React, {Component} from 'react';
import { MDBContainer, MDBCol, MDBRow } from 'mdbreact';
import { firebaseApp } from '../..';
import './style.css'

class ChemView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key : this.props.iKey
        }
    }

    componentDidMount () {

    }

    giveRandomData = () => {

    }

    render() {
        const { key } = this.state;
        return (
            <MDBContainer>
                {console.log(key)}
            </MDBContainer>
        )
    }
}

export default ChemView;
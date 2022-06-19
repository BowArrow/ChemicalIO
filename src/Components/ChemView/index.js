import React, { Component } from 'react';
import { MDBContainer, MDBCol, MDBRow } from 'mdbreact';
import { firebaseApp } from '../..';
import { getDatabase, ref, set, onValue, update } from 'firebase/database';
import { QRCodeSVG } from 'qrcode.react';
import './style.css'
import { Link } from 'react-router-dom';
import { CgArrowLeftO } from 'react-icons/cg';

class ChemView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: this.props.iKey
        }
    }

    componentDidMount() {
        const { key } = this.state;
        const db = getDatabase(firebaseApp);
        const viewRef = ref(db, `/chemicals/${key}`);
        onValue(viewRef, (snap) => {
            const obj = snap.val()
            if (!obj['data']) {
                update(viewRef, this.giveRandomData())
            } else {
                this.setState({ data: obj })
            }
        })
    }

    functionDateFormat = (num, bool) => {
        const date = new Date();
        console.log(date);
        if (bool) {
            date.setDate(date.getDate() + num)
        } else {
            date.setDate(date.getDate() - num)
        }
        const Month = date.getMonth() + 1
        const Day = date.getDate()
        const Year = date.getFullYear()

        return `${Month}/${Day}/${Year}`;
    }

    giveRandomData = () => {
        const types = ['L', 'ml']
        const amount = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
        const buildings = ['Main', 'Warehouse']
        const rooms = Math.floor(Math.random() * 100) + 1;
        const container = Math.floor(Math.random() * (50000 - 10000) + 10000)
        const selectDate = Math.floor(Math.random() * 14) + 1;
        const selectExp = Math.floor(Math.random() * 365) + 1;
        const logDate = this.functionDateFormat(selectDate, false);
        const expDate = this.functionDateFormat(selectExp, true);
        const selectType = Math.round(Math.random());
        const selectTypeBuilding = Math.round(Math.random());
        console.log(selectTypeBuilding)
        const thisType = types[selectType]
        const thisBuilding = buildings[selectTypeBuilding];

        const obj = {
            data: {
                maxVolume: {
                    amount: amount,
                    type: thisType
                },
                lastLog: {
                    date: logDate,
                    amount: amount - (amount * Math.random()),
                    type: thisType
                },
                storageLocation: {
                    building: thisBuilding,
                    room: rooms,
                    container: container
                },
                expirationData: expDate
            }
        }

        return obj;
    }

    renderInfo = () => {
        const { data } = this.state;
        if (data) {
            return <>
                <MDBRow className='row-color my-0 py-2 text-center'>
                    <h3 className='my-0'>{data.name}</h3>
                </MDBRow>
                <MDBRow className='my-2 py-0'>
                    <h5 className='my-0'>Expires: {data.data.expirationData}</h5>
                </MDBRow>
                <MDBRow className='my-2 py-2 row-color'>
                    <h5 className='my-0'> Volume: {data.data.lastLog.amount.toFixed(2)}/{data.data.maxVolume.amount} {data.data.maxVolume.type}</h5>
                </MDBRow>
                <MDBRow className='py-0'>
                    <h5 className='mb-2 mt-0'>Last Log</h5>
                    <br />
                    <p className='my-0'>Date: {data.data.lastLog.date}</p>
                    <p className='py-0 my-0'>Amount: {data.data.lastLog.amount.toFixed(2)} {data.data.lastLog.type}</p>
                </MDBRow>
                <MDBRow className='my-2 py-2 row-color'>
                    <h5 className='mb-2'>Location</h5>
                    <br />
                    <p className='my-0'>Building: {data.data.storageLocation.building}</p>
                    <p className='my-0'>Room: {data.data.storageLocation.room}</p>
                    <p className='my-0'>Container: #{data.data.storageLocation.container}</p>
                </MDBRow>
            </>
        }
    }

    render() {
        const { key } = this.state;
        return (<>
            <MDBRow className='mb-0 mt-3'>
                <Link to='/chemlist'><CgArrowLeftO size={40} color="#397da2" /></Link>
            </MDBRow>
            <MDBContainer className='px-5 mt-3'>
                <MDBRow>
                    <MDBCol />
                    <MDBCol className='text-center align-middle mb-4' md='3'>
                        <QRCodeSVG className='img-thumbnail my-auto mx-auto' value={window.location.href} height={250} width={250} />
                    </MDBCol>
                    <MDBCol md='3'>
                        {this.renderInfo()}
                    </MDBCol>
                    <MDBCol />
                </MDBRow>
            </MDBContainer>
        </>
        )
    }
}

export default ChemView;
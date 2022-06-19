import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer } from "mdbreact";
import './style.css';
import tm1 from '../testMaterials/tm1';
import tm2 from '../testMaterials/tm2';
import tm3 from '../testMaterials/tm3';
import { getDatabase, ref, set, onValue, push } from 'firebase/database';
import { firebaseApp } from "../..";
import { Link } from 'react-router-dom';
import { BsFillCircleFill } from 'react-icons/bs';
import ChemView from "../ChemView";


class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foundChecmicals: [],
            chemicals: null,
            name: '',
            inputState: '',
            loaded: 0,
            currentData: null
        }
    }

    renderDBChemicals = () => {
        const { inputState, loaded } = this.state;
        const db = getDatabase(firebaseApp);
        const chemRefAll = ref(db, '/chemicals');
        if (inputState == '' && loaded == 0) {
            this.setState({ loaded: 1 })
            onValue(chemRefAll, (snapshot) => {
                // return <li key={child.name}><a className="list-link">{child.name} : CAS#{child.cas}</a></li>
                const data = snapshot.val()
                this.setState({ currentData: data })
            })
        } else if (inputState !== '') {
            this.setState({ loaded: 0 })
            onValue(chemRefAll, (snap) => {
                const data = snap.val();
                let result = Object.values(data)
                    .filter((key) => {
                        let str = key.cas + key.name
                        return str.toLocaleLowerCase().includes(inputState)
                    })
                    .reduce((cur, key) => { return Object.assign(cur, { [key.key]: data[key.key] }) }, {});
                this.setState({ currentData: result });
            })
        }
    }

    renderLight = (currentData, prop) => {
        if(currentData[prop].data) {
            return (currentData[prop].data.lastLog.amount / currentData[prop].data.maxVolume.amount) > .3 ? <BsFillCircleFill color="#00a300" /> : <BsFillCircleFill color="#ff0000" />; 
        } else {
            return <BsFillCircleFill color="#808080" />
        }
    }

    finalRenderList = () => {
        const listChems = () => {
            const { currentData } = this.state;
            let item = [];
            for (const prop in currentData) {
                item.push(<li key={currentData[prop].cas.replace("-", "")}><Link to={`/chemlist/${currentData[prop].key}`}><MDBContainer fluid><MDBRow className="list-link">
                    <MDBCol className="text-truncate">
                        {currentData[prop].name}
                    </MDBCol>
                    <MDBCol>
                        {currentData[prop].cas}
                    </MDBCol>
                    <MDBCol className="text-center">
                        {this.renderLight(currentData, prop)}
                    </MDBCol>
                </MDBRow></MDBContainer></Link></li>)
            }
            return item;
        }

        return listChems()
    }

    pushDB = () => {
        const { chemicals } = this.state;
        chemicals.map(chem => {
            const name = chem[0]
            const db = getDatabase(firebaseApp)
            let thisRef = ref(db, 'chemicals');
            let uniqueKey = push(thisRef);
            let thisKey = uniqueKey.key;
            set(uniqueKey, {
                key: thisKey,
                name: chem[0],
                cas: chem[1]
            }
            )
        }).catch(alert);
    }

    updateInputState = (value) => {
        this.setState({
            inputState: value,
            inputActive: true
        })
    }

    componentDidMount() {
        const pushArr = () => {
            const arr1 = tm1.data.slice(0, -5);
            const arr2 = tm2.data.slice(0, -9);
            const arr3 = tm3.data.slice(0, -5);
            let narr1 = arr1.shift();
            let narr2 = arr2.shift();
            let narr3 = arr3.shift();
            let finalarr = arr1.concat(arr2, arr3);
            this.setState({ chemicals: finalarr });
        }
        this.renderDBChemicals();
        pushArr();
    }

    componentDidUpdate() {
        const { inputActive } = this.state;
        if (inputActive) {
            this.renderDBChemicals();
            this.setState({ inputActive: false })
        }
    }

    render() {
        return (
            <>
                <MDBContainer>
                    <MDBRow>
                        {/* <button onClick={this.pushDB}>push</button> */}
                        <input onChange={(e) => this.updateInputState(e.target.value)} placeholder='Search' />
                        <h3 className="text-center mt-4">Chemicals</h3>
                        <ul>
                            <li>
                                <MDBContainer fluid>
                                    <MDBRow className="list-head">
                                        <MDBCol>
                                            <h5>Chemical</h5>
                                        </MDBCol>
                                        <MDBCol>
                                            <h5>CAS</h5>
                                        </MDBCol>
                                        <MDBCol>
                                            <h5>Status</h5>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                            </li>
                            {this.finalRenderList()}
                        </ul>
                    </MDBRow>
                </MDBContainer>
            </>
        )
    }
}

export default ListView;
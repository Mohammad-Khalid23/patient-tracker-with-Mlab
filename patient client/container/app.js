import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import AddPatient from "../components/addPatient.js"
import AllPatient from "../components/allPatient.js"
import PatientInfo from "../components/patientInfo.js"
import { connect } from 'react-redux'
import PatientMiddleware from "../store/middlewares/patientMiddleware.js"
import { Container, Header, Title, Content, Footer, Form, Input, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { Router, Scene, Actions } from 'react-native-router-flux'
function mapStateToProps(state) {
    // console.log(state.allPatients, "state value in app js")
    return {
        patientDetail: state.allPatients
    }
    // console.log(ths.props.patientDetail, "sdfd")
}
function mapDispatchToProps(dispatch) {
    return {
        addPatient: function (value) {
            return dispatch(PatientMiddleware.asyncAddPatient(value))
        },
        deletePatient: function (value) {
            return dispatch(PatientMiddleware.asyncDeletePatient(value))
        },
        loadPatients: () => {
            return dispatch(PatientMiddleware.asyncLoadPatient())
        }

    }
}
class App extends Component {
    componentDidMount() {
        this.props.loadPatients();

    }
    patientInfo(value) {
        this.props.addPatient(value)
    }
    componentDidMount() {
        console.log(this.props.patientDetail, "console in app")
    }
    deletePatient(index) {
        this.props.deletePatient(index)
        console.log(index,"index of del")
        // alert("working deleting")
    }
    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene key="add_patient" component={AddPatient} patientInfo={this.patientInfo.bind(this)} />
                    <Scene key="all_patient" initial hideNavBar={true} component={AllPatient} delete={this.deletePatient.bind(this)} />
                    <Scene key="patient_info" hideNavBar={true} component={PatientInfo} />
                </Scene>
            </Router>


        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(App)
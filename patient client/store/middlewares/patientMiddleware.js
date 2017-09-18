import PatientActions from "../actions/patientActions.js"
import * as firebase from 'firebase'
import { AsyncStorage } from 'react-native'
import axios from 'axios'
export default class PatientMiddleware {
    static asyncAddPatient(patientData) {


        console.log(patientData, "mw")
        var myvalue = []
        return (dispatch) => {
            try {

                axios.post('http://10.0.3.2:8000/patient', patientData)
                    .then(function (response) {
                        console.log(response, "response in middle");
                        console.log(patientData, " middle");
                    })
                    .catch(function (error) {
                        console.log(error, "error in middleware");
                    });
                var newArray = [];
                axios.get('http://10.0.3.2:8000/patientdata')
                    .then(function (response) {
                        console.log(response.data);
                        newArray: response.data
                        dispatch(PatientActions.addPatient(response.data))

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    static asyncLoadPatient() {
        return (dispatch) => {
            var newArray = [];
            axios.get('http://10.0.3.2:8000/patientdata')
                .then(function (response) {
                    console.log(response.data);
                    newArray: response.data
                    if (response.data) {
                        dispatch(PatientActions.addPatient(response.data))
                    } else {
                        console.log("error in loading...")
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }


    static asyncDeletePatient(index) {
        return (dispatch) => {
            var removePatient;
            var newArray = [];
            axios.get('http://10.0.3.2:8000/patientdata')
                .then(function (response) {
                    console.log(response.data, "data in delete function");
                    newArray: response.data
                    if (response.data) {
                        removePatient = response.data[index]._id;
                        console.log(JSON.stringify(removePatient), "pateint id")
                      //post to delete patient
                        axios.post('http://10.0.3.2:8000/deletePatient', { removePatient })
                            .then(function (response) {
                                console.log(response, "response in middle");
                            })
                            .catch(function (error) {
                                console.log(error, "error in middleware");
                            });
                        //get all data from db
                        axios.get('http://10.0.3.2:8000/patientdata')
                            .then(function (response) {
                                console.log(response.data);
                                newArray: response.data
                                if (response.data) {
                                    dispatch(PatientActions.addPatient(response.data))
                                } else {
                                    console.log("error in loading...")
                                }

                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    } else {
                        console.log("error in loading...")
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

}
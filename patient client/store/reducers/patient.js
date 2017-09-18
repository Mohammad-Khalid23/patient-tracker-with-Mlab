import PatientActions from "../actions/patientActions.js"
import {AsyncStorage} from 'react-native'
const INITIAL_STATE = {
    allPatients : [] 
}

function patient(state = INITIAL_STATE, action) {
    switch (action.type) {

        case PatientActions.ADD_PATIENT:
            console.log(action.val, "reducer")
            console.log(state, "state in reducer")

            return Object.assign({}, state, { allPatients: action.val });
       
       
        //     case PatientActions.DEL_PATIENT:
        // console.log(state.allPatients,"state in redu")
        //     state.allPatients.splice(action.val, 1)

        //     return state
        default:
            return state
    }

}
export default patient;
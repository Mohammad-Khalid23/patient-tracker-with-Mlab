export default class PatientActions {

    static ADD_PATIENT = "ADD_PATIENT"
    static DEL_PATIENT = "DEL_PATIENT"


    static addPatient(value) {
        console.log(value,"action valuie")
        return {
            type: 'ADD_PATIENT',
            val : value
        }

    }
    static delPatient() {
        return {
            type : "DEL_PATIENT"

        }

    }


}
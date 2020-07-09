import patientData from "../data/patients.json"
import {PatientWithoutSSN} from "../types";

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
    return patientData.map(({id, name, gender, occupation, dateOfBirth}) => ({
        id, name, gender, occupation, dateOfBirth
    }))
}

export default {getPatients: getPatientsWithoutSSN}

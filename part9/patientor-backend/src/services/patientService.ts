import patientData from "../data/patients.json"
import {PatientWithoutSSN, Patient, NewPatient} from "../types";
import {v1 as uuid} from "uuid"

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
    return patientData.map(({id, name, gender, occupation, dateOfBirth}) => ({
        id, name, gender, occupation, dateOfBirth
    }))
}

const addPatient = (patient: NewPatient): Patient => {
    let newPatient = {
        id: uuid(),
        ...patient
    }
    patientData.push(newPatient)
    return newPatient
}
export default {getPatientsWithoutSSN, addPatient}

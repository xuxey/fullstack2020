export interface Patient {
    id: String,
    name: String,
    dateOfBirth: String,
    ssn: String,
    gender: String,
    occupation: String
}

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;


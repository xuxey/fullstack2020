import {Gender, NewPatient} from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const toNewPatient = (p: any): NewPatient => {
    return {
        name: parseTextField(p.name),
        gender: parseGender(p.gender),
        occupation: parseTextField(p.occupation),
        dateOfBirth: parseTextField(p.dateOfBirth),
        ssn: parseTextField(p.ssn)
    }
}

const parseGender = (param: any): Gender => {
    if (param && isGender(param))
        return param
    throw new Error('Gender is incorrect or missing ' + param)
}
const parseTextField = (text: any): string => {
    if (text && isString(text))
        return text
    throw new Error('Incorrect or missing string: ' + text);
}

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

import {Entry, Gender, HealthCheckRating, NewPatient} from "./types";
import {v1 as uuid} from "uuid"

export const toNewPatient = (p: any): NewPatient => {
    return {
        name: parseTextField(p.name),
        gender: parseGender(p.gender),
        occupation: parseTextField(p.occupation),
        dateOfBirth: parseDate(p.dateOfBirth),
        ssn: parseTextField(p.ssn)
    }
}

export const toNewEntry = (entry: any): Entry => {
    const type: string = parseTextField(entry.type)
    const baseEntry = {
        id: uuid(),
        description: parseTextField(entry.description),
        date: parseDate(entry.date),
        specialist: parseTextField(entry.specialist),
        diagnosisCodes: parseTextArray(entry.diagnosisCodes),
    }
    switch (type) {
        case "Hospital":
            return {
                ...baseEntry,
                discharge: {
                    date: parseDate(entry.discharge.date),
                    criteria: parseTextField(entry.discharge.criteria)
                },
                type: "Hospital"
            }
        case "HealthCheck":
            return {
                ...baseEntry,
                healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
                type: "HealthCheck"
            }
        case "OccupationalHealthcare":
            return {
                ...baseEntry,
                employerName: parseTextField(entry.employerName),
                sickLeave: {
                    startDate: parseDate(entry.sickLeave.startDate),
                    endDate: parseDate(entry.sickLeave.endDate)
                },
                type: "OccupationalHealthcare"
            }
        default:
            return assertNever(type)
    }
}
const assertNever = (value: any): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const parseTextArray = (array: any): string[] => {
    if (array && Array.isArray(array))
        return array
    throw new Error('Incorrect or missing value: ' + array);
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

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
const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    const values = [0, 1, 2, 3]
    if (rating && values.includes(rating))
        return rating
    throw new Error('Incorrect or missing rating: ' + rating);
}
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

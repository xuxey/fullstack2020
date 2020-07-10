import React from "react";
import {Diagnosis, Entry} from "../types";
import {Item} from "semantic-ui-react";

const EntryDetails: React.FC<{ entry: Entry, diagnoses: Diagnosis[] }> = ({entry, diagnoses}) => {
    const getDiagnosis = (code: any) => {
        if (typeof code !== 'string')
            return 'No meta'
        const diag = diagnoses.find(d => d.code === code)
        if (diag)
            return diag.name
        return 'No meta'
    }
    switch (entry.type) {
        case "HealthCheck":
            return (<Item>
                <Item.Content>
                    <h4>Health Checkup</h4>
                    <div>
                        {entry.date} - {entry.specialist}
                    </div>
                    <div>Rating - {entry.healthCheckRating}</div>
                    <div>
                        {entry.description}
                    </div>
                    <div>
                        Codes: {entry.diagnosisCodes && diagnoses &&
                    <ol>
                        {entry.diagnosisCodes.map(code =>
                            <li key={code}>{code} - {getDiagnosis(code)}</li>
                        )}
                    </ol>}
                    </div>
                </Item.Content>
            </Item>)
        case "Hospital":
            return (<Item>
                <Item.Content>
                    <h4>Hospital Entry</h4>
                    <div>
                        {entry.date} - {entry.specialist}
                    </div>
                    <div>Discharge date: {entry.discharge.date}</div>
                    <div>Criteria: {entry.discharge.criteria}</div>
                    <div>
                        {entry.description}
                    </div>
                    <div>
                        Codes: {entry.diagnosisCodes && diagnoses &&
                    <ol>
                        {entry.diagnosisCodes.map(code =>
                            <li key={code}>{code} - {getDiagnosis(code)}</li>
                        )}
                    </ol>}
                    </div>
                </Item.Content>
            </Item>)
        case "OccupationalHealthcare":
            return (<Item>
                <Item.Content>
                    <h4>Occupational Healthcare</h4>
                    <div>
                        {entry.date} - {entry.specialist}
                    </div>
                    <div>Employer - {entry.employerName}</div>
                    <div>
                        Sick Leave - {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
                    </div>
                    <div>
                        {entry.description}
                    </div>
                    <div>
                        Codes: {entry.diagnosisCodes && diagnoses &&
                    <ol>
                        {entry.diagnosisCodes.map(code =>
                            <li key={code}>{code} - {getDiagnosis(code)}</li>
                        )}
                    </ol>}
                    </div>
                </Item.Content>
            </Item>)
        default:
            return assertNever(entry)
    }
}
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};
export default EntryDetails

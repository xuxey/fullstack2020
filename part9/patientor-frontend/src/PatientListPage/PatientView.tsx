import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import axios from "axios"
import {apiBaseUrl} from "../constants";
import {Diagnosis, Patient} from "../types";
import {Icon, Item} from "semantic-ui-react";
import EntryDetails from "./EntryDetails";

const PatientView: React.FC = () => {
    let {patientId} = useParams<{ patientId: string }>()
    const [patient, setPatient] = useState<Patient>()
    const [message, setMessage] = useState<string>('Loading...')
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
    useEffect(() => {
        axios.get(`${apiBaseUrl}/patients/${patientId}`)
            .then(result => setPatient(result.data))
            .catch(error => {
                console.log(error)
                setMessage('Not Found')
            })
        axios.get(`${apiBaseUrl}/diagnoses`)
            .then(result => {
                if (result.data)
                    setDiagnoses(result.data)
            })
    }, [patientId])
    if (!patient)
        return <div>{message}</div>
    let i = 1;
    return (
        <div>
            <h2>{patient.name} <Icon className={patient.gender === 'male' ? 'mars' : 'venus'}/></h2>
            <hr/>
            <p>Occupation: {patient.occupation}</p>
            <p>Born: {patient.dateOfBirth}</p>
            <h3>Entries</h3>
            <hr/>
            <Item.Group divided>
                {patient.entries.map(entry =>
                    <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses}/>
                )}
            </Item.Group>
        </div>
    )
}

export default PatientView

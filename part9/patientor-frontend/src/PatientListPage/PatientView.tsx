import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import axios from "axios"
import {apiBaseUrl} from "../constants";
import {Entry, Patient} from "../types";
import {Button, Icon, Item} from "semantic-ui-react";
import EntryDetails from "./EntryDetails";
import {useStateValue} from "../state";
import {EntryFormValues} from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

const PatientView: React.FC = () => {
    let {patientId} = useParams<{ patientId: string }>()
    const [patient, setPatient] = useState<Patient>()
    const [message, setMessage] = useState<string>('Loading...')
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const [{diagnoses}] = useStateValue()
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };
    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const {data: newEntry} = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${patientId}/entries`,
                values
            );
            patient?.entries.push(newEntry)
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };
    useEffect(() => {
        axios.get(`${apiBaseUrl}/patients/${patientId}`)
            .then(result => setPatient(result.data))
            .catch(error => {
                console.log(error)
                setMessage('Not Found')
            })
    }, [patientId])
    if (!patient)
        return <div>{message}</div>
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
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button/>
        </div>
    )
}

export default PatientView

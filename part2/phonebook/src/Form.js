import React, {useState} from "react";
import PhonebookService from "./services/PhonebookService";

const Form = ({persons: phonebook, setPhonebook}) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        if (newName === '') return;
        if (newNumber === '') return;
        if (phonebook.find(p => p.number === newNumber) === null) {
            window.alert(`${newNumber} already exists in the phone book`);
            return;
        }
        const newPerson = {
            name: newName,
            number: newNumber
        };
        const existingPerson = phonebook.find(p => p.name === newName);
        console.log(existingPerson);
        if (existingPerson !== undefined) {
            if (window.confirm(`${newName} already exists in the phone book, update their info?`)) {
                newPerson['id'] = existingPerson.id;
                PhonebookService.updateEntry(newPerson)
                    .then(responsePerson => setPhonebook(
                        phonebook.filter(p => p.id !== existingPerson.id)
                            .concat(responsePerson)));
            }
            return;
        }

        PhonebookService.createEntry(newPerson)
            .then(responsePerson => setPhonebook(phonebook.concat(responsePerson)));
        setNewName('');
        setNewNumber('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add a new Person</h3>
            <div>name: <input value={newName} onChange={e => setNewName(e.target.value)}/></div>
            <div>number: <input type='number' value={newNumber} onChange={e => setNewNumber(e.target.value)}/></div>
            <div>
                <button type="submit">Add Person</button>
            </div>
        </form>
    )
};

export default Form;

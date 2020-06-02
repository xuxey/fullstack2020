import React, {useState} from "react";
import PhonebookService from "../services/PhonebookService";

const Form = ({persons: phonebook, setPhonebook, showForm, setShowForm, setMessage}) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    if (!showForm) return <></>;
    const handleSubmit = (event) => {
        event.preventDefault();
        if (newName === '') return;
        if (newNumber === '') return;
        if (phonebook.find(p => p.number === newNumber) === null) {
            setMessage('This number already exists', true);
            return;
        }
        const newPerson = {
            name: newName,
            number: newNumber
        };
        const existingPerson = phonebook.find(p => p.name === newName);
        if (existingPerson !== undefined) {
            if (window.confirm(`${newName} already exists in the phone book, update their info?`)) {
                newPerson['id'] = existingPerson.id;
                PhonebookService.updateEntry(newPerson)
                    .then(responsePerson => setPhonebook(
                        phonebook.filter(p => p.id !== existingPerson.id)
                            .concat(responsePerson)))
                    .catch(error => setMessage(error.response.data.error, true));
                setShowForm(false);
            }
            return;
        }

        PhonebookService.createEntry(newPerson)
            .then(responsePerson => setPhonebook(phonebook.concat(responsePerson)))
            .then(() => {
                setShowForm(false);
                setMessage('New Person successfully added to Phonebook', false);
            })
            .catch(error => setMessage(error.response.data.error, true));
        setNewName('');
        setNewNumber('');
    };
    return (
        <form onSubmit={handleSubmit} className='form'>
            <h3>Add a new Person</h3>
            <div>Name - <input className='form-item' value={newName} onChange={e => setNewName(e.target.value)}/></div>
            <div>Number - <input className='form-item' type='number' value={newNumber}
                                 onChange={e => setNewNumber(e.target.value)}/></div>
            <div className='form-item'>
                <button className='button' type="submit">Add</button>
            </div>
        </form>
    );
};

export default Form;

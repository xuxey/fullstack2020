import React, {useState} from "react";

const Form = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        if (newName === '') return;
        if (newNumber === '') return;
        if (persons.filter(p => p.name === newName).length > 0) {
            window.alert(`${newName} already exists in the phone book`);
            return;
        }
        if (persons.filter(p => p.number === newNumber).length > 0) {
            window.alert(`${newNumber} already exists in the phone book`);
            return;
        }
        const newPerson = {
            name: newName,
            number: newNumber
        };
        setPersons(persons.concat(newPerson));
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

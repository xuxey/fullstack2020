import axios from 'axios';

const getPhonebook = () => {
    const promise = axios.get("http://localhost:3001/persons");
    return promise.then(response => response.data);
};

const createEntry = (newPerson) => {
    const promise = axios.post("http://localhost:3001/persons", newPerson);
    return promise.then(response => response.data);
};

const deleteEntry = (id) => {
    const promise = axios.delete(`http://localhost:3001/persons/${id}`);
    return promise.then(response => response.status)
};

const updateEntry = (person) => {
    const promise = axios.put(`http://localhost:3001/persons/${person.id}`, person);
    return promise.then(response => response.data)
};

export default {getPhonebook, createEntry, deleteEntry, updateEntry}

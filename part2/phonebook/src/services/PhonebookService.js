import axios from 'axios';

const baseUrl = '/api';

const getPhonebook = () => {
    const promise = axios.get(baseUrl + "/persons");
    return promise.then(response => response.data)
};

const createEntry = (newPerson) => {
    const promise = axios.post(baseUrl + "/persons", newPerson);
    return promise.then(response => response.data);
};

const deleteEntry = (id) => {
    const promise = axios.delete(`${baseUrl}/persons/${id}`);
    return promise.then(response => response.status)
};

const updateEntry = (person) => {
    const promise = axios.put(`${baseUrl}/persons/${person.id}`, person);
    return promise.then(response => response.data)
};

export default {getPhonebook, createEntry, deleteEntry, updateEntry}

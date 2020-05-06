import React, {useEffect, useState} from 'react';
import './App.css';
import Search from "./Search";
import Form from "./Form";
import PhonebookService from "./services/PhonebookService";

const App = () => {
    const [phonebook, setPhonebook] = useState([]);
    useEffect(() => {
        PhonebookService.getPhonebook()
            .then(phonebook => setPhonebook(phonebook))
    }, []);
    return (
        <div>
            <h2>Phone book</h2>
            <Form persons={phonebook} setPhonebook={setPhonebook}/>
            <Search phonebook={phonebook} setPhonebook={setPhonebook}/>
        </div>
    )
};

export default App;

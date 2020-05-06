import React, {useEffect, useState} from 'react';
import './App.css';
import Search from "./Search";
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all")
            .then(response => setCountries(response.data))
    }, []);
    return (
        <div>
            <h1>Countries</h1>
            <Search countries={countries}/>
        </div>
    )
};

export default App;
/*

        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'}
 */

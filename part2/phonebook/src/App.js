import React, {useEffect, useState} from 'react';
import './styles/App.css';
import Search from "./components/Search";
import Form from "./components/Form";
import PhonebookService from "./services/PhonebookService";
import Notification from "./components/Notification";

const App = () => {
    const [phonebook, setPhonebook] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [message, setMessage] = useState({text: '', error: false});
    const showMessage = (message, isError) => {
        setMessage({text: message, error: isError});
        setTimeout(() => setMessage({text: '', error: false}), 5000);
    };
    useEffect(() => {
        PhonebookService.getPhonebook()
            .then(phonebook => setPhonebook(phonebook))
    }, []);
    const getSearch = () => {
        if (showSearch)
            return (<Search getDisplayPeople={getDisplayPeople}/>);
        else
            return (<div>
                {getDisplayPeople()}
            </div>);
    };
    const getDisplayPeople = (searchTerm = '') => {
        const deletePerson = (id) => {
            return () => {
                PhonebookService.deleteEntry(id).catch(error => {
                    showMessage('This Entry was already deleted from Phonebook', true);
                });
                setPhonebook(phonebook.filter(p => p.id !== id));
                showMessage('Entry was successfully deleted', false);
            }
        };
        return (
            <div>
                <h3>Directory</h3>
                <ol>
                    {phonebook.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(person =>
                        <li key={person.id}>
                            <span className='entry-item'>{person.name}</span>
                            <span className='entry-item'>{person.number}</span>
                            <span className='entry-item'><button className='button'
                                                                 onClick={deletePerson(person.id)}>Delete</button> </span>
                        </li>)}
                </ol>
            </div>);
    };
    return (
        <div className='global'>
            <ul className='navbar'>
                <li className='navbar-item' onClick={() => {
                    setShowSearch(false);
                    setShowForm(false)
                }} style={{color: 'blueviolet'}}>Phonebook
                </li>
                <li className='navbar-item' onClick={() => setShowForm(!showForm)}>Add</li>
                <li className='navbar-item' onClick={() => setShowSearch(!showSearch)}>Search</li>
            </ul>
            <div className='content'>
                <Notification message={message}/>
                <div className='form-div'>
                    <Form persons={phonebook} setPhonebook={setPhonebook} setShowForm={setShowForm} showForm={showForm}
                          setMessage={showMessage}/>
                </div>
                <div className='phonebook-div'>
                    {getSearch()}
                </div>
            </div>
        </div>
    )
};

export default App;

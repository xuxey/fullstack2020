import React, {useState} from 'react';
import PhonebookService from "./services/PhonebookService";


const Search = ({phonebook, setPhonebook}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = e => {
        setSearchTerm(e.target.value);
    };
    const deletePerson = (id) => {
        return () => {
            PhonebookService.deleteEntry(id).catch(reason => window.alert(`Error: ${reason}`));
            setPhonebook(phonebook.filter(p => p.id !== id));
        }
    };
    const getDisplayPeople = () => {
        return phonebook.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(person => <div key={person.id}>
                {person.name} - {person.number}
                <button onClick={deletePerson(person.id)}>Delete</button>
            </div>);
    };
    return (
        <div>
            <h3>Filter by Name</h3>
            <div>
                <form>
                    Search: <input id='search' value={searchTerm} onChange={handleSearch}/>
                </form>
            </div>
            <h4>Entries:</h4>
            {getDisplayPeople()}
        </div>
    )
};

export default Search;

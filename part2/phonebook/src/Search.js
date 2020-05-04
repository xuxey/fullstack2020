import React, {useState} from 'react';


const Search = ({phonebook}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = e => {
        setSearchTerm(e.target.value);
    };
    const getDisplayPeople = () => {
        return phonebook.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(person => <div key={person.name}>{person.name} - {person.number}</div>);
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

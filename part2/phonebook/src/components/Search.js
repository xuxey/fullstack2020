import React, {useState} from 'react';

const Search = ({getDisplayPeople}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = e => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className='entries'>
            <h3>Filter by Name</h3>
            <form>
                <input id='search' className='form-item' value={searchTerm} onChange={handleSearch}/>
            </form>
            {getDisplayPeople(searchTerm)}
        </div>
    )
};

export default Search;

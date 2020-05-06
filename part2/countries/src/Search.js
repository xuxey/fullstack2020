import React, {useState} from 'react';
import Weather from "./Weather";

const Search = ({countries}) => {
    const [country, setCountry] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = e => {
        setCountry(null);
        setSearchTerm(e.target.value);
    };
    const getDisplayCountries = () => {
        if (searchTerm === '') return;
        let matches = countries.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
        if (matches === null || matches.length === 0) return <div>No matches</div>;
        if (matches.length > 10)
            return (<div>Too many matches</div>);
        if (matches.length > 1)
            return (matches.map(country => <div key={country.name}>
                {country.name}
                <button onClick={(e) => {
                    e.preventDefault();
                    setCountry(country)
                }}>Show
                </button>
            </div>));
        if (country === null)
            setCountry(matches[0]);
    };

    return (
        <div>
            <h3>Filter by Name</h3>
            <div>
                <form>
                    Search: <input id='search' value={searchTerm} onChange={handleSearch}/>
                </form>
            </div>
            {getDisplayCountries()}
            <Country country={country}/>
        </div>
    )
};

const Country = ({country}) => {
    if (country === null) return <></>;
    return (
        <div>
            <h2>{country.name}</h2>
            <br/>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population}</div>
            <div>Languages:</div>
            <ol>
                {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
            </ol>
            <img src={country.flag} alt={'./public/logo192.png'} height='80'/>
            <Weather country={country}/>
        </div>
    )
};

export default Search;

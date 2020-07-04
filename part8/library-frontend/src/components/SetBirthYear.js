import React, {useState} from 'react'
import {SET_BDAY} from "../mutations";
import {useMutation} from "@apollo/client";
import {ALL_AUTHORS} from "../queries";
import Select from "react-select";

const SetBirthYear = (props) => {
    const authors = props.authors.map(author => {
        return {value: author.name, label: author.name}
    })
    const [author, setAuthor] = useState('')
    const [birthYear, setBirthYear] = useState('')
    const [updateBirthYear] = useMutation(SET_BDAY, {
        onError: error => props.setMessage(error.graphQLErrors[0].message, true),
        refetchQueries: [{query: ALL_AUTHORS}]
    })

    const submit = async (event) => {
        event.preventDefault()
        const setBornTo = Number(birthYear)
        await updateBirthYear({variables: {name: author.value, setBornTo}})
        console.log('update birth year')
        setBirthYear('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    Author
                    <Select
                        value={author}
                        onChange={option => setAuthor(option)}
                        options={authors}
                    />
                </div>
                <div>
                    Birth Year
                    <input
                        type='number'
                        value={birthYear}
                        onChange={({target}) => setBirthYear(target.value)}
                    />
                </div>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default SetBirthYear

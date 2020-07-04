import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, ApolloLink} from '@apollo/client'

const httpLink = new HttpLink({uri: 'http://localhost:4000'})
const authLink = new ApolloLink((operation, forward) => {
    const user = JSON.parse(localStorage.getItem('libraryUser'));
    if (!user) return forward(operation)
    const token = user.token
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : ''
        }
    });
    return forward(operation);
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: authLink.concat(httpLink),
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
)

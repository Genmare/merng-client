import React from 'react';
import App from './App';
// import ApolloClient from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { createHttpLink } from 'apollo-link-http';
// import { ApolloProvider } from '@apollo/react-hooks';

import { InMemoryCache, ApolloClient, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { setContext } from 'apollo-link-context';

// const httpLink = createHttpLink({
//     uri: 'http://localhost:5000',
// });

// const client = new ApolloClient({
//     link: httpLink,
//     cache: new InMemoryCache(),
// });

const httpLink = new HttpLink({
    uri: 'https://polar-shore-62304.herokuapp.com/',
});

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

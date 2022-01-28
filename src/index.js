import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
} from '@apollo/client';

import { WebSocketLink } from '@apollo/client/link/ws';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new WebSocketLink({
  uri: 'ws://35.189.161.175:8080/v1/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': 'myadminsecretkey',
      },
    },
  },
});

const httpsLink = new HttpLink({
  uri: 'http://35.189.161.175:8080/v1/graphql',
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': 'myadminsecretkey',
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpsLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

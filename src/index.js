import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const httpsLink = new HttpLink({
  uri: 'http://35.189.161.175:8080/v1/graphql',
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': 'myadminsecretkey',
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpsLink,
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

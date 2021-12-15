import { useQuery } from '@apollo/client';
import React from 'react';
import { Route } from 'react-router-dom';

import { Home } from './components/page/home.jsx';
import { Task } from './components/page/task';
import { Header } from './components/header/header.jsx';

function App() {
  return (
    <div className="app">
      <div className="app-inner">
        <header className="app-header">
          <Header />
        </header>
        <main className="app-main">
          <Route path={'/home'}>
            <Home />
          </Route>
          <Route path={'/task'}>
            <Task />
          </Route>
        </main>
      </div>
    </div>
  );
}

export default App;

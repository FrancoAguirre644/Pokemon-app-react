import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Navbar } from './components/Navbar';
import { Pokemon } from './components/Pokemon';
import { Pokedex } from './components/Pokedex';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="view">

      <BrowserRouter>

        <Navbar />

        <Switch>

          <Route exact path="/" component={Pokemon} />
          <Route exact path="/pokedex" component={Pokedex} />


        </Switch>

      </BrowserRouter>

    </div>

  );
}

export default App;

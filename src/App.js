import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Navbar } from './components/Navbar';
import { Pokemons } from './components/Pokemons';
import { Pokemon } from './components/Pokemon';
import { Pokedex } from './components/Pokedex';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./helpers/themes/GlobalStyles";
import { lightTheme, darkTheme } from "./helpers/themes/themes";
import { useDarkMode } from "./helpers/themes/useDarkMode";

function App() {

  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const checkboxTheme = (
    <div className="toggle-container">
      <span style={{ color: themeMode === darkTheme ? "grey" : "yellow" }}>☀︎</span>
      <span className="toggle">
        <input
          onChange={themeToggler}
          id="checkbox"
          className="checkbox"
          type="checkbox"
          checked={themeMode === darkTheme ? true : false}
        />
        <label htmlFor="checkbox" />
      </span>
      <span style={{ color: themeMode === darkTheme ? "slateblue" : "grey" }}>☾</span>
    </div>
  )

  return (

    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />

        <div className="view">

          <HashRouter basename='/' >

            <Navbar checkboxTheme={checkboxTheme} />

            <Switch>

              <Route exact path="/" component={Pokemons} />
              <Route path="/pokemons/:id" component={Pokemon} />
              <Route exact path="/pokedex" component={Pokedex} />

            </Switch>

          </HashRouter >

        </div>
      </>
    </ThemeProvider>

  );
}

export default App;

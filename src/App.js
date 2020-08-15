import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Navbar } from './components/Navbar';
import { Pokemon } from './components/Pokemon';
import { MDBBtn, MDBMask, MDBCard, MDBContainer, MDBInput, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBView, MDBIcon } from 'mdbreact';


function App() {
  return (
    <div className="view">

      <Navbar />
      <Pokemon />

    </div>

  );
}

export default App;

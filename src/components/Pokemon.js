import React, { useState } from 'react';
import { MDBBtn, MDBMask, MDBCard, MDBContainer, MDBInput, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBView, MDBIcon } from 'mdbreact';
import axios from 'axios';
import { typeColors } from '../helpers/typeColors'

export const Pokemon = () => {

    const [search, setSearch] = useState("");

    const [pokemon, setPokemon] = useState(undefined);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.get(" https://pokeapi.co/api/v2/pokemon/" + search)
            .then(response => {
                setPokemon(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })

    }


    return (

        <MDBContainer >
            <MDBRow className="justify-content-center">

                <MDBCol md="5">

                    <form onSubmit={(e) => handleSubmit(e)}>

                        <MDBInput label="E-mail address" outline icon="search" onChange={(e) => setSearch(e.target.value)} />

                    </form>

                </MDBCol>

            </MDBRow>

            {
                pokemon && (<MDBRow className="justify-content-center" >

                    <MDBCol md="6">
                        <MDBCard>
                            <img src={pokemon.sprites.back_default}
                            />

                            <MDBCardBody>
                                <MDBCardTitle className="text-center text-capitalize">{pokemon.name}</MDBCardTitle>
                                <div className="text-center m-3">
                                    {
                                        pokemon.types.map(type => {
                                            return (
                                                <button className="btn btn" style={{ backgroundColor: typeColors[type.type.name] }}>
                                                    {type.type.name}
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                                <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
                                <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>


                </MDBRow>)

            }




        </MDBContainer >







    )
}
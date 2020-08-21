import React, { useState, Fragment, useEffect } from 'react';
import { MDBBtn, MDBProgress, MDBMask, MDBCard, MDBContainer, MDBInput, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBView, MDBIcon } from 'mdbreact';
import axios from 'axios';
import { typeColors } from '../helpers/typeColors';
import { Pokemons } from '../components/Pokemons';

export const Pokemon = () => {

    const [search, setSearch] = useState("");

    const [pokemon, setPokemon] = useState(undefined);


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.get("https://pokeapi.co/api/v2/pokemon/" + search)
            .then(response => {
                setPokemon(response.data);
            })
            .catch(e => {
                console.log(e);
            })

    }


    return (

        <Fragment >
            <MDBRow className="justify-content-center p-2">

                <MDBCol md="5">

                    <form onSubmit={(e) => handleSubmit(e)}>

                        <MDBInput label="Pokemon name" outline icon="search" onChange={(e) => setSearch(e.target.value)} />

                    </form>

                </MDBCol>

            </MDBRow>

            {
                pokemon && (<MDBRow className="justify-content-center m-3" >

                    <MDBCol md="3">
                        <MDBCard className="p-2" style={{ backgroundColor: typeColors[pokemon.types[0].type.name] }}>
                            <img className="sprite" src={pokemon.sprites.front_default} />

                            <MDBCardTitle className="text-center text-uppercase font-weight-bold text-black">{pokemon.name}</MDBCardTitle>
                            <div className="container text-center mb-3">
                                {
                                    pokemon.types.map(type => {
                                        return (
                                            <div key={type.name} className="type text-capitalize" style={{ backgroundColor: typeColors[type.type.name] }}>
                                                {type.type.name}
                                            </div>
                                        )
                                    })

                                }

                            </div>

                            <div className="d-flex flex-row pt-3">

                                <div className="text-capitalize font-weight-bold pr-2">Ability:</div>

                                {
                                    pokemon.abilities.map(ability => {
                                        return (

                                            <div className="text-capitalize">{ability.ability.name} </div>

                                        )
                                    })
                                }

                            </div>



                            <MDBCardText  >

                                {
                                    pokemon.stats.map(stat => {
                                        return (
                                            <div className="d-flex flex-row pt-3">

                                                <div className="text-capitalize font-weight-bold">{stat.stat.name}: </div>
                                                <div className="text-capitalize">{stat.base_stat} </div>

                                            </div>

                                        )
                                    })
                                }



                            </MDBCardText>

                        </MDBCard>

                    </MDBCol>


                </MDBRow>)

            }

            <Pokemons />





        </Fragment >







    )
}
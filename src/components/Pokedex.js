import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios'
import { MDBBtn, MDBMask, MDBCard, MDBContainer, MDBInput, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBView, MDBIcon } from 'mdbreact';

export const Pokedex = () => {

    const [pokedex, setPokedex] = useState([]);

    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        encounterWildPokemon();
    }, []);

    const encounterWildPokemon = () => {

        axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemonId())
            .then(response => {
                console.log(response.data);
                setPokemon(response.data);
            })
            .catch(e => {
                console.log(e);
            })

    }

    const pokemonId = () => {
        const min = Math.ceil(1);
        const max = Math.floor(151);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const catchPokemon = () => {

        setPokedex(state => {
            const pokemonExists = (state.filter(p => pokemon.id == p.id).length > 0);

            if (!pokemonExists) {
                state = [...state, pokemon];
                state.sort((a, b) => (a.id - b.id));

                return state;
            }
        });


        encounterWildPokemon();

    }

    const removePokemon = (pokemonId) => {
        setPokedex(state => state.filter(p => p.id != pokemonId));
    }

    return (
        <Fragment>

            <MDBRow className="justify-content-center p-3" style={{ background: "firebrick" }} >
                <MDBCol md="3">
                    <MDBCardTitle className="text-center text-uppercase text-white">wild encounter</MDBCardTitle>

                    <img className="sprite" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"}
                    />

                    <MDBCardTitle className="text-center text-uppercase font-weight-bold text-white">{pokemon.name}</MDBCardTitle>
                    <button className="catch-btn text-uppercase font-weight-bold" onClick={() => catchPokemon()}>catch!</button>
                </MDBCol>
            </MDBRow>

            <MDBRow className="pt-3 pl-3">

                <MDBCol md="3">
                    <MDBCardTitle className="text-uppercase text-black font-weight-bold">pokedex</MDBCardTitle>
                </MDBCol>

            </MDBRow>

            <MDBRow className="p-3" >

                {

                    pokedex.map((p) => (
                        <MDBCol className="card-pokedex" md="2">
                            <button onClick={() => removePokemon(p.id)}><i class="fas fa-times"></i></button>

                            <img className="sprite" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + p.id + ".png"}
                            />
                            <MDBCardTitle className="text-center text-uppercase font-weight-bold text-black">#{p.id}</MDBCardTitle>
                            <MDBCardTitle className="text-center text-uppercase font-weight-bold text-black">{p.name}</MDBCardTitle>
                        </MDBCol>

                    ))

                }

            </MDBRow>


        </Fragment>

    )
}
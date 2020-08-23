import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios'
import { MDBCardTitle, MDBRow, MDBCol, } from 'mdbreact';


export const Pokedex = () => {

    const [pokedex, setPokedex] = useState([]);

    const [pokemon, setPokemon] = useState({});

    const [message, setMessage] = useState("You haven't caught any pokemon yet. What are you waiting for?");

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

            <div className="d-flex flex-row pt-3">
                <img className="pl-2" src="https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2018-08-03/410145857620_d507b9b2cd0b86329b48_512.png" alt="pokeball" width="50" height="35" />
                <div className="pt-1 ml-2"><MDBCardTitle className="text-uppercase text-black font-weight-bold">pokedex</MDBCardTitle></div>
            </div>

            {
                message && (
                    <div className="pt-1 ml-2"><MDBCardTitle className="h5 text-capitalize text-black font-weight-bold">{message}</MDBCardTitle></div>
                )
            }

            <MDBRow className="p-3" >

                {

                    pokedex && (pokedex.map((p) => (
                        <MDBCol className="card-pokedex" md="2">
                            <button className="btn-remove" onClick={() => removePokemon(p.id)}><i class="fas fa-times"></i></button>

                            <img className="sprite" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + p.id + ".png"}
                            />
                            <MDBCardTitle className="text-center text-uppercase font-weight-bold text-black">#{p.id}</MDBCardTitle>
                            <MDBCardTitle className="text-center text-uppercase font-weight-bold text-black">{p.name}</MDBCardTitle>
                        </MDBCol>

                    ))
                    )

                }

            </MDBRow>


        </Fragment >

    )
}
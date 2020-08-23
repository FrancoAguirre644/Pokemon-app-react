import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import { MDBRow, MDBCol, MDBCard } from 'mdbreact';
import { typeColors } from '../helpers/typeColors';
import { typeColorsCards } from '../helpers/typeColorsCards';

export const Pokemons = () => {

    const [pokedex, setPokedex] = useState([]);

    useEffect(() => {
        fetchPokemons(1, 151);
    }, []);

    const fetchPokemons = async (iPokemonNumber, pokemonNumber) => {

        for (let i = iPokemonNumber; i < pokemonNumber; i++) {
            getPokemon(i);
        }

    }

    const getPokemon = async (id) => {

        axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
            .then(response => {
                setPokedex(pokedex => [...pokedex, response.data]);
            })
            .catch(e => {
                console.log(e);
            })

    }

    const handleChangeGeneration = (e) => {
        const generation = e.target.value;

        switch (generation) {
            case "1":
                console.log("This is the generation 1");
                fetchPokemons(1, 151);
                break;

            case "2":
                console.log("This is the generation 2");
                fetchPokemons(152, 251);
                break;

            case "3":
                console.log("This is the generation 3");
                fetchPokemons(252, 386);

                break;

            case "4":
                console.log("This is the generation 4");
                fetchPokemons(387, 493);
                break;

            default:
                break;
        }

        setPokedex([]);

        fetchPokemons();

    }

    const handleType = (e) => {
        const generation = e.target.value;

        switch (generation) {
            case "1":
                console.log("This is the generation 1");
                fetchPokemons(1, 151);
                break;

            case "2":
                console.log("This is the generation 2");
                fetchPokemons(152, 251);
                break;

            default:
                break;
        }

    }

    return (
        < Fragment >

            <MDBRow className="justify-content-center p-2">

                <MDBCol md="3" className="pl-2 text-center">

                    <select className="form-control" onChange={(e) => handleChangeGeneration(e)} >
                        <option value="1">First generation</option>
                        <option value="2">Second generation</option>
                        <option value="3">Third generation</option>
                        <option value="4">Fourth generation</option>
                    </select>

                </MDBCol>

                <MDBCol md="3" className="pl-2 text-center">

                    <select className="form-control" onChange={(e) => handleType(e)} >
                        <option value="bug">Type Bug</option>
                        <option value="dragon">Type dragon</option>
                        <option value="fairy">Type fairy</option>
                        <option value="fire">Type fire</option>
                    </select>

                </MDBCol>

            </MDBRow>

            <MDBRow className="justify-content-center p-3">

                {pokedex.map(pokemon => {
                    return (

                        <MDBCol md="3" className="p-2 text-center">
                            <MDBCard style={{ backgroundColor: typeColorsCards[pokemon.types[0].type.name] }} >

                                <div className="text-capitalize font-weight-bold pt-2">
                                    {pokemon.name} (#{pokemon.id})
                                    </div>

                                <img className="sprite" src={pokemon.sprites.front_default}
                                />


                                <div className="container text-center mb-3">

                                    {
                                        pokemon.types.map(type => {
                                            return (
                                                <div key={type.types} className="type text-uppercase font-weight-bolder text-black" style={{ backgroundColor: typeColors[type.type.name] }}>
                                                    {type.type.name}
                                                </div>
                                            )
                                        })

                                    }

                                </div>

                            </MDBCard>
                        </MDBCol>

                    )
                })

                }

            </MDBRow>

        </Fragment >

    )


}
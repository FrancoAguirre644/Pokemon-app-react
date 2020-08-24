import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import { MDBRow, MDBCol, MDBCard } from 'mdbreact';
import { typeColors } from '../helpers/typeColors/typeColors';
import { typeColorsCards } from '../helpers/typeColors/typeColorsCards';
import { Pokedex } from './Pokedex';

export const Pokemons = () => {

    const [pokedex, setPokedex] = useState([]);
    const [typePokemon, setTypePokemon] = useState("bug");

    useEffect(() => {
        fetchPokemons(1, 151);
    }, [Pokedex]);

    const fetchPokemons = async (iPokemonNumber, pokemonNumber) => {

        for (let i = iPokemonNumber; i < pokemonNumber; i++) {
            getPokemon(i);
        }

    }

    const getPokemon = async (id) => {

        axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
            .then(response => {
                setPokedex(pokedex => [...pokedex, response.data]);

                setPokedex(state => {
                    state.sort((a, b) => (a.id - b.id));
                    return state;
                });
            })
            .catch(e => {
                console.log(e);
            })

    }

    const handleChangeGeneration = (e) => {
        const generation = e.target.value;

        switch (generation) {
            case "1":
                fetchPokemons(1, 151);
                break;

            case "2":
                fetchPokemons(152, 251);
                break;

            case "3":
                fetchPokemons(252, 386);

                break;

            case "4":
                fetchPokemons(387, 493);
                break;

            case "5":
                fetchPokemons(494, 649);
                break;

            case "6":
                fetchPokemons(650, 721);
                break;

            case "7":
                fetchPokemons(722, 809);
                break;

            case "8":
                fetchPokemons(810, 890);
                break;

            default:
                break;
        }

        setPokedex([]);

        fetchPokemons();

    }

    const handleType = (e) => {
        const type = e.target.value;

        switch (type) {
            case "bug":
                setTypePokemon("bug");
                break;

            case "dragon":
                setTypePokemon("dragon");
                break;

            case "fairy":
                setTypePokemon("fairy");
                break;

            case "fire":
                setTypePokemon("fire");
                break;

            case "ground":
                setTypePokemon("ground");
                break;

            case "normal":
                setTypePokemon("normal");
                break;

            case "psychic":
                setTypePokemon("psychic");
                break;

            case "steel":
                setTypePokemon("steel");
                break;

            case "dark":
                setTypePokemon("dark");
                break;

            case "electric":
                setTypePokemon("electric");
                break;

            case "fighting":
                setTypePokemon("fighting");
                break;

            case "flying":
                setTypePokemon("flying");
                break;

            case "grass":
                setTypePokemon("grass");
                break;

            case "ice":
                setTypePokemon("ice");
                break;

            case "poison":
                setTypePokemon("poison");
                break;

            case "rock":
                setTypePokemon("rock");
                break;

            case "water":
                setTypePokemon("water");
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
                        <option value="4">Fifth generation</option>
                        <option value="4">Sixth generation</option>
                        <option value="4">Seventh generation</option>
                        <option value="4">Eighth generation</option>
                    </select>

                </MDBCol>

                <MDBCol md="3" className="pl-2 text-center">

                    <select className="form-control" onChange={(e) => handleType(e)} >
                        <option value="bug">Type Bug</option>
                        <option value="dragon">Type dragon</option>
                        <option value="fairy">Type fairy</option>
                        <option value="fire">Type fire</option>
                        <option value="ground">Type ground</option>
                        <option value="normal">Type normal</option>
                        <option value="psychic">Type psychic</option>
                        <option value="steel">Type steel</option>
                        <option value="dark">Type dark</option>
                        <option value="electric">Type electric</option>
                        <option value="fighting">Type fighting</option>
                        <option value="flying">Type flying</option>
                        <option value="grass">Type grass</option>
                        <option value="ice">Type ice</option>
                        <option value="poison">Type poison</option>
                        <option value="water">Type water</option>
                    </select>

                </MDBCol>

            </MDBRow>

            <MDBRow className="justify-content-center p-3">

                {pokedex && (pokedex.filter(person => (person.types.length === 2) ? person.types[0].type.name.includes(typePokemon) || person.types[1].type.name.includes(typePokemon) : person.types[0].type.name.includes(typePokemon)).map(pokemon => {
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
                                        pokemon.types.map((type, i) => {
                                            return (
                                                <div key={i} className="type text-uppercase font-weight-bolder text-black" style={{ backgroundColor: typeColors[type.type.name] }}>
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
                )
                }

            </MDBRow>

        </Fragment >

    )


}
import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import { MDBRow, MDBCol, MDBCard } from 'mdbreact';
import { typeColors } from '../helpers/typeColors';


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
                fetchPokemons(151, 251);
                break;

            case "3":
                console.log("This is the generation 3");
                fetchPokemons(251, 386);

                break;

            case "4":
                console.log("This is the generation 4");
                fetchPokemons(386, 493);
                break;

            default:
                break;
        }

        setPokedex([]);

        fetchPokemons();
    }

    return (
        < Fragment >

            <select className="browser-default custom-select" onChange={(e) => handleChangeGeneration(e)} >
                <option value="1">First generation</option>
                <option value="2">Second generation</option>
                <option value="3">Third generation</option>
                <option value="4">Fourth generation</option>
            </select>

            <MDBRow className="justify-content-center p-3">

                {

                    pokedex.map(pokemon => {
                        return (

                            <MDBCol md="3" className="p-2 text-center">
                                <MDBCard style={{ backgroundColor: typeColors[pokemon.types[0].type.name] }} >

                                    <div className="text-capitalize font-weight-bold pt-2">
                                        {pokemon.name} (#{pokemon.id})
                                    </div>

                                    <img className="sprite" src={pokemon.sprites.front_default}
                                    />


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

                                </MDBCard>
                            </MDBCol>

                        )
                    })

                }


            </MDBRow>


        </Fragment >

    )


}
import React, { useState, useEffect, Fragment } from 'react';
import { MDBCardTitle, MDBRow, MDBCol, } from 'mdbreact';
import PokemonService from '../services/pokemon.service';
import pokedexImg from '../assets/pokedex.png';

export const Pokedex = () => {

    const [pokedex, setPokedex] = useState([]);

    const [pokemon, setPokemon] = useState({});

    const [message, setMessage] = useState("You haven't caught any pokemon yet. What are you waiting for?");

    const [iPokemonNumber, setIPokemonNumber] = useState(1);

    const [pokemonNumber, setPokemonNumber] = useState(151);

    useEffect(() => {
        encounterWildPokemon();
    }, []);

    const encounterWildPokemon = () => {

        PokemonService.getPokemon(PokemonService.getpokemonId(iPokemonNumber, pokemonNumber)).then(
            (response) => {
                setPokemon(response.data);
            },
            (error) => {
                console.log(error);
            }
        );

    }


    const catchPokemon = () => {

        setPokedex(state => {
            const pokemonExists = (state.filter(p => pokemon.id === p.id).length > 0);

            if (!pokemonExists) {
                state = [...state, pokemon];
                state.sort((a, b) => (a.id - b.id));

                return state;
            }
        });

        if (pokedex.length === 0) setMessage("");

        encounterWildPokemon();

    }

    const removePokemon = (pokemonId) => {
        setPokedex(state => state.filter(p => p.id !== pokemonId));
    }

    const handleChangeGeneration = (e) => {
        const generation = e.target.value;

        switch (generation) {
            case "1":
                setIPokemonNumber(1);
                setPokemonNumber(151);
                encounterWildPokemon();
                break;

            case "2":
                setIPokemonNumber(152);
                setPokemonNumber(251);
                encounterWildPokemon(152, 251);
                break;

            case "3":
                setIPokemonNumber(252);
                setPokemonNumber(386);
                encounterWildPokemon();
                break;

            case "4":
                setIPokemonNumber(387);
                setPokemonNumber(493);
                encounterWildPokemon();
                break;

            case "5":
                setIPokemonNumber(494);
                setPokemonNumber(649);
                encounterWildPokemon();
                break;

            case "6":
                setIPokemonNumber(650);
                setPokemonNumber(721);
                encounterWildPokemon();
                break;

            case "7":
                setIPokemonNumber(722);
                setPokemonNumber(809);
                encounterWildPokemon();
                break;

            case "8":
                setIPokemonNumber(810);
                setPokemonNumber(890);
                encounterWildPokemon();
                break;

            default:
                break;
        }

    }

    return (
        <Fragment>

            <MDBRow className="justify-content-center p-3" style={{ background: "firebrick" }} >
                <MDBCol md="3">
                    <MDBCardTitle className="text-center text-uppercase text-white">wild encounter</MDBCardTitle>

                    <img className="sprite" alt={pokemon.name} src={pokemon.sprites ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png" : ""}
                    />

                    <MDBCardTitle className="text-center text-uppercase font-weight-bold text-white">{pokemon.name}</MDBCardTitle>
                    <button className="catch-btn text-uppercase font-weight-bold" onClick={() => catchPokemon()}>catch!</button>
                </MDBCol>
            </MDBRow>

            <div className="d-flex flex-row pt-3 pl-2 pr-2">
                <img className="pl-1" src={pokedexImg} alt="pokeball" width="50" height="35" />
                <div className="pt-1 ml-2"><h3 className="text-uppercase text-black font-weight-bold">pokedex</h3></div>
                <div className="pt-0 ml-4">
                    <select className="form-control" onChange={(e) => handleChangeGeneration(e)} >
                        <option value="1">1st generation</option>
                        <option value="2">2nd generation</option>
                        <option value="3">3rd generation</option>
                        <option value="4">4th generation</option>
                        <option value="5">5th generation</option>
                        <option value="6">6th generation</option>
                        <option value="7">7th generation</option>
                        <option value="8">8th generation</option>
                    </select>
                </div>
            </div>

            {
                message && (
                    <div className="pt-3 ml-3 mr-1"><MDBCardTitle className="h5 text-capitalize text-black font-weight-bold">{message}</MDBCardTitle></div>
                )
            }

            <MDBRow className="justify-content-center p-3" >

                {

                    pokedex && (pokedex.map((p) => (
                        <MDBCol key={p.id} className="card-pokedex" md="2">
                            <button className="btn-remove" onClick={() => removePokemon(p.id)}><i className="fas fa-times"></i></button>

                            <img className="sprite" alt={p.name} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + p.id + ".png"}
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
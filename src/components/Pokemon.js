import React, { useState, Fragment } from 'react';
import { MDBProgress, MDBCard, MDBInput, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdbreact';
import axios from 'axios';
import { typeColors } from '../helpers/typeColors';
import { typeColorsCards } from '../helpers/typeColorsCards';
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

                        <MDBInput label="Pokemon name" onChange={(e) => setSearch(e.target.value)} />
                    </form>

                </MDBCol>

            </MDBRow>

            {
                pokemon && (<MDBRow className="justify-content-center m-2" >

                    <MDBCol md="4">
                        <MDBCard className="p-2" style={{ backgroundColor: typeColorsCards[pokemon.types[0].type.name] }}>
                            <button className="btn-remove" onClick={() => setPokemon(undefined)} ><i class="fas fa-times"></i></button>
                            <img className="sprite" src={pokemon.sprites.front_default} alt="pokemon-front" />

                            <MDBCardTitle className="text-center text-uppercase font-weight-bold text-black">{pokemon.name}</MDBCardTitle>
                            <div className="container text-center mb-3">
                                {
                                    pokemon.types.map(type => {
                                        return (
                                            <div key={type.name} className="type text-uppercase" style={{ backgroundColor: typeColors[type.type.name] }}>
                                                {type.type.name}
                                            </div>
                                        )
                                    })

                                }

                            </div>

                            <div className="d-flex flex-row pt-3">

                                <div className="text-uppercase font-weight-bold pr-2">Ability:</div>

                                {
                                    pokemon.abilities.map(ability => {
                                        return (

                                            <div>{ability.ability.name} </div>

                                        )
                                    })
                                }

                            </div>

                            <MDBCardText  >

                                {
                                    pokemon.stats.map((stat, key) => {
                                        return (
                                            <div key={key}>

                                                <div className="text-capitalize font-weight-bold">{stat.stat.name}: </div>
                                                <MDBProgress value={stat.base_stat} max={255} />


                                            </div>

                                        )
                                    })
                                }

                            </MDBCardText>

                        </MDBCard>

                    </MDBCol>

                </MDBRow>)

            }

            {
                !pokemon && (<Pokemons />)
            }

        </Fragment >

    )
}
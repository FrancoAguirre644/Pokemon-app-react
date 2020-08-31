import React, { useState, Fragment } from 'react';
import { MDBProgress, MDBCard, MDBInput, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdbreact';
import { typeColors } from '../helpers/typeColors/typeColors';
import { typeColorsCards } from '../helpers/typeColors/typeColorsCards';
import { Pokemons } from '../components/Pokemons';
import PokemonService from '../services/pokemon.service';

export const Pokemon = () => {

    const [search, setSearch] = useState("");
    const [pokemon, setPokemon] = useState(undefined);

    const handleSubmit = (e) => {
        e.preventDefault();
        selectPokemon(search);

    }

    const selectPokemon = (search) => {

        if (search === "") return;

        PokemonService.getPokemon(search).then(
            (response) => {
                setPokemon(response.data);
            },
            (error) => {
                console.log(error);
            }
        );

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
                                    pokemon.types.map((type, i) => {
                                        return (
                                            <div key={i} className="type text-uppercase" style={{ backgroundColor: typeColors[type.type.name] }}>
                                                {type.type.name}
                                            </div>
                                        )
                                    })

                                }

                            </div>

                            <div className="d-flex flex-row pt-3">

                                <div className="text-uppercase font-weight-bold pr-2">Ability:</div>

                                {
                                    pokemon.abilities.map((ability, i) => {
                                        return (

                                            <div key={i}>{ability.ability.name} </div>

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
                !pokemon && (<Pokemons selectPokemon={selectPokemon} />)
            }

        </Fragment >

    )
}
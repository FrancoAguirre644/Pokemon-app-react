import React, { useState, useEffect, Fragment } from 'react';
import { MDBProgress, MDBCard, MDBInput, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdbreact';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView } from 'mdbreact'
import { typeColors } from '../helpers/typeColors/typeColors';
import { typeColorsCards } from '../helpers/typeColors/typeColorsCards';
import PokemonService from '../services/pokemon.service';

export const Pokemon = (props) => {

    const [search, setSearch] = useState("");
    const [pokemon, setPokemon] = useState(undefined);
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = "Pokemon";
        selectPokemon(props.match.params.id);
        // eslint-disable-next-line
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        selectPokemon(search);
    }

    const selectPokemon = (search) => {

        if (search === "") {
            setError("Please insert a pokemon name.");
            return pokemon;
        }

        PokemonService.getPokemon(search).then(
            (response) => {
                setPokemon(response.data);
                props.history.push(`/pokemons/${search}`);
                setError("");
            },
            (error) => {
                console.log(error);
                setError("Pokemon not found.");
            }
        );

    }

    return (

        <Fragment >

            <MDBRow className="justify-content-center p-3">

                <MDBCol md="5">

                    <form onSubmit={(e) => handleSubmit(e)}>

                        <MDBInput label="Pokemon name" onChange={(e) => setSearch(e.target.value)} />
                    </form>

                    {(error === '') ? '' : <div className="mt-4 text-center">{error}</div>}

                </MDBCol>

            </MDBRow>

            {
                pokemon && (<MDBRow className="justify-content-center m-2" >

                    <MDBCol md="4">
                        <MDBCard className="p-2" style={{ backgroundColor: typeColorsCards[pokemon.types[0].type.name] }}>
                            <MDBCarousel
                                activeItem={1}
                                length={4}
                                showControls={true}
                                showIndicators={false}
                                slide
                            >
                                <MDBCarouselInner >
                                    <MDBCarouselItem itemId="1">
                                        <MDBView>
                                            <img
                                                className="sprite"
                                                src={pokemon.sprites.front_default}
                                                alt="First slide"
                                                height="150"
                                            />
                                        </MDBView>
                                    </MDBCarouselItem>
                                    <MDBCarouselItem itemId="2">
                                        <MDBView>
                                            <img
                                                className="sprite"
                                                src={pokemon.sprites.back_default}
                                                alt="Second slide"
                                                height="150"
                                            />
                                        </MDBView>
                                    </MDBCarouselItem>
                                    <MDBCarouselItem itemId="3">
                                        <MDBView>
                                            <img
                                                className="sprite"
                                                src={pokemon.sprites.front_shiny}
                                                alt="Second slide"
                                                height="150"
                                            />
                                        </MDBView>
                                    </MDBCarouselItem>
                                    <MDBCarouselItem itemId="4">
                                        <MDBView>
                                            <img
                                                className="sprite"
                                                src={pokemon.sprites.back_shiny}
                                                alt="Second slide"
                                                height="150"
                                            />
                                        </MDBView>
                                    </MDBCarouselItem>
                                </MDBCarouselInner>
                            </MDBCarousel>

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
                                            <div key={i}><p>{ability.ability.name}</p></div>
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

        </Fragment >

    )
}
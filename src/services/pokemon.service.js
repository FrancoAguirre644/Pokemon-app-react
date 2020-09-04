import axios from 'axios';

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemon = (search) => {
    return axios.get(API_URL + search);
}

const getpokemonId = (iPokemonNumber, pokemonNumber) => {
    const min = Math.ceil(iPokemonNumber);
    const max = Math.floor(pokemonNumber);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export default {
    getPokemon,
    getpokemonId,
};

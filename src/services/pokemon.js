import axios from 'axios';

const getPokemon = (id) => {

    axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(e => {
            console.log(e);
        })

}

export default getPokemon;
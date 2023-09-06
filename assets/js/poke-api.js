
const pokeAPI = {}

function convertPokeApiDetailToPokemon(pokeDetail){  // CONVERTE DO POKEDETAIL PARA UM POKEMON COM NOSSOS ATRIBUTOS DESEJADOS
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types                               // VAI PEGAR O PRIMEIRO VALOR DA ARRAY

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeAPI.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeAPI.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)                                                               // 1 - BUSCAMOS A LISTA DE POKEMONS
    .then((response) => response.json())                                            // 2 - CONVERTE EM FORMATO JSON COM TODOS OS DETALHES
    .then((jsonBody) => jsonBody.results)                                           // 3 - LANÇA COMO RESULTADO
    .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))                     // 4 - COM O MAPEAMENTO PEGAMOS A LISTA E MOLDAMOS PRA BUSCAR O DETAIL
    .then((detailRequests) => Promise.all(detailRequests))                          // 5 - ESPERA CARREGAR TODOS OS REQUECISÕES
    .then((pokemonsDetails) => pokemonsDetails )                                    // 6 - QUANDO FINALIZAR MOSTRA

}


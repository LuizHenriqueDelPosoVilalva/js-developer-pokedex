const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetails = document.getElementById('pokemonDetails')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    const escapedPokemon = JSON.stringify(pokemon).replace(/"/g, '&quot;');
    return `
        <li class="pokemon ${pokemon.type}" onclick="showPokemonDetail(${escapedPokemon})">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    `
}


function pokeDetail(pokemon) {
    console.log("dados do pokemon: "+ pokemon)
    return `
        <div class="pokemonDetailContent ${pokemon.type}">
        <h4 class="name">${pokemon.name}</h4>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
    
            <img src="${pokemon.photo}"
                alt="${pokemon.name}">
        </div>
        <div class="pokemonAbout">
            <h4 class="title">About</h5>
            <div class="pokemonAboutContainer">
                <p>Species: opa</p>
                <p>Species: opa</p>
                <p>Species: opa</p>
                <p>Species: opa</p>
                <p>Species: opa</p>
            </div>
        </div>
        </div> 
    `
}

function showPokemonDetail (pokemon) {
    console.log('Chamando showPokemonDetail com Pokémon:', pokemon);
    const detailHtml = pokeDetail(pokemon);
    pokemonDetails.innerHTML = detailHtml;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
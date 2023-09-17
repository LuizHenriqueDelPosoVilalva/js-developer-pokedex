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
    return `
        <div class="pokemonDetailContent ${pokemon.type}">
            <img class= "icon"src="../../icon/back.svg" onclick="notShowPokemonDetail()">
            <div class="pokemon">
                <h4 class="name">${pokemon.name}</h4>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
            
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </div>
            <div class="pokemonAbout">
                <h4 class="title">Mais detalhes do pokemon</h5>
                <div class="pokemonAboutContainer">
                    <div class="details">
                        <p>Species: <span>${pokemon.species}</span></p>
                        <p>Height: <span>${pokemon.height}</span></p>
                        <p>Weight: <span>${pokemon.weight}</span></p>
                        <p>Abilities: <span>${pokemon.abilities}</span></p>
                    </div>
                </div>
            </div>
        </div> 
    `
}

function showPokemonDetail (pokemon) {
    console.log(pokemon)
    const pokemonDetailsDiv = document.getElementById('pokemonDetails');
    const detailHtml = pokeDetail(pokemon);
    pokemonDetailsDiv.innerHTML = detailHtml;
    pokemonDetailsDiv.style.display = 'block';
}

function notShowPokemonDetail() {
    const pokemonDetailsDiv = document.getElementById('pokemonDetails')
    pokemonDetailsDiv.style.display = 'none';
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
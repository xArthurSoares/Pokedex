const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const form = document.querySelector('.form');
const input = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let serachPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon)

    if (data) {
        pokemonName.innerHTML = data.name
        pokemonImage.style.display = 'block'
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']
        ['front_default']
        input.value = ''
        serachPokemon = data.id
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found :c'
        pokemonNumber.innerHTML = ''
    }
}

form.addEventListener('submit', (event) => {

    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
    if (serachPokemon > 1) {
        serachPokemon -= 1;
        renderPokemon(serachPokemon)
    }
})

buttonNext.addEventListener('click', () => {
    serachPokemon += 1;
    renderPokemon(serachPokemon)
})

renderPokemon(serachPokemon)
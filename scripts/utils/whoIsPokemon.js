import API from "../modules/fetchAPI.js"
const api = new API()

import Support from "../modules/supportFunctions.js"
const support = new Support()

const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 907)

    return number
}

let randomNumber = generateRandomNumber()

let image = document.querySelector('#pokemonImage')
let name = document.querySelector('#pokemonName')

let inputValue = document.querySelector('.pokemonInput')
let checkButton = document.querySelector('.checkButton')

const getPokemonImage = (pokemonNumber) => {
    const pokemonId = ("000" + pokemonNumber).slice(-3)
    const pokemonImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId}.png`

    return pokemonImage
}

const getPokemonName = async (pokemonNumber) => {
    const data = await api.fetchPokemonAPI(pokemonNumber.toString())

    return data.name
}

const setRandomPokemon = async (pokemonNumber) => {
    image.src = getPokemonImage(pokemonNumber)
    image.alt = await getPokemonName(pokemonNumber)
    name.innerText = await getPokemonName(pokemonNumber)
    name.classList.add('none')

    image.classList.add('visibility')
    inputValue.value = ''
}

const checkAnswer = () => {
    if (inputValue.value.toLowerCase() == image.alt) {
        image.classList.remove('visibility')

        name.classList.remove('none')
        name.classList.add('block')

        setInterval(() => {
            startApp(generateRandomNumber())
        }, 10000);
    } else {
        console.log('Errou')
    }
}

const startApp = (pokemonNumber) => {
    checkButton.addEventListener("click", checkAnswer)

    setRandomPokemon(pokemonNumber)
}

startApp(randomNumber)
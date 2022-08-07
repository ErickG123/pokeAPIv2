const buttonNext = document.querySelector('.nextButton')
buttonNext.addEventListener('click', () => {
    defaultPokemon += 1
    startApp(defaultPokemon.toString())
})

const buttonPrev = document.querySelector('.prevButton')
buttonPrev.addEventListener('click', () => {
    if (defaultPokemon > 1) {
        defaultPokemon -= 1
        startApp(defaultPokemon.toString())
    }
})
let defaultPokemon = 25

import API from "./modules/fetchAPI.js"
const api = new API()

import Support from "./modules/supportFunctions.js"
const support = new Support()

import PokemonStats from "./utils/pokemonStats.js"
const pokemonStats = new PokemonStats()

import PokemonEvolutions from "./utils/pokemonEvolutions.js"
const pokemonEvolutions = new PokemonEvolutions()

const getPokemonData = async (pokemon) => {
    const data = await api.fetchPokemonAPI(pokemon)

    if (!data) {
        console.error('Data not found in getPokemonData.')
        return
    }

    const pokemonNumber = data.id
    const pokemonName = data.name
    const pokemonHeight = data.height
    const pokemonWeight = data.weight
    const pokemonBaseXP = data.base_experience

    getPokemonSpecie(pokemonNumber)
}

const getPokemonSpecie = async (pokemonId) => {
    const data = await api.fetchSpecieAPI(pokemonId)

    if (!data) {
        console.error('Data not found in getPokemonSpecie.')
        return
    }

    const pokemonHappiness = data.base_happiness
    const pokemonCaptureRate = data.capture_rate
    const pokemonColor = data.color.name
    const pokemonShape = data.shape.name
    const pokemonHabitat = data.habitat != null ? data.habitat.name : null
    const pokemonHasGenderDifference = data.has_gender_differences
    const pokemonGeneration = data.generation.name
    const pokemonIsBaby = data.is_baby
    const pokemonIsLegendary = data.is_legendary
    const pokemonIsMythical = data.is_mythical

    let pokemonEggCycle
    let pokemonStepsHatchEgg

    if (data.hatch_counter != null) {
        pokemonEggCycle = data.hatch_counter
        pokemonStepsHatchEgg = support.stepsHatchEgg(pokemonEggCycle)
    }
}

const getGenderDistribution = async (pokemon) => {
    const data = await api.fetchSpecieAPI(pokemon)

    if (!data) {
        console.error('Data not found in getGenderDistribution.')
        return
    }

    const genderRate = data.gender_rate

    const distribution = support.calcGenderDistribution(genderRate)
}

const getPokemonTypes = async (pokemon) => {
    const data = await api.fetchPokemonAPI(pokemon)

    if (!data) {
        console.error('Data not found in getPokemonTypes.')
        return
    }

    const pokemonTypes = []
    const dataTypes = data.types

    dataTypes.forEach((pokemonType) => {
        const type = pokemonType.type.name

        getPokemonWeakness(type)
        getPokemonBenefits(type)

        pokemonTypes.push(type)
    })
}

const getPokemonMoves = async (pokemon) => {
    const data = await api.fetchPokemonAPI(pokemon)

    if (!data) {
        console.error('Data not found in getPokemonMoves.')
        return
    }

    const dataMoves = data.moves

    dataMoves.forEach((pokemonMove) => {
        const move = pokemonMove.move.name

        getMoveInfos(move)
    })
}

const getMoveInfos = async (pokemonMove) => {
    const data = await api.fetchMoveAPI(pokemonMove)

    if (!data) {
        console.error('Data not found in getMoveInfos.')
        return
    }

    const moveName = support.capitalize(data.name)
    const moveType = data.type.name
    const moveDamageClass = data.damage_class.name
    const movePower = data.power
    const moveAccuracy = data.accuracy
    const movePP = data.pp
    const movePriority = data.priority

    let moveContestType
    let moveEffect
    let moveDescription = []

    if (!data.contest_type) {
        moveContestType = '-'
    } else {
        moveContestType = data.contest_type.name
    }

    if (!data.effect_entries[0]) {
        moveEffect = '-'
    } else {
        moveEffect = data.effect_entries[0].effect
    }

    if (!data.flavor_text_entries) {
        moveDescription = '-'
    } else {
        const dataDescription = data.flavor_text_entries

        dataDescription.forEach((description) => {
            if (description.language.name === "en") {
                moveDescription.push([description.version_group.name, description.flavor_text])
            }
        })
    }
}

const getPokemonAbilities = async (pokemon) => {
    const data = await api.fetchPokemonAPI(pokemon)

    if (!data) {
        console.error('Data not found in getPokemonAbilities.')
        return
    }

    const pokemonAbilities = []
    const dataAbilities = data.abilities

    dataAbilities.forEach((pokemonAbility) => {
        getPokemonAbilityInfos(pokemonAbility.ability.name)

        pokemonAbilities.push([pokemonAbility.ability.name, pokemonAbility.is_hidden])
    })
}

const getPokemonAbilityInfos = async (pokemonAbility) => {
    const data = await api.fetchAbilityAPI(pokemonAbility)

    if (!data) {
        console.error('Data not found in getPokemonAbilityInfos.')
        return
    }

    const dataEffects = data.effect_entries

    let abilityEffect

    dataEffects.forEach((dataEffect) => {
        if (dataEffect.language.name === "en") {
            abilityEffect = dataEffect.effect
        }
    })
}

const getPokemonImage = async (pokemon) => {
    const data = await api.fetchPokemonAPI(pokemon)

    if (!data) {
        console.error('Data not found in getPokemonImage.')
        return
    }

    const pokemonId = ("000" + data.id).slice(-3)
    const pokemonImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId}.png`
}

const getPokemonSpriteMale = async (pokemon) => {
    const data = await api.fetchPokemonAPI(pokemon)

    if (!data) {
        console.error('Data not found in getPokemonSpriteMale.')
        return
    }

    const pokemonId = ("000" + data.id).slice(-3)

    let pokemonSpriteFrontMale
    let pokemonSpriteBackMale
    let pokemonSpriteFrontMaleShiny
    let pokemonSpriteBackMaleShiny

    if (pokemonId >= 650) {
        pokemonSpriteFrontMale = data.sprites.versions["generation-v"]["black-white"].front_default
        pokemonSpriteBackMale = data.sprites.versions["generation-v"]["black-white"].back_default

        pokemonSpriteFrontMaleShiny = data.sprites.versions["generation-v"]["black-white"].front_shiny
        pokemonSpriteBackMaleShiny = data.sprites.versions["generation-v"]["black-white"].back_shiny
    } else {
        pokemonSpriteFrontMale = data.sprites.versions["generation-v"]["black-white"].animated.front_default
        pokemonSpriteBackMale = data.sprites.versions["generation-v"]["black-white"].animated.back_default

        pokemonSpriteFrontMaleShiny = data.sprites.versions["generation-v"]["black-white"].animated.front_shiny
        pokemonSpriteBackMaleShiny = data.sprites.versions["generation-v"]["black-white"].animated.back_shiny
    }
}

const getPokemonSpriteFemale = async (pokemon) => {
    const data = await api.fetchPokemonAPI(pokemon)

    if (!data) {
        console.error('Data not found in getPokemonSpriteFemale.')
        return
    }

    const pokemonId = ("000" + data.id).slice(-3)

    let pokemonSpriteFrontFemale
    let pokemonSpriteBackFemale
    let pokemonSpriteFrontFemaleShiny
    let pokemonSpriteBackFemaleShiny

    if (pokemonId >= 650) {
        pokemonSpriteFrontFemale = data.sprites.versions["generation-v"]["black-white"].front_female
        pokemonSpriteBackFemale = data.sprites.versions["generation-v"]["black-white"].back_female

        pokemonSpriteFrontFemaleShiny = data.sprites.versions["generation-v"]["black-white"].front_shiny_female
        pokemonSpriteBackFemaleShiny = data.sprites.versions["generation-v"]["black-white"].back_shiny_female
    } else {
        pokemonSpriteFrontFemale = data.sprites.versions["generation-v"]["black-white"].animated.front_female
        pokemonSpriteBackFemale = data.sprites.versions["generation-v"]["black-white"].animated.back_female

        pokemonSpriteFrontFemaleShiny = data.sprites.versions["generation-v"]["black-white"].animated.front_shiny_female
        pokemonSpriteBackFemaleShiny = data.sprites.versions["generation-v"]["black-white"].animated.back_shiny_female
    }
}

const getPokemonHeldItems = async (pokemon) => {
    const data = await api.fetchPokemonAPI(pokemon)

    if (!data) {
        console.error('Data not found in getPokemonHeldItems.')
        return
    }

    const pokemonItems = []
    const dataItems = data.held_items

    dataItems.forEach((pokemonItem) => {
        pokemonItems.push(support.capitalize(pokemonItem.item.name))
    })
}

const getPokemonWeakness = async (pokemonType) => {
    const data = await api.fetchTypeAPI(pokemonType)

    if (!data) {
        console.error('Data not found in getPokemonWeakness.')
        return
    }

    const doubleDamage = data.damage_relations.double_damage_from
    const halfDamage = data.damage_relations.half_damage_from
    const noDamage = data.damage_relations.no_damage_from

    const doubleDamageTypes = getWeakStrongTypes(doubleDamage)
    const halfDamageTypes = getWeakStrongTypes(halfDamage)
    const noDamageTypes = getWeakStrongTypes(noDamage)
}

const getPokemonBenefits = async (pokemonType) => {
    const data = await api.fetchTypeAPI(pokemonType)

    if (!data) {
        console.error('Data not found in getPokemonBenefits.')
        return
    }

    const doubleDamage = data.damage_relations.double_damage_to
    const halfDamage = data.damage_relations.half_damage_to
    const noDamage = data.damage_relations.no_damage_to

    const doubleDamageTypes = getWeakStrongTypes(doubleDamage)
    const halfDamageTypes = getWeakStrongTypes(halfDamage)
    const noDamageTypes = getWeakStrongTypes(noDamage)
}

const getWeakStrongTypes = (types) => {
    const dataTypes = []

    types.forEach((type) => {
        dataTypes.push(type.name)
    })

    return dataTypes
}

const getPokemonEggGroup = async (pokemon) => {
    const data = await api.fetchSpecieAPI(pokemon)

    if (!data) {
        console.error('Data not found in getPokemonEggGroup.')
        return
    }

    const pokemonEggGroups = []
    const dataEggGroups = data.egg_groups

    dataEggGroups.forEach((pokemonEggGroup) => {
        pokemonEggGroups.push(support.capitalize(pokemonEggGroup.name))
    })
}

const getPokemonVarieties = async (pokemon) => {
    const data = await api.fetchSpecieAPI(pokemon)

    if (!data) {
        console.error('Data not found in getPokemonVarieties.')
        return
    }

    const pokemonVarieties = []
    const dataVarieties = data.varieties

    dataVarieties.forEach((pokemonVarietion) => {
        getPokemonVarietionImage(pokemonVarietion.pokemon.url)

        pokemonVarieties.push([pokemonVarietion.is_default, support.capitalize(pokemonVarietion.pokemon.name)])
    })
}

const getPokemonVarietionImage = async (pokemonVarietionURL) => {
    const data = await api.fetchVarietionAPI(pokemonVarietionURL)

    if (!data) {
        console.error('Data not found in getPokemonVarietionImage.')
        return
    }

    const pokemonSpriteFront = data.sprites.versions["generation-v"]["black-white"].front_default
    const pokemonSpriteBack = data.sprites.versions["generation-v"]["black-white"].back_default
    const pokemonSpriteFrontShiny = data.sprites.versions["generation-v"]["black-white"].front_shiny
    const pokemonSpriteBackShiny = data.sprites.versions["generation-v"]["black-white"].back_shiny
}

const getPokedexInfos = async (pokemon) => {
    const data = await api.fetchSpecieAPI(pokemon)

    if (!data) {
        console.error('Data not found in getPokedexInfos.')
        return
    }

    const pokedexDescription = []
    const dataGenera = data.genera

    let pokemonGenus

    dataGenera.forEach((dataGenus) => {
        if (dataGenus.language.name === "en") {
            pokemonGenus = dataGenus.genus
        }
    })

    const dataPokedex = data.flavor_text_entries

    dataPokedex.forEach((pokedexInfo) => {
        if (pokedexInfo.language.name === "en") {
            pokedexDescription.push([support.capitalize(pokedexInfo.version.name), pokedexInfo.flavor_text])
        }
    })
}

const startApp = (pokemon) => {
    getPokemonData(pokemon)
    getPokemonTypes(pokemon)
    getPokemonMoves(pokemon)
    getPokemonAbilities(pokemon)
    getPokemonImage(pokemon)
    getPokemonSpriteMale(pokemon)
    getPokemonSpriteFemale(pokemon)
    getPokemonHeldItems(pokemon)
    getPokemonEggGroup(pokemon)
    getPokemonVarieties(pokemon)
    getPokedexInfos(pokemon)
    getGenderDistribution(pokemon)

    pokemonStats.getPokemonGrowthRate(pokemon)
    pokemonStats.getPokemonStats(pokemon)

    pokemonEvolutions.getEvolutionChainURL(pokemon)
}

startApp(defaultPokemon.toString().toLowerCase())

// setInterval(() => {
//     defaultPokemon++
//     console.log(defaultPokemon)
//     startApp(defaultPokemon.toString().toLowerCase())
// }, 500)
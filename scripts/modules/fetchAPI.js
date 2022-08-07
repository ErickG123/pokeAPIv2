export default class API {
    fetchPokemonAPI = async (pokemon) => {
        const pokemonInfosURL = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`

        try {
            const APIResponse = await fetch(pokemonInfosURL)
            const data = await APIResponse.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    fetchMoveAPI = async (moveName) => {
        const moveInfosURL = `https://pokeapi.co/api/v2/move/${moveName}`

        try {
            const APIResponse = await fetch(moveInfosURL)
            const data = await APIResponse.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    fetchAbilityAPI = async (abilityName) => {
        const abilitiesInfosURL = `https://pokeapi.co/api/v2/ability/${abilityName}`

        try {
            const APIResponse = await fetch(abilitiesInfosURL)
            const data = await APIResponse.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    fetchTypeAPI = async (typeName) => {
        const typeInfosURL = `https://pokeapi.co/api/v2/type/${typeName}`

        try {
            const APIResponse = await fetch(typeInfosURL)
            const data = await APIResponse.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    fetchSpecieAPI = async (pokemonId) => {
        const specieInfosURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`

        try {
            const APIResponse = await fetch(specieInfosURL)
            const data = await APIResponse.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    fetchGrowthRateAPI = async (growthRateName) => {
        const growthRateInfosURL = `https://pokeapi.co/api/v2/growth-rate/${growthRateName}/`

        try {
            const APIResponse = await fetch(growthRateInfosURL)
            const data = await APIResponse.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    fetchEvolutionAPI = async (evolutionChainURL) => {
        try {
            const APIResponse = await fetch(evolutionChainURL)
            const data = await APIResponse.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    fetchVarietionAPI = async (pokemonVarietionURL) => {
        try {
            const APIResponse = await fetch(pokemonVarietionURL)
            const data = await APIResponse.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }
}
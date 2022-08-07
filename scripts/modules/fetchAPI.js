export default class API {
    fetchPokemonAPI = async (pokemon) => {
        const pokemonInfosURL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

        const APIResponse = await fetch(pokemonInfosURL)

        if (APIResponse.status === 200) {
            const data = await APIResponse.json()
            return data
        }
    }

    fetchSpecieAPI = async (pokemonId) => {
        const specieInfosURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`

        const APIResponse = await fetch(specieInfosURL)

        if (APIResponse.status === 200) {
            const data = await APIResponse.json()
            return data
        }
    }

    fetchMoveAPI = async (moveName) => {
        const moveInfosURL = `https://pokeapi.co/api/v2/move/${moveName}`

        const APIResponse = await fetch(moveInfosURL)

        if (APIResponse.status === 200) {
            const data = await APIResponse.json()
            return data
        }
    }

    fetchAbilityAPI = async (abilityName) => {
        const abilitiesInfosURL = `https://pokeapi.co/api/v2/ability/${abilityName}`

        const APIResponse = await fetch(abilitiesInfosURL)

        if (APIResponse.status === 200) {
            const data = await APIResponse.json()
            return data
        }
    }

    fetchTypeAPI = async (typeName) => {
        const typeInfosURL = `https://pokeapi.co/api/v2/type/${typeName}`

        const APIResponse = await fetch(typeInfosURL)

        if (APIResponse.status === 200) {
            const data = await APIResponse.json()
            return data
        }
    }

    fetchGrowthRateAPI = async (growthRateName) => {
        const growthRateInfosURL = `https://pokeapi.co/api/v2/growth-rate/${growthRateName}/`

        const APIResponse = await fetch(growthRateInfosURL)

        if (APIResponse.status === 200) {
            const data = await APIResponse.json()
            return data
        }
    }

    fetchEvolutionAPI = async (evolutionChainURL) => {
        const APIResponse = await fetch(evolutionChainURL)

        if (APIResponse.status === 200) {
            const data = await APIResponse.json()
            return data
        }
    }

    fetchVarietionAPI = async (pokemonVarietionURL) => {
        const APIResponse = await fetch(pokemonVarietionURL)

        if (APIResponse.status === 200) {
            const data = await APIResponse.json()
            return data
        }
    }
}
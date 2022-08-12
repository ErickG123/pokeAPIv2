import API from "../modules/fetchAPI.js"
const api = new API()

import Support from "../modules/supportFunctions.js"
let support = new Support()

export default class PokemonEvolutions {
    getEvolutionChainURL = async (pokemon) => {
        const data = await api.fetchSpecieAPI(pokemon)

        if (!data || !data.evolution_chain) {
            console.error('Data not found in getEvolutionChainURL.')
            return
        }

        const evolutionChainURL = data.evolution_chain.url
        const dataEvolution = await api.fetchEvolutionAPI(evolutionChainURL)

        this.getFirstStage(dataEvolution)
        this.getSecondStage(dataEvolution)
        this.getFinalStage(dataEvolution)
    }

    getFirstStage = (dataEvolution) => {
        const pokemonName = support.capitalize(dataEvolution.chain.species.name)
        const pokemonIsBaby = dataEvolution.chain.species.is_baby
        const pokemonBabyTriggerItem = dataEvolution.baby_trigger_item

        return {
            pokemonName,
            pokemonIsBaby,
            pokemonBabyTriggerItem
        }
    }

    getSecondStage = (dataEvolution) => {
        let pokemonName = []

        let pokemonEvolutions = dataEvolution.chain.evolves_to

        pokemonEvolutions.map((evolution) => {
            pokemonName.push(support.capitalize(evolution.species.name))
        })

        return pokemonName
    }

    getFinalStage = (dataEvolution) => {
        let pokemonName = []

        let finalEvolutions = dataEvolution.chain.evolves_to

        finalEvolutions.map((evolution) => {
            let pokemonEvolutions = evolution.evolves_to

            pokemonEvolutions.map((pokemon) => {
                pokemonName.push(support.capitalize(pokemon.species.name))
            })
        })

        return pokemonName
    }
}
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

        let numberEvolution = dataEvolution.chain.evolves_to.length - 1

        while (numberEvolution != -1) {
            let dataEvolve = dataEvolution.chain.evolves_to[numberEvolution]

            pokemonName.push(support.capitalize(dataEvolve.species.name))

            numberEvolution--
        }
    }

    getFinalStage = (dataEvolution) => {
        let pokemonName = []

        let numberEvolution = dataEvolution.chain.evolves_to.length - 1

        while (numberEvolution != -1) {
            let dataSecondEvolve = dataEvolution.chain.evolves_to[numberEvolution]

            let dataFinalEvolve = dataSecondEvolve.evolves_to

            let numberFinalEvolutions = dataFinalEvolve.length - 1

            while (numberFinalEvolutions != -1) {
                pokemonName.push(support.capitalize(dataFinalEvolve[numberFinalEvolutions].species.name))

                numberFinalEvolutions--
            }

            numberEvolution--
        }
    }
}
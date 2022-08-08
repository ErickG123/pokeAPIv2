import API from "../modules/fetchAPI.js"
const api = new API()

export default class PokemonStats {
    getPokemonGrowthRate = async (pokemon) => {
        const data = await api.fetchSpecieAPI(pokemon)

        if (!data) {
            console.error('Data not found in getPokemonGrowthRate.')
            return
        }

        const pokemonGrowthRate = data.growth_rate.name

        this.getPokemonXPPerLevel(pokemonGrowthRate)
    }

    getPokemonXPPerLevel = async (growthRateName) => {
        const data = await api.fetchGrowthRateAPI(growthRateName)

        if (!data) {
            console.error('Data not found in getPokemonXPPerLevel.')
            return
        }

        const pokemonXPPerLevel = []
        const dataLevels = data.levels

        dataLevels.forEach((pokemonLevel) => {
            pokemonXPPerLevel.push([pokemonLevel.level, pokemonLevel.experience])
        })
    }

    getPokemonStats = async (pokemon) => {
        const data = await api.fetchPokemonAPI(pokemon)

        if (!data) {
            console.error('Data not found in getPokemonStats.')
            return
        }

        const pokemonStats = []
        const dataStats = data.stats

        dataStats.forEach((pokemonStatus) => {
            pokemonStats.push(pokemonStatus.base_stat)
        })

        this.getBasePokemonStats(pokemonStats)
    }

    getBasePokemonStats = (pokemonStats) => {
        let baseHP = pokemonStats[0]
        let baseAttack = pokemonStats[1]
        let baseDefense = pokemonStats[2]
        let baseSpecialAttack = pokemonStats[3]
        let baseSpecialDefense = pokemonStats[4]
        let baseSpeed = pokemonStats[5]

        this.calcMinStatsPokemon(baseHP, baseAttack, baseDefense, baseSpecialAttack, baseSpecialDefense, baseSpeed)
        this.calcMaxStatsPokemon(baseHP, baseAttack, baseDefense, baseSpecialAttack, baseSpecialDefense, baseSpeed)
        this.calcTotalStatsPokemon(baseHP, baseAttack, baseDefense, baseSpecialAttack, baseSpecialDefense, baseSpeed)
    }

    calcMinStatsPokemon = (baseHP, baseAttack, baseDefense, baseSpecialAttack, baseSpecialDefense, baseSpeed) => {
        /* 
            Pokémon LVL. 100 | No Nature | IV 0 | EV 0

            HP = ((2 * Base + IV + (EV / 4) * Level) / 100) + Level + 10
            Other Stats = ((2 * Base + IV + (EV/4) * Level) / 100) + 5
        */

        const minHP = Math.floor(((2 * baseHP * 100) / 100) + 100 + 10)
        const minAttack = Math.floor(((2 * baseAttack * 100) / 100) + 5)
        const minDefense = Math.floor(((2 * baseDefense * 100) / 100) + 5)
        const minSpecialAttack = Math.floor(((2 * baseSpecialAttack * 100) / 100) + 5)
        const minSpecialDefense = Math.floor(((2 * baseSpecialDefense * 100) / 100) + 5)
        const minSpeed = Math.floor(((2 * baseSpeed * 100) / 100) + 5)
    }

    calcMaxStatsPokemon = (baseHP, baseAttack, baseDefense, baseSpecialAttack, baseSpecialDefense, baseSpeed) => {
        /* 
            Pokémon LVL. 100 | No Nature | IV 31 | EV 252

            HP = ((2 * Base + IV + (EV / 4) * Level) / 100) + Level + 10
            Other Stats = ((2 * Base + IV + (EV/4) * Level) / 100) + 5
        */

        const maxHP = Math.floor(((((2 * baseHP) + 31 + (252 / 4)) * 100) / 100) + 100 + 10)
        const maxAttack = Math.floor(((((2 * baseAttack) + 31 + (252 / 4)) * 100) / 100) + 5)
        const maxDefense = Math.floor(((((2 * baseDefense) + 31 + (252 / 4)) * 100) / 100) + 5)
        const maxSpecialAttack = Math.floor(((((2 * baseSpecialAttack) + 31 + (252 / 4)) * 100) / 100) + 5)
        const maxSpecialDefense = Math.floor(((((2 * baseSpecialDefense) + 31 + (252 / 4)) * 100) / 100) + 5)
        const maxSpeed = Math.floor(((((2 * baseSpeed) + 31 + (252 / 4)) * 100) / 100) + 5)
    }

    calcTotalStatsPokemon = (baseHP, baseAttack, baseDefense, baseSpecialAttack, baseSpecialDefense, baseSpeed) => {
        const totalStats = baseHP + baseAttack + baseDefense + baseSpecialAttack + baseSpecialDefense + baseSpeed
    }
}
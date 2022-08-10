export default class Support {
    capitalize = (word) => {
        const wordReplace = word.replaceAll('-', ' ')
        const wordCapitalized = wordReplace.charAt(0).toUpperCase() + wordReplace.slice(1)

        return wordCapitalized
    }

    capitalizeArray = (array) => {
        const wordsCapitalizeds = []

        array.forEach((word) => {
            const wordReplace = word.replaceAll('-', ' ')
            const wordCapitalized = wordReplace.charAt(0).toUpperCase() + wordReplace.slice(1)

            wordsCapitalizeds.push(wordCapitalized)
        })
    }

    stepsHatchEgg = (eggCycle) =>  {
        const steps = eggCycle * 256
  
        return steps
    }

    calcGenderDistribution = (genderRate) => {
        const female = (genderRate * 100) / 8
        const male = 100 - female

        return {
            female,
            male
        }
    }
}
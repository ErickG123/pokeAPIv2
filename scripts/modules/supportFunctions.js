export default class Support {
    capitalize = (moveName) => {
        const moveNameReplace = moveName.replaceAll('-', ' ')
        const moveNameCapitalized = moveNameReplace.charAt(0).toUpperCase() + moveNameReplace.slice(1)

        return moveNameCapitalized
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
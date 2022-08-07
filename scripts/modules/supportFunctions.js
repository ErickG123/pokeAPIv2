export default class Support {
    capitalize = (moveName) => {
        const moveNameReplace = moveName.replaceAll('-', ' ')
        const moveNameCapitalized = moveNameReplace.charAt(0).toUpperCase() + moveNameReplace.slice(1)

        return moveNameCapitalized
    }
}
/* The `import type { ColorLevel } from '../@types/common'` statement is importing the `ColorLevel`
type from the `common` module located in the `@types` directory. The `import type` syntax is used to
import only the type information and not the actual runtime value. This allows for better type
checking and optimization during compilation. */
import type { ColorLevel } from '../@types/common'

type Action = 'decrement' | 'increment'

function useColorLevel(level: ColorLevel): ColorLevel[] {
    /* The `const colorLevel` is an array that contains different color levels represented as strings.
    Each string represents a specific color level, ranging from '50' to '900'. These color levels
    are commonly used in web development to define the intensity or shade of a color. */
    const colorLevel = [
        '50',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
    ]

    /* The line `const index = colorLevel.indexOf(level?.toString())` is finding the index of the
    `level` value in the `colorLevel` array. */
    const index = colorLevel.indexOf(level?.toString())

    /**
     * The function calculates the level based on the given action and index.
     * @param {Action} action - The `action` parameter is a string that represents the action to be
     * performed. It can have two possible values: "decrement" or "increment".
     * @returns the level value.
     */
    function calculateLevel(action: Action) {
        if (index === 0 || index === colorLevel.length - 1) {
            return level
        }
        if (action === 'decrement') {
            return colorLevel[index - 1]
        }
        if (action === 'increment') {
            return colorLevel[index + 1]
        }
    }

    /* The line `const decreaseLevel = calculateLevel('decrement')` is calling the `calculateLevel`
    function with the argument `'decrement'`. This function calculates the level based on the given
    action and index. In this case, it will return the color level that comes before the current
    level in the `colorLevel` array. The returned value is then assigned to the `decreaseLevel`
    constant. */
    const decreaseLevel = calculateLevel('decrement')

    /* The line `const increaseLevel = calculateLevel('increment')` is calling the `calculateLevel`
    function with the argument `'increment'`. This function calculates the level based on the given
    action and index. In this case, it will return the color level that comes after the current
    level in the `colorLevel` array. The returned value is then assigned to the `increaseLevel`
    constant. */
    const increaseLevel = calculateLevel('increment')

    /* The line `return [increaseLevel as ColorLevel, decreaseLevel as ColorLevel]` is returning an
    array containing two elements. The first element is `increaseLevel` casted as `ColorLevel`, and
    the second element is `decreaseLevel` casted as `ColorLevel`. */
    return [increaseLevel as ColorLevel, decreaseLevel as ColorLevel]
}

export default useColorLevel

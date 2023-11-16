/* The code is importing two things from the 'react' library. */
import { createContext } from 'react'
import type { SyntheticEvent } from 'react'

/**
 * The `MenuContextProps` type is a TypeScript type that represents the props for a menu component,
 * including an optional active key and an optional onSelect function.
 * @property {string} activeKey - The activeKey property is used to specify the currently active key in
 * the menu. This is typically used to highlight or indicate the currently selected menu item.
 * @property onSelect - The `onSelect` property is a function that is called when a menu item is
 * selected. It takes two parameters: `eventKey`, which is the key of the selected menu item, and
 * `event`, which is the synthetic event object.
 */
export type MenuContextProps = {
    activeKey?: string
    onSelect?: (eventKey: string, event: SyntheticEvent) => void
}

/* The line `const MenuContext = createContext<MenuContextProps | null>(null)` is creating a context
object called `MenuContext` using the `createContext` function from the 'react' library. The
`createContext` function takes a generic type argument, which in this case is `MenuContextProps |
null`. This means that the context object can accept values of type `MenuContextProps` or `null`.
The initial value of the context is set to `null` using the `null` argument passed to
`createContext`. */
const MenuContext = createContext<MenuContextProps | null>(null)

/* `export const MenuContextProvider = MenuContext.Provider` is exporting a constant variable called
`MenuContextProvider` that is assigned the value of `MenuContext.Provider`. */
export const MenuContextProvider = MenuContext.Provider

/* `export default MenuContext` is exporting the `MenuContext` object as the default export of the
module. This means that when another module imports this module, they can import the `MenuContext`
object using any name they choose. For example, they can import it as `import MyMenuContext from
'./MenuContext'`. */
export default MenuContext

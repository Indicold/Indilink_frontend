/* The code is importing the `createContext` function from the `react` library and importing the
`TypeAttributes` type from the `common` module located in the `@types` directory. */
import { createContext } from 'react'
import type { TypeAttributes } from '../../@types/common'

/* The `export interface MenuContextProps` is defining an interface called `MenuContextProps`. This
interface specifies the shape of the props that can be passed to the `MenuContext` component. */
export interface MenuContextProps {
    defaultActiveKeys?: Array<string>
    defaultExpandedKeys?: Array<string>
    menuItemHeight?: number
    onSelect?: (eventKey: string, e: MouseEvent) => void
    sideCollapsed?: boolean
    variant?: TypeAttributes.MenuVariant
}

/* The line `const MenuContext = createContext<MenuContextProps>({})` is creating a new context object
called `MenuContext` using the `createContext` function from the `react` library. The
`createContext` function takes an optional argument, which is the default value for the context. In
this case, the default value is an empty object `{}`. */
const MenuContext = createContext<MenuContextProps>({})

/* `export const MenuContextProvider = MenuContext.Provider` is exporting a constant variable called
`MenuContextProvider` that is assigned the value of `MenuContext.Provider`. */
export const MenuContextProvider = MenuContext.Provider

/* `export const MenuContextConsumer = MenuContext.Consumer` is exporting a constant variable called
`MenuContextConsumer` that is assigned the value of `MenuContext.Consumer`. */
export const MenuContextConsumer = MenuContext.Consumer

/* `export default MenuContext` is exporting the `MenuContext` object as the default export of the
module. This means that when another module imports this module using the `import` statement, the
default export will be assigned to the imported variable. For example, if another module imports
this module like this: `import MenuContext from './MenuContext'`, the `MenuContext` variable will be
assigned the value of the `MenuContext` object. */
export default MenuContext

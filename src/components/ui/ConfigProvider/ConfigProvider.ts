/* The code is importing several modules and types from different files. */
import { createContext, useContext } from 'react'
import { SIZES } from '../utils/constants'
import type { TypeAttributes, ColorLevel } from '../@types/common'

/**
 * The above type represents a configuration object with various properties for customizing the theme,
 * mode, locale, color level, border style, control size, navigation mode, and direction.
 * @property {string} themeColor - A string representing the color theme of the application.
 * @property {'light' | 'dark'} mode - The `mode` property is a string that can have two possible
 * values: 'light' or 'dark'. It represents the current theme mode of the application.
 * @property {string} locale - A string representing the locale or language used in the application.
 * @property {ColorLevel} primaryColorLevel - The `primaryColorLevel` property is of type `ColorLevel`.
 * It represents the level of intensity or shade of the primary color used in the theme.
 * @property {boolean} cardBordered - A boolean value indicating whether the cards should have borders
 * or not.
 * @property controlSize - The `controlSize` property represents the size of the controls in the
 * application. It is of type `TypeAttributes.ControlSize`.
 * @property navMode - The `navMode` property is used to specify the variant of the navigation menu. It
 * can have one of the following values:
 * @property direction - The `direction` property represents the direction of the user interface, such
 * as left-to-right (LTR) or right-to-left (RTL).
 */
export type Config = {
    themeColor: string
    mode: 'light' | 'dark'
    locale: string
    primaryColorLevel: ColorLevel
    cardBordered: boolean
    controlSize: TypeAttributes.ControlSize
    navMode: TypeAttributes.MenuVariant
    direction: TypeAttributes.Direction
}

/* The `export const defaultConfig` statement is exporting a constant object named `defaultConfig`.
This object represents the default configuration for the application's theme, mode, locale, color
level, border style, control size, navigation mode, and direction. */
export const defaultConfig = {
    themeColor: 'indigo',
    direction: 'ltr',
    mode: 'light',
    locale: 'en',
    primaryColorLevel: 600,
    cardBordered: false,
    controlSize: SIZES.MD,
    navMode: 'light',
} as const

/* The line `export const ConfigContext = createContext<Config>(defaultConfig)` is creating a context
object named `ConfigContext` using the `createContext` function from the `react` module. The
`createContext` function takes an optional argument, which is the default value for the context. In
this case, the default value is `defaultConfig`, which is of type `Config`. The `<Config>` syntax is
a type assertion, specifying that the context value should be of type `Config`. */
export const ConfigContext = createContext<Config>(defaultConfig)

/* `const ConfigProvider = ConfigContext.Provider` is assigning the `Provider` property of the
`ConfigContext` object to a constant variable named `ConfigProvider`. */
const ConfigProvider = ConfigContext.Provider

/* `export const ConfigConsumer = ConfigContext.Consumer` is creating a constant variable named
`ConfigConsumer` and assigning it the value of `ConfigContext.Consumer`. */
export const ConfigConsumer = ConfigContext.Consumer

/**
 * The function returns the value of the ConfigContext using the useContext hook.
 * @returns The `useConfig` function returns the value of the `ConfigContext` using the `useContext`
 * hook.
 */
export function useConfig() {
    return useContext(ConfigContext)
}

/* `export default ConfigProvider` is exporting the `ConfigProvider` constant as the default export of
the module. This means that when another module imports this module using the `import` statement,
the default export will be assigned to the imported variable. In this case, the default export is
the `ConfigProvider` constant, which represents the `Provider` property of the `ConfigContext`
object. */
export default ConfigProvider

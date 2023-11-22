/* The line `import { createContext } from 'react'` is importing the `createContext` function from the
`react` library. This function is used to create a new context object in React. */
import { createContext } from 'react'

/* The line `import type { SyntheticEvent } from 'react'` is importing the `SyntheticEvent` type from
the `react` library. This type is used to represent synthetic events in React, which are events that
are created by React itself rather than by the browser. */
import type { SyntheticEvent } from 'react'

/**
 * The `DropdownContextProps` type defines the props for a dropdown component, including an optional
 * active key and an optional onSelect function.
 * @property {string | null} activeKey - The activeKey property is used to specify the currently active
 * key in the dropdown. It can be a string or null.
 * @property onSelect - The `onSelect` property is a function that is called when an item in the
 * dropdown is selected. It takes two parameters: `eventKey`, which is the key of the selected item,
 * and `event`, which is the synthetic event object.
 */
export type DropdownContextProps = {
    activeKey?: string | null
    onSelect?: (eventKey: string, event: SyntheticEvent) => void
}

/* The line `const DropdownContext = createContext<DropdownContextProps | null>(null)` is creating a
new context object called `DropdownContext` using the `createContext` function from the `react`
library. The `createContext` function takes a generic type argument, which in this case is
`DropdownContextProps | null`. This means that the context object can accept values of type
`DropdownContextProps` or `null`. */
const DropdownContext = createContext<DropdownContextProps | null>(null)

/* The line `export const DropdownContextProvider = DropdownContext.Provider` is exporting a constant
variable called `DropdownContextProvider`. This variable is assigned the value of
`DropdownContext.Provider`, which is a component that provides the context values to its
descendants. */
export const DropdownContextProvider = DropdownContext.Provider

/* The line `export const DropdownContextConsumer = DropdownContext.Consumer` is exporting a constant
variable called `DropdownContextConsumer`. This variable is assigned the value of
`DropdownContext.Consumer`, which is a component that consumes the context values provided by the
`DropdownContextProvider` component. */
export const DropdownContextConsumer = DropdownContext.Consumer

/* The line `export default DropdownContext` is exporting the `DropdownContext` object as the default
export of the module. This means that when another module imports this module using the `import`
statement, the default export will be assigned to the imported variable. In this case, the
`DropdownContext` object will be assigned to the imported variable. */
export default DropdownContext

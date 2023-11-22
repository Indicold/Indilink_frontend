/* The code is importing the `createContext` and `useContext` functions from the `react` library. It is
also importing the `TypeAttributes` type from the `../@types/common` file. */
import { createContext, useContext } from 'react'
import type { TypeAttributes } from '../@types/common'

/* The line `const InputGroupContext = createContext<{ size?: TypeAttributes.ControlSize } |
null>(null)` is creating a new context object called `InputGroupContext`. */
const InputGroupContext = createContext<{
    size?: TypeAttributes.ControlSize
} | null>(null)

/* `export const InputGroupContextProvider = InputGroupContext.Provider` is exporting a constant
variable called `InputGroupContextProvider` that is assigned the value of
`InputGroupContext.Provider`. */
export const InputGroupContextProvider = InputGroupContext.Provider

/* `export const InputGroupContextConsumer = InputGroupContext.Consumer` is exporting a constant
variable called `InputGroupContextConsumer` that is assigned the value of
`InputGroupContext.Consumer`. */
export const InputGroupContextConsumer = InputGroupContext.Consumer

/**
 * The function returns the value of the InputGroupContext.
 * @returns the value of the InputGroupContext that is being accessed through the useContext hook.
 */
export function useInputGroup() {
    return useContext(InputGroupContext)
}

export default InputGroupContext

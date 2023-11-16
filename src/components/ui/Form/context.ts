/* The code is importing two functions, `createContext` and `useContext`, from the 'react' library. It
is also importing a type called `TypeAttributes` from the '../@types/common' file. These imports are
used in the code to create and use a context in React. */
import { createContext, useContext } from 'react'
import type { TypeAttributes } from '../@types/common'

/**
 * The above type defines the props for a form context, including size, layout, and label width.
 * @property size - The size property is an optional attribute that specifies the size of the form
 * controls. It can be one of the values defined in the TypeAttributes.ControlSize type.
 * @property layout - The `layout` property is used to specify the layout of the form. It can have one
 * of the following values:
 * @property {string | number} labelWidth - The `labelWidth` property is used to specify the width of
 * the labels in the form. It can be specified as a string or a number.
 */
export type FormContextProps = {
    size?: TypeAttributes.ControlSize
    layout?: TypeAttributes.FormLayout
    labelWidth?: string | number
}

/* `const FormContext = createContext<FormContextProps | null>(null)` is creating a context object
called `FormContext` using the `createContext` function from the 'react' library. The
`createContext` function takes an optional initial value as an argument, which in this case is
`null`. */
const FormContext = createContext<FormContextProps | null>(null)

/* `export const FormContextProvider = FormContext.Provider` is exporting a constant variable called
`FormContextProvider` that is assigned the value of `FormContext.Provider`. */
export const FormContextProvider = FormContext.Provider

/* `export const FormContextConsumer = FormContext.Consumer` is exporting a constant variable called
`FormContextConsumer` that is assigned the value of `FormContext.Consumer`. */
export const FormContextConsumer = FormContext.Consumer

/**
 * The `useForm` function returns the context of the `FormContext` for use in a TypeScript application.
 * @returns The `useForm` function is returning the value of the `FormContext` using the `useContext`
 * hook.
 */
export function useForm() {
    return useContext(FormContext)
}

export default FormContext

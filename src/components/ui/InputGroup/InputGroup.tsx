/* These lines of code are importing various dependencies and components from different files. */
import { forwardRef } from 'react'
import classNames from 'classnames'
import { useConfig } from '../ConfigProvider'
import { useForm } from '../Form/context'
import { InputGroupContextProvider, InputGroupContextConsumer } from './context'

/* The line `import type { CommonProps, TypeAttributes } from '../@types/common'` is importing two
types from the `../@types/common` file. These types are `CommonProps` and `TypeAttributes`. By
importing them with the `type` keyword, TypeScript treats them as type-only imports, meaning they
are used for type checking but are not included in the compiled JavaScript code. These types are
likely used within the `InputGroup` component to define the prop types and attribute types that can
be passed to the component. */
import type { CommonProps, TypeAttributes } from '../@types/common'

/* The `export interface InputGroupProps extends CommonProps` statement is defining an interface called
`InputGroupProps` that extends the `CommonProps` interface. */
export interface InputGroupProps extends CommonProps {
    size?: TypeAttributes.ControlSize
}

/* The `const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>((props, ref) => { ... })`
statement is defining a functional component called `InputGroup` using the `forwardRef` function
from React. This component accepts two generic type parameters: `HTMLDivElement` for the type of the
`ref` prop, and `InputGroupProps` for the type of the `props` object. */
const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>((props, ref) => {
    /* The line `const { children, className, size } = props` is using object destructuring to extract
    the `children`, `className`, and `size` properties from the `props` object. This allows the code
    to access these properties directly without having to use `props.children`, `props.className`,
    and `props.size`. */
    const { children, className, size } = props

    /* The line `const { controlSize } = useConfig()` is using the `useConfig` hook to access the
    `controlSize` property from the configuration context. The `useConfig` hook is likely provided
    by a `ConfigProvider` component higher up in the component tree. By destructuring the
    `controlSize` property from the returned object, the code can directly access the value of
    `controlSize` without having to use `useConfig().controlSize`. */
    const { controlSize } = useConfig()

    /* The line `const formControlSize = useForm()?.size` is using optional chaining (`?.`) to access
    the `size` property of the object returned by the `useForm()` hook. */
    const formControlSize = useForm()?.size

    /* The line `const inputGroupSize = size || formControlSize || controlSize` is assigning a value to
    the `inputGroupSize` variable. */
    const inputGroupSize = size || formControlSize || controlSize

    /* The line `const inputGroupClass = classNames('input-group', className)` is using the
    `classNames` function from the `classnames` library to generate a string of CSS class names for
    the `InputGroup` component. */
    const inputGroupClass = classNames('input-group', className)

    /* The `const contextValue = { size: inputGroupSize }` statement is creating an object called
    `contextValue` with a single property `size`. The value of the `size` property is set to the
    value of the `inputGroupSize` variable. */
    const contextValue = {
        size: inputGroupSize,
    }
    return (
        <InputGroupContextProvider value={contextValue}>
            <InputGroupContextConsumer>
                {() => {
                    return (
                        <div ref={ref} className={inputGroupClass}>
                            {children}
                        </div>
                    )
                }}
            </InputGroupContextConsumer>
        </InputGroupContextProvider>
    )
})

InputGroup.displayName = 'InputGroup'

export default InputGroup

/* These lines of code are importing various dependencies and types that are used in the `Addon`
component. */
import { forwardRef } from 'react'
import classNames from 'classnames'
import { useConfig } from '../ConfigProvider'
import { useForm } from '../Form/context'
import { useInputGroup } from '../InputGroup/context'
import { CONTROL_SIZES } from '../utils/constants'
import type { CommonProps, TypeAttributes } from '../@types/common'

/* The code is defining an interface called `AddonProps` that extends the `CommonProps` interface. The
`AddonProps` interface includes a property called `size` which is optional and has a type of
`TypeAttributes.ControlSize`. This allows the `Addon` component to accept a `size` prop of type
`TypeAttributes.ControlSize`. */
export interface AddonProps extends CommonProps {
    size?: TypeAttributes.ControlSize
}

/* The code is defining a React functional component called `Addon`. It is using the `forwardRef`
function from React to forward the `ref` prop to the underlying `div` element. */
const Addon = forwardRef<HTMLDivElement, AddonProps>((props, ref) => {
    /* The line `const { size, children, className } = props` is using object destructuring to extract
    the `size`, `children`, and `className` properties from the `props` object. This allows the
    component to access these properties directly without having to use `props.size`,
    `props.children`, and `props.className`. */
    const { size, children, className } = props

    /* The line `const { controlSize } = useConfig()` is using the `useConfig` hook to access the
    `controlSize` property from the configuration context. It assigns the value of `controlSize` to
    the constant variable `controlSize`. This allows the `Addon` component to use the `controlSize`
    value in its logic and styling. */
    const { controlSize } = useConfig()

    /* The line `const formControlSize = useForm()?.size` is using the optional chaining operator
    (`?.`) to access the `size` property from the result of the `useForm()` hook. */
    const formControlSize = useForm()?.size

    /* The line `const inputGroupSize = useInputGroup()?.size` is using the optional chaining operator
    (`?.`) to access the `size` property from the result of the `useInputGroup()` hook. */
    const inputGroupSize = useInputGroup()?.size

    /* The line `const inputAddonSize = size || inputGroupSize || formControlSize || controlSize` is
    assigning a value to the `inputAddonSize` variable. */
    const inputAddonSize =
        size || inputGroupSize || formControlSize || controlSize

    /* The `classNames` function is used to generate a string of class names based on the provided
    arguments. In this case, the `addonClass` variable is assigned the result of calling
    `classNames` with three arguments: */
    const addonClass = classNames(
        'input-addon',
        `input-addon-${inputAddonSize} h-${CONTROL_SIZES[inputAddonSize]}`,
        className
    )

    return (
        <div ref={ref} className={addonClass}>
            {children}
        </div>
    )
})

Addon.displayName = 'Addon'

export default Addon

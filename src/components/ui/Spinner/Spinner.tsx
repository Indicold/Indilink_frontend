/* These lines of code are importing various dependencies and types that are used in the Spinner
component. */
import { forwardRef } from 'react'
import classNames from 'classnames'
import { useConfig } from '../ConfigProvider'
import { CgSpinner } from 'react-icons/cg'
import type { CommonProps } from '../@types/common'
import type { ElementType } from 'react'

/* The `export interface SpinnerProps extends CommonProps` statement is defining an interface called
`SpinnerProps` that extends another interface called `CommonProps`. */
export interface SpinnerProps extends CommonProps {
    color?: string
    enableTheme?: boolean
    indicator?: ElementType
    isSpining?: boolean
    size?: string | number
}

/* The code is defining a functional component called `Spinner` using the `forwardRef` function. The
`forwardRef` function allows the component to receive a `ref` prop and forward it to a child
component. */
const Spinner = forwardRef((props: SpinnerProps, ref) => {
    /* The code is using object destructuring to extract specific properties from the `props` object. */
    const {
        className,
        color,
        enableTheme = true,
        indicator: Component = CgSpinner,
        isSpining = true,
        size = 20,
        style,
        ...rest
    } = props

    /* The line `const { themeColor, primaryColorLevel } = useConfig()` is using the `useConfig` hook
    to extract the `themeColor` and `primaryColorLevel` values from the configuration context. These
    values are then assigned to the variables `themeColor` and `primaryColorLevel` respectively. */
    const { themeColor, primaryColorLevel } = useConfig()

    /* The line `const spinnerColor = color || (enableTheme && `-`)`
    is assigning a value to the `spinnerColor` variable. */
    const spinnerColor =
        color || (enableTheme && `${themeColor}-${primaryColorLevel}`)

    /* The `const spinnerStyle` is creating an object that defines the CSS styles for the Spinner
    component. It sets the `height` and `width` properties of the spinner to the value of the `size`
    prop. It also spreads the `style` prop, which allows additional custom styles to be passed to
    the Spinner component. */
    const spinnerStyle = {
        height: size,
        width: size,
        ...style,
    }

    /* The `classNames` function is used to conditionally concatenate multiple class names together. In
    this case, the `spinnerClass` variable is assigned the result of calling `classNames` with three
    arguments: */
    const spinnerClass = classNames(
        isSpining && 'animate-spin',
        spinnerColor && `text-${spinnerColor}`,
        className
    )

    return (
        <Component
            ref={ref}
            style={spinnerStyle}
            className={spinnerClass}
            {...rest}
        />
    )
})

Spinner.displayName = 'Spinner'

export default Spinner

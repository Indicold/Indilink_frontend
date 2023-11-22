/* These are import statements that import various dependencies and types used in the Button component. */
import { forwardRef } from 'react'
import classNames from 'classnames'
import { useConfig } from '../ConfigProvider'
import { useForm } from '../Form/context'
import { useInputGroup } from '../InputGroup/context'
import useColorLevel from '../hooks/useColorLevel'
import { CONTROL_SIZES, SIZES } from '../utils/constants'
import { Spinner } from '../Spinner'
import type { CommonProps, TypeAttributes, ColorLevel } from '../@types/common'
import type { ReactNode, ComponentPropsWithRef, MouseEvent } from 'react'

/* The `ButtonProps` interface defines the props that can be passed to the `Button` component. */
export interface ButtonProps
    extends CommonProps,
        Omit<ComponentPropsWithRef<'button'>, 'onClick'> {
    active?: boolean
    block?: boolean
    color?: string
    disabled?: boolean
    icon?: string | ReactNode
    loading?: boolean
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    shape?: TypeAttributes.Shape
    size?: TypeAttributes.Size
    variant?: 'solid' | 'twoTone' | 'plain' | 'default'
}

/**
 * The above type defines the color properties for a button in a TypeScript React application.
 * @property {string} bgColor - The background color of the button.
 * @property {string} hoverColor - The hoverColor property represents the color of the button when it
 * is being hovered over by the user.
 * @property {string} activeColor - The activeColor property represents the color of the button when it
 * is in an active or pressed state.
 * @property {string} textColor - The `textColor` property represents the color of the text displayed
 * on the button.
 */
type ButtonColor = {
    bgColor: string
    hoverColor: string
    activeColor: string
    textColor: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    /* The code snippet is using object destructuring to extract specific properties from the `props`
    object passed to the `Button` component. */
    const {
        active = false,
        block = false,
        children,
        className,
        color = '',
        disabled,
        icon,
        loading = false,
        shape = 'round',
        size,
        variant = 'default',
        ...rest
    } = props
    /* The line `const { themeColor, controlSize, primaryColorLevel } = useConfig()` is using the
    `useConfig` hook to retrieve the values of `themeColor`, `controlSize`, and `primaryColorLevel`
    from the configuration context. These values are then assigned to the corresponding variables
    using object destructuring. */
    const { themeColor, controlSize, primaryColorLevel } = useConfig()

    /* The line `const formControlSize = useForm()?.size` is using the `useForm` hook to retrieve the
    `size` property from the form context. The `useForm` hook returns an object that contains the
    form context, and the `size` property represents the size of the form control. The `?.` operator
    is used to safely access the `size` property in case the form context or the `size` property is
    undefined. The retrieved `size` value is then assigned to the `formControlSize` variable. */
    const formControlSize = useForm()?.size

    /* The line `const inputGroupSize = useInputGroup()?.size` is using the `useInputGroup` hook to
    retrieve the `size` property from the input group context. The `useInputGroup` hook returns an
    object that contains the input group context, and the `size` property represents the size of the
    input group. The `?.` operator is used to safely access the `size` property in case the input
    group context or the `size` property is undefined. The retrieved `size` value is then assigned
    to the `inputGroupSize` variable. */
    const inputGroupSize = useInputGroup()?.size
    const defaultClass = 'button'
    const sizeIconClass = 'inline-flex items-center justify-center'

    const splitedColor = color?.split('-') || []

    /* The line `const buttonSize = size || inputGroupSize || formControlSize || controlSize` is
    assigning a value to the `buttonSize` variable. It uses the logical OR (`||`) operator to check
    if the `size` prop is defined. If it is, the value of `size` is assigned to `buttonSize`. If
    `size` is not defined, it checks the next variable `inputGroupSize` and assigns its value to
    `buttonSize` if it is defined. This process continues for `formControlSize` and `controlSize`,
    assigning their values to `buttonSize` if they are defined. The first defined value encountered
    in the chain is assigned to `buttonSize`. */
    const buttonSize = size || inputGroupSize || formControlSize || controlSize

    /* The line `const buttonColor = splitedColor[0] || themeColor` is assigning a value to the
    `buttonColor` variable. */
    const buttonColor = splitedColor[0] || themeColor

    /* The line `const buttonColorLevel = splitedColor[1] || primaryColorLevel` is assigning a value to
    the `buttonColorLevel` variable. */
    const buttonColorLevel = splitedColor[1] || primaryColorLevel

    /* The line `const [increaseLevel, decreaseLevel] = useColorLevel(buttonColorLevel as ColorLevel)`
    is using the `useColorLevel` hook to retrieve the increase and decrease levels of a color. The
    `useColorLevel` hook takes the `buttonColorLevel` as an argument and returns an array with two
    values: `increaseLevel` and `decreaseLevel`. These values represent the color levels that can be
    used to adjust the brightness or saturation of a color. By using these color levels, the button
    component can dynamically adjust the background color, hover color, and active color of the
    button based on the specified color and color level. */
    const [increaseLevel, decreaseLevel] = useColorLevel(
        buttonColorLevel as ColorLevel
    )

    /**
     * The function `getButtonSize` returns a CSS class based on the `buttonSize` parameter.
     * @returns The function `getButtonSize` returns the value of the `sizeClass` variable.
     */
    const getButtonSize = () => {
        let sizeClass = ''
        switch (buttonSize) {
            case SIZES.LG:
                sizeClass = classNames(
                    `h-${CONTROL_SIZES.lg}`,
                    icon && !children
                        ? `w-${CONTROL_SIZES.lg} ${sizeIconClass} text-2xl`
                        : 'px-8 py-2 text-base'
                )
                break
            case SIZES.SM:
                sizeClass = classNames(
                    `h-${CONTROL_SIZES.sm}`,
                    icon && !children
                        ? `w-${CONTROL_SIZES.sm} ${sizeIconClass} text-lg`
                        : 'px-3 py-2 text-sm'
                )
                break
            case SIZES.XS:
                sizeClass = classNames(
                    `h-${CONTROL_SIZES.xs}`,
                    icon && !children
                        ? `w-${CONTROL_SIZES.xs} ${sizeIconClass} text-base`
                        : 'px-3 py-1 text-xs'
                )
                break
            default:
                sizeClass = classNames(
                    `h-${CONTROL_SIZES.md}`,
                    icon && !children
                        ? `w-${CONTROL_SIZES.md} ${sizeIconClass} text-xl`
                        : 'px-8 py-2'
                )
                break
        }
        return sizeClass
    }

    const disabledClass = 'opacity-50 cursor-not-allowed'

    /**
     * The function `solidColor` returns the color values for a button based on its active state and
     * color level.
     * @returns The function `solidColor` is returning the result of calling the `getBtnColor` function
     * with the `btn` object as an argument.
     */
    const solidColor = () => {
        const btn = {
            bgColor: active
                ? `bg-${buttonColor}-${increaseLevel}`
                : `bg-${buttonColor}-${buttonColorLevel}`,
            textColor: 'text-white',
            hoverColor: active
                ? ''
                : `hover:bg-${buttonColor}-${decreaseLevel}`,
            activeColor: `active:bg-${buttonColor}-${increaseLevel}`,
        }
        return getBtnColor(btn)
    }

    /**
     * The function `twoToneColor` returns a button color object based on the active state and button
     * color level.
     * @returns The function `twoToneColor` is returning the result of calling the `getBtnColor`
     * function with the `btn` object as an argument.
     */
    const twoToneColor = () => {
        const btn = {
            bgColor: active
                ? `bg-${buttonColor}-200 dark:bg-${buttonColor}-50`
                : `bg-${buttonColor}-50 dark:bg-${buttonColor}-500 dark:bg-opacity-20`,
            textColor: `text-${buttonColor}-${buttonColorLevel} dark:text-${buttonColor}-50`,
            hoverColor: active
                ? ''
                : `hover:bg-${buttonColor}-100 dark:hover:bg-${buttonColor}-500 dark:hover:bg-opacity-30`,
            activeColor: `active:bg-${buttonColor}-200 dark:active:bg-${buttonColor}-500 dark:active:bg-opacity-40`,
        }
        return getBtnColor(btn)
    }

    /**
     * The function returns the color styles for a button based on its active state.
     * @returns The function `defaultColor` returns the result of calling the `getBtnColor` function
     * with the `btn` object as an argument.
     */
    const defaultColor = () => {
        const btn = {
            bgColor: active
                ? `bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:border-gray-500`
                : `bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700`,
            textColor: `text-gray-600 dark:text-gray-100`,
            hoverColor: active ? '' : `hover:bg-gray-50 dark:hover:bg-gray-600`,
            activeColor: `active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500`,
        }
        return getBtnColor(btn)
    }

    /**
     * The function `plainColor` returns the color styles for a button based on its active state.
     * @returns The function `plainColor` is returning the result of calling the `getBtnColor` function
     * with the `btn` object as an argument.
     */
    const plainColor = () => {
        const btn = {
            bgColor: active
                ? `bg-gray-100 dark:bg-gray-500`
                : 'bg-transparent border border-transparent',
            textColor: `text-gray-600 dark:text-gray-100`,
            hoverColor: active ? '' : `hover:bg-gray-50 dark:hover:bg-gray-600`,
            activeColor: `active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500`,
        }
        return getBtnColor(btn)
    }

    /**
     * The function `getBtnColor` takes in an object with properties for button colors and returns a
     * string concatenation of those colors.
     * @param {ButtonColor}  - - `bgColor`: The background color of the button.
     * @returns a string that concatenates the values of `bgColor`, `hoverColor`, `activeColor`, and
     * `textColor`. The values of `disabled`, `loading`, and `disabledClass` are also being used in the
     * concatenation, but their values are not provided in the code snippet.
     */
    const getBtnColor = ({
        bgColor,
        hoverColor,
        activeColor,
        textColor,
    }: ButtonColor) => {
        return `${bgColor} ${
            disabled || loading ? disabledClass : hoverColor + ' ' + activeColor
        } ${textColor}`
    }

    /**
     * The function `btnColor` returns a color based on the value of the `variant` variable.
     * @returns The function `btnColor` returns the result of calling one of the following functions:
     * `solidColor`, `twoToneColor`, `plainColor`, or `defaultColor`. The specific function that is
     * called depends on the value of the `variant` variable. If the `variant` variable is not one of
     * the specified cases, the function `defaultColor` is called.
     */
    const btnColor = () => {
        switch (variant) {
            case 'solid':
                return solidColor()
            case 'twoTone':
                return twoToneColor()
            case 'plain':
                return plainColor()
            case 'default':
                return defaultColor()
            default:
                return defaultColor()
        }
    }

    /* The above code is using the `classNames` function to generate a string of CSS class names based
    on the provided arguments. */
    const classes = classNames(
        defaultClass,
        btnColor(),
        `radius-${shape}`,
        getButtonSize(),
        className,
        block ? 'w-full' : ''
    )

    /**
     * The handleClick function checks if the button is disabled or loading, and if not, it calls the
     * onClick function passed as a prop.
     * @param e - MouseEvent<HTMLButtonElement> - This is the event object that is passed to the
     * handleClick function when the button is clicked. It is of type MouseEvent and specifically for
     * HTMLButtonElement, which means it is an event that is triggered by a button element.
     * @returns If the `disabled` or `loading` condition is true, the function will prevent the default
     * behavior of the event and return nothing. Otherwise, it will call the `onClick` function (if it
     * exists) with the event object as an argument. The return value of the `onClick` function is not
     * specified in this code snippet.
     */
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const { onClick } = props
        if (disabled || loading) {
            e.preventDefault()
            return
        }
        onClick?.(e)
    }

    /**
     * The function `renderChildren` returns different JSX elements based on the values of `loading`,
     * `children`, and `icon`.
     * @returns The function `renderChildren` returns JSX elements based on different conditions. The
     * possible return values are:
     */
    const renderChildren = () => {
        if (loading && children) {
            return (
                <span className="flex items-center justify-center">
                    <Spinner enableTheme={false} className="mr-1" />
                    {children}
                </span>
            )
        }

        if (icon && !children && loading) {
            return <Spinner enableTheme={false} />
        }

        if (icon && !children && !loading) {
            return <>{icon}</>
        }

        if (icon && children && !loading) {
            return (
                <span className="flex items-center justify-center">
                    <span className="text-lg">{icon}</span>
                    <span className="ltr:ml-1 rtl:mr-1">{children}</span>
                </span>
            )
        }

        return <>{children}</>
    }

    /* The above code is a TypeScript React component that renders a button element. It uses the ref
    prop to reference the button element, the className prop to apply CSS classes to the button, and
    the spread operator {...rest} to pass any additional props to the button element. It also
    defines an onClick event handler called handleClick. The button's content is rendered by calling
    the renderChildren function. */
    return (
        <button ref={ref} className={classes} {...rest} onClick={handleClick}>
            {renderChildren()}
        </button>
    )
})

/* The above code is defining a component called "Button" in TypeScript with React. It also sets the
display name of the component to "Button". */
Button.displayName = 'Button'

export default Button

/* These lines are importing various modules and types that are used in the code: */
import classNames from 'classnames'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { Link } from 'react-router-dom'
import type { CommonProps } from '@/@types/common'
import type { ComponentPropsWithoutRef } from 'react'

/* The `interface ActionLink` is defining the shape of the props that can be passed to the `ActionLink`
component. */
interface ActionLink extends CommonProps, ComponentPropsWithoutRef<'a'> {
    themeColor?: boolean
    to?: string
    href?: string
    reloadDocument?: boolean
}

/**
 * The `ActionLink` component is a React component that renders either a `Link` or an `a` element based
 * on the presence of a `to` prop, and applies CSS classes based on the `className` prop and the theme.
 * @param {ActionLink} props - The `props` parameter is an object that contains the properties passed
 * to the `ActionLink` component. These properties can include:
 * @returns The `ActionLink` component is returning either a `Link` component or an `a` element based
 * on the condition `to ?`. If the `to` prop is truthy, it returns a `Link` component with the `to`
 * prop, `reloadDocument` prop, `classNameProps` object, and any additional props passed to the
 * `ActionLink` component. If the `
 */
const ActionLink = (props: ActionLink) => {
    /* This line is using object destructuring to extract specific properties from the `props` object
    that is passed to the `ActionLink` component. */
    const {
        children,
        className,
        themeColor = true,
        to,
        reloadDocument,
        href = '',
        ...rest
    } = props

    /* `const { textTheme } = useThemeClass()` is using object destructuring to extract the `textTheme`
    property from the object returned by the `useThemeClass()` hook. The `useThemeClass()` hook is
    likely a custom hook that provides access to a theme class or theme-related functionality. By
    extracting the `textTheme` property, it can be used in the `classNames()` function to
    conditionally apply a CSS class based on the theme. */
    const { textTheme } = useThemeClass()

    /* The `const classNameProps` is creating an object that contains a `className` property. The value
    of the `className` property is determined by the `classNames()` function. */
    const classNameProps = {
        className: classNames(
            themeColor && textTheme,
            'hover:underline',
            className
        ),
    }

    return to ? (
        <Link
            to={to}
            reloadDocument={reloadDocument}
            {...classNameProps}
            {...rest}
        >
            {children}
        </Link>
    ) : (
        <a href={href} {...classNameProps} {...rest}>
            {children}
        </a>
    )
}

export default ActionLink

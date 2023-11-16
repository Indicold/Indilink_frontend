/* These lines of code are importing various dependencies and types for the Menu component. */
import { forwardRef } from 'react'
import classNames from 'classnames'
import { MenuContextProvider } from './context/menuContext'
import { useConfig } from '../ConfigProvider'
import type { CommonProps, TypeAttributes } from '../@types/common'

/* The `export interface MenuProps extends CommonProps` statement is defining the props that can be
passed to the `Menu` component. */
export interface MenuProps extends CommonProps {
    defaultActiveKeys?: Array<string>
    defaultExpandedKeys?: Array<string>
    menuItemHeight?: number
    onSelect?: (eventKey: string, e: MouseEvent) => void
    sideCollapsed?: boolean
    variant?: TypeAttributes.MenuVariant
}

const Menu = forwardRef<HTMLElement, MenuProps>((props, ref) => {
    /* The code is using object destructuring to extract specific properties from the `props` object
    passed to the `Menu` component. */
    const {
        children,
        className,
        defaultActiveKeys = [],
        defaultExpandedKeys = [],
        menuItemHeight = 40,
        onSelect,
        sideCollapsed = false,
        variant = 'light',
        ...rest
    } = props

    const menuDefaultClass = 'menu'

    /* The line `const { themeColor, primaryColorLevel } = useConfig()` is using the `useConfig` hook
    to retrieve the `themeColor` and `primaryColorLevel` values from the configuration context.
    These values are then assigned to the variables `themeColor` and `primaryColorLevel`
    respectively. */
    const { themeColor, primaryColorLevel } = useConfig()

    /**
     * The function `menuColor` returns a string based on the value of the `variant` variable.
     * @returns The function `menuColor` returns a string value. If the `variant` is equal to 'themed',
     * it returns a string that concatenates the values of `themeColor`, `primaryColorLevel`,
     * `menuDefaultClass`, and `variant` with specific formatting. Otherwise, it returns a string that
     * concatenates the values of `menuDefaultClass` and `variant`.
     */
    const menuColor = () => {
        if (variant === 'themed') {
            return `bg-${themeColor}-${primaryColorLevel} ${menuDefaultClass}-${variant}`
        }
        return `${menuDefaultClass}-${variant}`
    }

    /* The line `const menuClass = classNames(menuDefaultClass, menuColor(), className)` is using the
    `classNames` function from the `classnames` library to generate a string of CSS class names for
    the `Menu` component. */
    const menuClass = classNames(menuDefaultClass, menuColor(), className)

    /* The code is returning a JSX element that represents the `Menu` component. */
    return (
        <nav ref={ref} className={menuClass} {...rest}>
            <MenuContextProvider
                value={{
                    onSelect,
                    menuItemHeight,
                    variant,
                    sideCollapsed,
                    defaultExpandedKeys,
                    defaultActiveKeys,
                }}
            >
                {children}
            </MenuContextProvider>
        </nav>
    )
})

Menu.displayName = 'Menu'

export default Menu

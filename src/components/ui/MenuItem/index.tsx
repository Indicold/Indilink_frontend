/* These lines of code are importing various dependencies and types from different modules. */
import { forwardRef } from 'react'
import classNames from 'classnames'
import type { CommonProps, TypeAttributes } from '../@types/common'
import type { ElementType } from 'react'

/* The `export interface MenuItemProps` is defining the props that can be passed to the `MenuItem`
component. */
export interface MenuItemProps extends CommonProps {
    asElement?: ElementType
    id?: string
    disabled?: boolean
    eventKey?: string
    isActive?: boolean
    menuItemHeight?: string | number
    onSelect?: (eventKey: string, e: MouseEvent) => void
    variant?: TypeAttributes.MenuVariant
}

const MenuItem = forwardRef<HTMLElement, MenuItemProps>((props, ref) => {
    /* This code is using object destructuring to extract specific properties from the `props` object
    passed to the `MenuItem` component. */
    const {
        asElement: Component = 'div',
        children,
        className,
        disabled,
        eventKey,
        isActive,
        menuItemHeight = 35,
        onSelect,
        style,
        variant = 'light',
        ...rest
    } = props

    const menuItemActiveClass = `menu-item-active`
    const menuItemHoverClass = `menu-item-hoverable`
    const disabledClass = 'menu-item-disabled'

    /* The `classNames` function is used to conditionally concatenate multiple class names together. In
    this code, it is used to generate the class name for the `MenuItem` component based on various
    conditions. */
    const menuItemClass = classNames(
        'menu-item',
        `menu-item-${variant}`,
        isActive && menuItemActiveClass,
        disabled && disabledClass,
        !disabled && menuItemHoverClass,
        className
    )

    /**
     * The function `hanldeOnClick` is a TypeScript React function that handles a click event and calls
     * the `onSelect` function with the `eventKey` and the event object if it exists.
     * @param {MouseEvent} e - MouseEvent - This is the event object that is passed when the onClick
     * event is triggered. It contains information about the mouse event, such as the target element,
     * coordinates, and button pressed.
     */
    const hanldeOnClick = (e: MouseEvent) => {
        if (onSelect) {
            onSelect(eventKey as string, e)
        }
    }

    /* The `return` statement in the code is returning JSX (JavaScript XML) code. JSX is a syntax
    extension for JavaScript that allows you to write HTML-like code within JavaScript. */
    return (
        <Component
            ref={ref}
            className={menuItemClass}
            style={{ height: `${menuItemHeight}px`, ...style }}
            onClick={hanldeOnClick}
            {...rest}
        >
            {children}
        </Component>
    )
})

MenuItem.displayName = 'BaseMenuItem'

export default MenuItem

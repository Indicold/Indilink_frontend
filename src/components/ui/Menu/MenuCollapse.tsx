/* These are import statements in TypeScript that are used to import various dependencies and types
from different modules. */
import { useState, useEffect, useContext } from 'react'
import { useConfig } from '../ConfigProvider'
import { CollapseContextProvider } from './context/collapseContext'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import MenuContext from './context/menuContext'
import { HiChevronDown } from 'react-icons/hi'
import type { CommonProps } from '../@types/common'
import type { ReactNode, MouseEvent } from 'react'

/* The `export interface MenuCollapseProps` is defining the props that can be passed to the
`MenuCollapse` component. */
export interface MenuCollapseProps extends CommonProps {
    eventKey?: string
    expanded?: boolean
    label?: string | ReactNode
    onToggle?: (expanded: boolean, e: MouseEvent<HTMLDivElement>) => void
}

const MenuCollapse = (props: MenuCollapseProps) => {
    /* The code is using object destructuring to extract specific properties from the `props` object
    passed to the `MenuCollapse` component. */
    const {
        children,
        className,
        eventKey,
        expanded = false,
        label = null,
        onToggle,
    } = props

    const [isExpanded, setIsExpanded] = useState(expanded)

    /* The code is using the `useContext` hook from React to access the values from the `MenuContext`
    context. */
    const { menuItemHeight, variant, sideCollapsed, defaultExpandedKeys } =
        useContext(MenuContext)

    /* The line `const { direction } = useConfig()` is using the `useConfig` hook to access the
    `direction` property from the configuration context. It is destructuring the `direction`
    property from the returned object of the `useConfig` hook. This allows the component to access
    the `direction` value and use it in its logic or rendering. */
    const { direction } = useConfig()

    /* The `useEffect` hook in this code is used to handle the side effects or actions that need to be
    performed when certain dependencies change. */
    useEffect(() => {
        if ((defaultExpandedKeys as string[]).includes(eventKey as string)) {
            setIsExpanded(true)
        }
        if (expanded !== isExpanded) {
            setIsExpanded(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expanded, onToggle, eventKey, defaultExpandedKeys])

    /**
     * The function `toggleCollapse` toggles the expanded state of an element and calls a callback
     * function if provided.
     * @param e - MouseEvent<HTMLDivElement> - This is the event object that is passed when the div
     * element is clicked. It contains information about the event, such as the target element and the
     * coordinates of the click.
     */
    const toggleCollapse = (e: MouseEvent<HTMLDivElement>) => {
        if (typeof onToggle === 'function') {
            onToggle(!isExpanded, e)
        }
        setIsExpanded(!isExpanded)
    }

    /**
     * The function `getChildrenHeight` calculates the height of the children elements based on whether
     * they are expanded and the height of each menu item.
     * @returns the height of the children.
     */
    const getChildrenHeight = () => {
        let height: string | number = 0
        if (isExpanded && children && (children as ReactNode[]).length) {
            height = (children as ReactNode[]).length * (menuItemHeight || 0)
        }
        if (isExpanded && children && !(children as ReactNode[]).length) {
            height = menuItemHeight || 0
        }
        return height
    }

    /* The `const menuCollapseItemClass = classNames(...)` line is using the `classNames` function from
    the `classnames` library to generate a string of CSS class names based on the provided
    arguments. */
    const menuCollapseItemClass = classNames(
        'menu-collapse-item',
        `menu-collapse-item-${variant}`,
        className
    )

    /* The `return` statement in the code is rendering the JSX elements that make up the `MenuCollapse`
    component. */
    return (
        <div className="menu-collapse">
            <div
                className={menuCollapseItemClass}
                role="presentation"
                onClick={toggleCollapse}
            >
                <span className="flex items-center">{label}</span>
                <motion.span
                    className="text-lg mt-1"
                    initial={{ transform: 'rotate(0deg)' }}
                    animate={{
                        transform: isExpanded
                            ? 'rotate(-180deg)'
                            : 'rotate(0deg)',
                    }}
                    transition={{ duration: 0.15 }}
                >
                    {sideCollapsed ? null : <HiChevronDown />}
                </motion.span>
            </div>
            <CollapseContextProvider value={isExpanded}>
                <motion.ul
                    className={direction === 'rtl' ? 'mr-5' : 'ml-5'}
                    initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    animate={{
                        opacity: isExpanded ? 1 : 0,
                        height: isExpanded ? getChildrenHeight() : 0,
                    }}
                    transition={{ duration: 0.15 }}
                >
                    {children}
                </motion.ul>
            </CollapseContextProvider>
        </div>
    )
}

MenuCollapse.displayName = 'MenuCollapse'

export default MenuCollapse

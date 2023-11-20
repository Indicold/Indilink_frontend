/* These lines of code are importing various dependencies and types that are needed for the `MenuGroup`
component. */
import { useContext } from 'react'
import classNames from 'classnames'
import { GroupContextProvider } from './context/groupContext'
import MenuContext from './context/menuContext'
import useUniqueId from '../hooks/useUniqueId'
import type { CommonProps } from '../@types/common'
import type { ReactNode } from 'react'

/* The `export interface MenuGroupProps extends CommonProps` line is defining an interface called
`MenuGroupProps` that extends the `CommonProps` interface. This means that the `MenuGroupProps`
interface will inherit all the properties and types defined in the `CommonProps` interface. */
export interface MenuGroupProps extends CommonProps {
    label: string | ReactNode
}

const MenuGroup = (props: MenuGroupProps) => {
    /* The line `const { label, children, className } = props` is using object destructuring to extract
    the `label`, `children`, and `className` properties from the `props` object. This allows us to
    use these properties directly within the `MenuGroup` component without having to reference them
    through the `props` object. */
    const { label, children, className } = props

    /* `const { variant, sideCollapsed } = useContext(MenuContext)` is using the `useContext` hook to
    access the values of `variant` and `sideCollapsed` from the `MenuContext`. */
    const { variant, sideCollapsed } = useContext(MenuContext)

    const menuGroupDefaultClass = 'menu-group'

    /* The line `const menuGroupClass = classNames(menuGroupDefaultClass, className)` is using the
    `classNames` function from the `classnames` library to generate a string of CSS class names for
    the `MenuGroup` component. */
    const menuGroupClass = classNames(menuGroupDefaultClass, className)

    /* The line `const entityHeaderId = useUniqueId('entity-header-')` is using the `useUniqueId`
    custom hook to generate a unique ID for the `entity-header` element. The `useUniqueId` hook
    takes a prefix string as an argument and returns a unique ID by appending a unique number to the
    prefix. In this case, the prefix is `'entity-header-'`, so the generated ID will be something
    like `'entity-header-1'`, `'entity-header-2'`, and so on. This unique ID is then assigned to the
    `id` attribute of the `div` element with the class name `'menu-title'`. */
    const entityHeaderId = useUniqueId('entity-header-')

    /* The `return` statement is returning JSX (JavaScript XML) code that will be rendered as HTML by
    React. */
    return (
        <div className={menuGroupClass}>
            {label && !sideCollapsed && (
                <div
                    className={classNames(
                        'menu-title',
                        `menu-title-${variant}`
                    )}
                    id={entityHeaderId}
                >
                    {label}
                </div>
            )}
            <GroupContextProvider value={null}>
                <ul>{children}</ul>
            </GroupContextProvider>
        </div>
    )
}

MenuGroup.displayName = 'MenuGroup'

export default MenuGroup

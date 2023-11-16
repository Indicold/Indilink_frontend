/* These lines of code are importing various dependencies and types that are needed for the
`DropdownMenu` component. */
import { forwardRef, useContext } from 'react'
import Menu from './DropdownInnerMenu'
import MenuContext from './context/menuContext'
import DropdownItem from './DropdownItem'
import classNames from 'classnames'
import type { DropdownInnerMenuProps } from './DropdownInnerMenu'
import type { ReactNode } from 'react'

/* The `export interface DropdownMenuProps extends DropdownInnerMenuProps` statement is defining a
TypeScript interface called `DropdownMenuProps`. This interface extends the `DropdownInnerMenuProps`
interface, which means that `DropdownMenuProps` inherits all the properties and types defined in
`DropdownInnerMenuProps`. */
export interface DropdownMenuProps extends DropdownInnerMenuProps {
    eventKey?: string
    title?: string | ReactNode
    id?: string
}

/* The `const DropdownMenu = forwardRef<HTMLElement, DropdownMenuProps>(...)` statement is creating a
functional component called `DropdownMenu` using the `forwardRef` function from React. */
const DropdownMenu = forwardRef<HTMLElement, DropdownMenuProps>(
    (props, ref) => {
        /* The line `const { eventKey, title, className, placement, ...rest } = props` is using object
        destructuring to extract specific properties from the `props` object. It is assigning the
        values of the `eventKey`, `title`, `className`, and `placement` properties to their
        respective variables. The `...rest` syntax is used to capture any remaining properties in
        the `props` object and assign them to the `rest` variable as an object. This allows for
        flexibility in passing additional props to the component. */
        const { eventKey, title, className, placement, ...rest } = props

        /* The line `const parentMenu = useContext(MenuContext)` is using the `useContext` hook from
        React to access the value of the `MenuContext` context. */
        const parentMenu = useContext(MenuContext)

        const dropdownMenuDefaultClass = `dropdown-menu`
        const dropdownMenuPositionClass = placement

        /* The `classNames` function is used to concatenate multiple class names together. In this
        case, it is used to create the `dropdownMenuClass` variable, which will be assigned a string
        of class names. */
        const dropdownMenuClass = classNames(
            dropdownMenuDefaultClass,
            dropdownMenuPositionClass,
            className
        )

        /* The `const dropdownSubmenuClass = classNames(dropdownMenuDefaultClass, 'dropdown-submenu')`
        line is using the `classNames` function to concatenate multiple class names together. It
        creates the `dropdownSubmenuClass` variable, which will be assigned a string of class names.
        In this case, it combines the `dropdown-menu` class from the `dropdownMenuDefaultClass`
        variable with the `dropdown-submenu` class. This allows for styling and customization of the
        dropdown submenu component. */
        const dropdownSubmenuClass = classNames(
            dropdownMenuDefaultClass,
            'dropdown-submenu'
        )

        /* The `const dropdownSubmenu` variable is creating a JSX element. It is rendering the `Menu`
        component with the specified props. The `ref` prop is used to assign a reference to the
        `Menu` component, the `className` prop is set to the `dropdownSubmenuClass` variable, and
        the `placement` prop is set to the `placement` variable from the component's props. The
        `...rest` syntax is used to pass any remaining props to the `Menu` component. */
        const dropdownSubmenu = (
            <Menu
                ref={ref}
                className={dropdownSubmenuClass}
                placement={placement}
                {...rest}
            />
        )

        /* The `if (parentMenu)` condition checks if the `parentMenu` variable has a truthy value. If
        it does, it means that the `DropdownMenu` component is being rendered as a submenu within
        another `DropdownMenu` component. */
        if (parentMenu) {
            const itemClassName = classNames(className)

            return (
                <DropdownItem
                    className={itemClassName}
                    submenu={dropdownSubmenu}
                    eventKey={eventKey}
                >
                    {title}
                </DropdownItem>
            )
        }

        return (
            <Menu
                ref={ref}
                className={dropdownMenuClass}
                placement={placement}
                {...rest}
            />
        )
    }
)

DropdownMenu.displayName = 'DropdownMenu'

export default DropdownMenu

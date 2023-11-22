/* The code is importing various components and types from different files. */
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import _Dropdown, { DropdownProps } from './Dropdown'
import DropdownItem from './DropdownItem'
import DropdownMenu from './DropdownMenu'

/* These lines of code are exporting the types `DropdownProps`, `DropdownItemProps`, and
`DropdownMenuProps` from their respective files. This allows other files to import and use these
types when working with the `Dropdown`, `DropdownItem`, and `DropdownMenu` components. */
export type { DropdownProps } from './Dropdown'
export type { DropdownItemProps } from './DropdownItem'
export type { DropdownMenuProps } from './DropdownMenu'

type CompoundedComponent = ForwardRefExoticComponent<
    DropdownProps & RefAttributes<HTMLDivElement>
> & {
    Item: typeof DropdownItem
    Menu: typeof DropdownMenu
}

const Dropdown = _Dropdown as CompoundedComponent

Dropdown.Item = DropdownItem
Dropdown.Menu = DropdownMenu

export { Dropdown }

export default Dropdown

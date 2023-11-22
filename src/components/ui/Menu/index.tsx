/* The code is importing various components and types from different files. */
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import _Menu, { MenuProps } from './Menu'
import MenuItem from './MenuItem'
import MenuCollapse from './MenuCollapse'
import MenuGroup from './MenuGroup'

/* These lines of code are exporting the types `MenuProps`, `MenuCollapseProps`, `MenuGroupProps`, and
`MenuItemProps` from their respective files. This allows other files to import and use these types
when working with the components `Menu`, `MenuCollapse`, `MenuGroup`, and `MenuItem`. */
export type { MenuProps } from './Menu'
export type { MenuCollapseProps } from './MenuCollapse'
export type { MenuGroupProps } from './MenuGroup'
export type { MenuItemProps } from './MenuItem'

type CompoundedComponent = ForwardRefExoticComponent<
    MenuProps & RefAttributes<HTMLElement>
> & {
    MenuItem: typeof MenuItem
    MenuCollapse: typeof MenuCollapse
    MenuGroup: typeof MenuGroup
}

const Menu = _Menu as CompoundedComponent

Menu.MenuItem = MenuItem
Menu.MenuCollapse = MenuCollapse
Menu.MenuGroup = MenuGroup

/* `export { Menu }` is exporting the `Menu` component as the default export of the file. This allows
other files to import and use the `Menu` component by simply importing it without specifying the
curly braces. For example, in another file, you can import the `Menu` component like this: `import
Menu from './Menu'`. */
export { Menu }

/* `export default Menu` is exporting the `Menu` component as the default export of the file. This
means that when another file imports this file, they can import the `Menu` component by simply using
`import Menu from './Menu'` without specifying the curly braces. The `Menu` component can then be
used in the importing file as `Menu`. */
export default Menu

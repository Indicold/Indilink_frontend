/* The `import` statement is used to import specific components from the `react-icons/hi` library. In
this case, it is importing the following components: `HiOutlineColorSwatch`,
`HiOutlineDesktopComputer`, `HiOutlineTemplate`, `HiOutlineViewGridAdd`, and `HiOutlineHome`. These
components are icons from the `react-icons` library that are used as navigation icons in a
TypeScript React application. */
import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

/* The `const navigationIcon: NavigationIcons = { ... }` statement is creating a constant variable
named `navigationIcon` of type `NavigationIcons`. */
const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
}

/* The `export default navigationIcon` statement is exporting the `navigationIcon` variable as the
default export of the module. This means that when another module imports this module, they can
access the `navigationIcon` variable directly without having to specify its name. */
export default navigationIcon

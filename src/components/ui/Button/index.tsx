import Button from './Button'

/* `export type { ButtonProps } from './Button'` is exporting the `ButtonProps` type from the `Button`
module. This allows other modules to import and use the `ButtonProps` type without having to import
the entire `Button` module. */
export type { ButtonProps } from './Button'

/* `export { Button }` is exporting the `Button` component from the `Button` module. This allows other
modules to import and use the `Button` component. */
export { Button }

/* `export default Button` is exporting the `Button` component as the default export from the module.
This means that when other modules import this module, they can choose to import the default export
without specifying its name. For example, in another module, you can import the default export like
this: */
export default Button

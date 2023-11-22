import CloseButton from './CloseButton'

/* `export type { CloseButtonProps } from './CloseButton'` is exporting the type `CloseButtonProps`
from the file `CloseButton`. This allows other files to import and use the `CloseButtonProps` type
without having to import the entire `CloseButton` component. */
export type { CloseButtonProps } from './CloseButton'

/* `export default CloseButton` is exporting the `CloseButton` component as the default export of the
current module. This means that when other files import this module, they can import the
`CloseButton` component directly without having to specify its name. For example, in another file,
you can write `import CloseButton from './CloseButton'` to import the `CloseButton` component from
this module. */
export default CloseButton

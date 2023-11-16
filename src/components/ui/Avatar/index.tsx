/* The code is importing the necessary types and components from the 'react' library and local files. */
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import _Avatar, { AvatarProps } from './Avatar'
import AvatarGroup from './AvatarGroup'

/* These lines of code are exporting the types `AvatarProps` and `AvatarGroupProps` from the respective
files `./Avatar` and `./AvatarGroup`. This allows other files to import and use these types when
needed. */
export type { AvatarProps } from './Avatar'
export type { AvatarGroupProps } from './AvatarGroup'

type CompoundedComponent = ForwardRefExoticComponent<
    AvatarProps & RefAttributes<HTMLSpanElement>
> & {
    Group: typeof AvatarGroup
}

/* `const Avatar = _Avatar as CompoundedComponent` is creating a new variable `Avatar` and assigning it
the value of `_Avatar` casted as `CompoundedComponent`. This allows `Avatar` to have the same
properties and methods as `CompoundedComponent`, in addition to any properties and methods that
`_Avatar` already has. */
const Avatar = _Avatar as CompoundedComponent

/* `Avatar.Group = AvatarGroup` is assigning the `AvatarGroup` component to the `Group` property of the
`Avatar` component. This allows you to access the `AvatarGroup` component as a property of the
`Avatar` component. For example, you can use `Avatar.Group` to render an `AvatarGroup` component
within the `Avatar` component. */
Avatar.Group = AvatarGroup

/* `export { Avatar }` is exporting the `Avatar` component as a named export. This allows other files
to import and use the `Avatar` component by its name. For example, in another file, you can import
the `Avatar` component like this: `import { Avatar } from './Avatar'`. */
export { Avatar }

/* `export default Avatar` is exporting the `Avatar` component as the default export of the file. This
means that when another file imports this file, they can choose to import the default export without
using curly braces. For example, in another file, you can import the `Avatar` component like this:
`import Avatar from './Avatar'`. */
export default Avatar

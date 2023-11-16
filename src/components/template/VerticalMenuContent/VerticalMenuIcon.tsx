/* The first import statement is importing the `navigationIcon` object from the
`@/configs/navigation-icon.config` file. This object likely contains mappings between icon names and
their corresponding icons. */
import navigationIcon from '@/configs/navigation-icon.config'
import type { ElementType, ComponentPropsWithRef } from 'react'

/**
 * The VerticalMenuIconProps type is used in TypeScript React and consists of two properties: icon (a
 * string) and gutter (a string).
 * @property {string} icon - A string representing the icon to be displayed in the vertical menu. This
 * can be the name of an icon from a library or a URL to an image file.
 * @property {string} gutter - The `gutter` property in the `VerticalMenuIconProps` type represents the
 * spacing between the icon and the surrounding elements in the vertical menu. It is of type `string`,
 * which means it can accept any valid CSS value for spacing, such as pixels (`px`), percentages (`%`
 */
type VerticalMenuIconProps = {
    icon: string
    gutter: string
}

export const Icon = <T extends ElementType>({
    component,
    ...props
}: {
    header: T
} & ComponentPropsWithRef<T>) => {
    const Component = component
    return <Component {...props} />
}

/**
 * The `VerticalMenuIcon` component renders an icon based on the provided `icon` prop, with an optional
 * gutter spacing.
 * @param {VerticalMenuIconProps}  - - `icon`: The icon to be displayed in the vertical menu. It can be
 * a string representing the name of the icon or a falsy value (null, undefined, false).
 * @returns a JSX element.
 */
const VerticalMenuIcon = ({ icon, gutter }: VerticalMenuIconProps) => {
    if (typeof icon !== 'string' && !icon) {
        return <></>
    }

    return (
        <span className={`text-2xl ${gutter ? 'ltr:mr-2 rtl:ml-2' : ''}`}>
            {navigationIcon[icon]}
        </span>
    )
}

/* The line `VerticalMenuIcon.defaultProps = { gutter: true }` is setting a default value for the
`gutter` prop in the `VerticalMenuIcon` component. */
VerticalMenuIcon.defaultProps = {
    gutter: true,
}

export default VerticalMenuIcon

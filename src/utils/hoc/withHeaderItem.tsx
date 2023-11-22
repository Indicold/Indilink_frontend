/* The code is importing two modules: `classNames` from the 'classnames' library and `ComponentType`
and `FC` from the 'react' library. */
import classNames from 'classnames'
import type { ComponentType, FC } from 'react'

/**
 * The `WithHeaderItemProps` type is used in TypeScript React components and includes optional
 * `className` and `hoverable` properties.
 * @property {string} className - A string that represents the CSS class name to be applied to the
 * component.
 * @property {boolean} hoverable - A boolean value indicating whether the item should have a hover
 * effect or not.
 */
export type WithHeaderItemProps = {
    className?: string
    hoverable?: boolean
}

/* The code defines a higher-order component (HOC) called `withHeaderItem`. */
const withHeaderItem = <T extends WithHeaderItemProps>(
    Component: ComponentType<Omit<T, keyof WithHeaderItemProps>>
): FC<T> => {
    const WithHeaderItem: FC<T> = (props: T) => {
        /* `const { className, hoverable = true } = props` is using object destructuring to extract the
        `className` and `hoverable` properties from the `props` object. */
        const { className, hoverable = true } = props
        return (
            <Component
                {...(props as Omit<T, keyof WithHeaderItemProps>)}
                className={classNames(
                    'header-action-item',
                    hoverable && 'header-action-item-hoverable',
                    className
                )}
            />
        )
    }
    WithHeaderItem.displayName = `withHeaderItem(${
        Component.displayName || Component.name || 'Component'
    })`
    return WithHeaderItem
}

export default withHeaderItem

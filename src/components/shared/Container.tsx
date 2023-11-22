/* The code is importing necessary dependencies and types for the `Container` component. */
import { forwardRef, ElementType } from 'react'
import classNames from 'classnames'
import { CommonProps } from '@/@types/common'

/* The `interface ContainerProps` is defining the props for the `Container` component. It extends the
`CommonProps` interface, which likely contains common props used across multiple components. */
interface ContainerProps extends CommonProps {
    asElement?: ElementType
}

/* The code is defining a functional component called `Container` using the `forwardRef` function from
React. */
const Container = forwardRef((props: ContainerProps, ref) => {
    const { className, children, asElement: Component = 'div', ...rest } = props

    return (
        <Component
            ref={ref}
            className={classNames('container mx-auto', className)}
            {...rest}
        >
            {children}
        </Component>
    )
})

/* `Container.displayName = 'Container'` is setting the `displayName` property of the `Container`
component to the string value `'Container'`. */
Container.displayName = 'Container'

export default Container

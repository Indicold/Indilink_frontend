/* The `import` statements are used to import various dependencies and types from different modules. */
import { forwardRef } from 'react'
import { HiX } from 'react-icons/hi'
import classNames from 'classnames'
import type { CommonProps } from '../@types/common'
import type { MouseEvent } from 'react'

/* The `export interface CloseButtonProps extends CommonProps` statement is defining an interface
called `CloseButtonProps` that extends the `CommonProps` interface. This means that
`CloseButtonProps` will inherit all the properties and types defined in `CommonProps`. */
export interface CloseButtonProps extends CommonProps {
    absolute?: boolean
    defaultStyle?: boolean
    onClick?: (e: MouseEvent<HTMLSpanElement>) => void
}

/* The `const CloseButton = forwardRef<HTMLElement, CloseButtonProps>((props, ref) => { ... })`
statement is defining a functional component called `CloseButton` using the `forwardRef` function
from React. */
const CloseButton = forwardRef<HTMLElement, CloseButtonProps>((props, ref) => {
    /* The line `const { absolute, className, defaultStyle, ...rest } = props` is using object
    destructuring to extract the `absolute`, `className`, and `defaultStyle` properties from the
    `props` object. The `...rest` syntax is used to collect the remaining properties of the `props`
    object into a new object called `rest`. This allows you to access the individual properties
    directly as variables (`absolute`, `className`, `defaultStyle`) and also have access to the
    remaining properties through the `rest` object. */
    const { absolute, className, defaultStyle, ...rest } = props
    const closeButtonAbsoluteClass = 'absolute z-10'

    /* The `const closeButtonClass = classNames(...)` statement is using the `classNames` function from
    the `classnames` library to dynamically generate a string of CSS class names based on the
    provided arguments. */
    const closeButtonClass = classNames(
        'close-btn',
        defaultStyle && 'close-btn-default',
        absolute && closeButtonAbsoluteClass,
        className
    )

    return (
        <span className={closeButtonClass} role="button" {...rest} ref={ref}>
            <HiX />
        </span>
    )
})

CloseButton.displayName = 'CloseButton'

export default CloseButton

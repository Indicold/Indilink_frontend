/* The code is importing necessary dependencies and types for the Scrollbar component. */
import { forwardRef } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import type { ScrollbarProps as ReactCustomScrollbarProps } from 'react-custom-scrollbars-2'
import type { TypeAttributes } from '../@types/common'

/* The `export interface ScrollbarProps` is defining a new interface called `ScrollbarProps` that
extends the `ReactCustomScrollbarProps` interface. */
export interface ScrollbarProps extends ReactCustomScrollbarProps {
    direction?: TypeAttributes.Direction
}

export type ScrollbarRef = Scrollbars

/* The code is defining a functional component called `ScrollBar` using the `forwardRef` function from
React. */
const ScrollBar = forwardRef<ScrollbarRef, ScrollbarProps>((props, ref) => {
    const { direction = 'ltr', ...rest } = props

    return (
        <Scrollbars
            ref={ref}
            renderView={(props) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        ...(direction === 'rtl' && {
                            marginLeft: props.style.marginRight,
                            marginRight: 0,
                        }),
                    }}
                />
            )}
            {...rest}
        />
    )
})

ScrollBar.displayName = 'ScrollBar'

export default ScrollBar

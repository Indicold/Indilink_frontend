/* This code is importing various dependencies and types for the Tooltip component. */
import { useState, useCallback, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { Popper, Reference, Manager } from 'react-popper'
import { motion, AnimatePresence } from 'framer-motion'
import Arrow from './Arrow'
import { Portal } from 'react-portal'
import type { CommonProps } from '../@types/common'
import type { ArrowPlacement } from './Arrow'
import type { State as PopperJsState } from '@popperjs/core'
import type { ReactNode } from 'react'

/* The `export interface TooltipProps extends CommonProps` is defining the props that can be passed to
the `Tooltip` component. */
export interface TooltipProps extends CommonProps {
    isOpen?: boolean
    placement?: ArrowPlacement
    title: string | ReactNode
    wrapperClass?: string
}

/**
 * The `PopperElement` component is a TypeScript React component that renders a `span` element with a
 * `title` prop, and triggers a side effect when the `open` prop changes.
 * @param props - The `props` parameter is an object that contains the properties passed to the
 * `PopperElement` component. It has the following properties:
 * @returns The component is returning a `<span>` element with the `title` prop as its content.
 */
const PopperElement = (props: {
    title: string | ReactNode
    open: boolean
    forceUpdate: () => Partial<PopperJsState>
}) => {
    /* The line `const { title, forceUpdate, open } = props` is using object destructuring to extract
    the `title`, `forceUpdate`, and `open` properties from the `props` object. This allows us to use
    these properties directly in the component without having to reference `props.title`,
    `props.forceUpdate`, and `props.open`. */
    const { title, forceUpdate, open } = props

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the effect is triggered whenever the `open` prop changes. */
    useEffect(() => {
        if (open) {
            forceUpdate()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])
    return <span>{title}</span>
}

const Tooltip = (props: TooltipProps) => {
    /* This code is using object destructuring to extract the properties `className`, `children`,
    `isOpen`, `placement`, `title`, `wrapperClass`, and any remaining properties from the `props`
    object. */
    const {
        className,
        children,
        isOpen = false,
        placement = 'top',
        title,
        wrapperClass,
        ...rest
    } = props

    /* The line `const [tooltipOpen, setTooltipOpen] = useState<boolean>(isOpen)` is using the
    `useState` hook to create a state variable called `tooltipOpen` and a corresponding setter
    function called `setTooltipOpen`. The initial value of `tooltipOpen` is set to the value of the
    `isOpen` prop, which is passed to the component. This allows the `tooltipOpen` state to be
    controlled externally by passing a value for the `isOpen` prop. */
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(isOpen)

    /* The line `const tooltipNode = useRef()` is creating a ref object called `tooltipNode` using the
    `useRef` hook. This ref can be attached to a DOM element to access and manipulate that element
    directly. In this case, the ref is used to store a reference to the tooltip element rendered by
    the `Popper` component. */
    const tooltipNode = useRef()

    const tooltipBackground = 'gray-800'
    const tooltipDarkBackground = 'black'

    const defaultTooltipClass = `tooltip bg-${tooltipBackground} dark:bg-${tooltipDarkBackground}`

    /* The `toggleTooltip` function is a callback function created using the `useCallback` hook. It
    takes a boolean parameter `bool` and is used to toggle the state of the tooltip. */
    const toggleTooltip = useCallback(
        (bool: boolean) => {
            if (!isOpen) {
                setTooltipOpen(bool)
            }
        },
        [isOpen]
    )

    /* The `return` statement in the `Tooltip` component is rendering the JSX code that defines the
    structure and behavior of the tooltip component. */
    return (
        <Manager>
            <Reference>
                {({ ref }) => (
                    <span
                        ref={ref}
                        className={classNames('tooltip-wrapper', wrapperClass)}
                        onMouseEnter={() => toggleTooltip(true)}
                        onMouseLeave={() => toggleTooltip(false)}
                    >
                        {children}
                    </span>
                )}
            </Reference>
            {tooltipOpen && (
                <Portal>
                    <Popper
                        placement={placement}
                        innerRef={(node) => (tooltipNode.current = node)}
                        modifiers={[
                            {
                                name: 'arrow',
                                options: {
                                    element: Arrow as unknown as HTMLElement,
                                },
                            },
                            { name: 'offset', options: { offset: [0, 7] } },
                        ]}
                        strategy={'fixed'}
                    >
                        {({ ref, style, ...popperProps }) => (
                            <AnimatePresence>
                                <motion.div
                                    ref={ref}
                                    className={classNames(
                                        defaultTooltipClass,
                                        className
                                    )}
                                    style={style}
                                    initial={{
                                        opacity: 0,
                                        visibility: 'hidden',
                                    }}
                                    animate={
                                        tooltipOpen
                                            ? {
                                                  opacity: 1,
                                                  visibility: 'visible',
                                              }
                                            : {
                                                  opacity: 0,
                                                  visibility: 'hidden',
                                              }
                                    }
                                    transition={{
                                        duration: 0.15,
                                        type: 'tween',
                                    }}
                                >
                                    <PopperElement
                                        open={tooltipOpen}
                                        title={title}
                                        {...rest}
                                        {...popperProps}
                                    />
                                    <Arrow
                                        placement={placement}
                                        color={tooltipBackground}
                                        colorDark={tooltipDarkBackground}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </Popper>
                </Portal>
            )}
        </Manager>
    )
}

Tooltip.displayName = 'Tooltip'

export default Tooltip

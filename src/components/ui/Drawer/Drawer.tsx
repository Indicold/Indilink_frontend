/* These lines of code are importing various dependencies and types for the Drawer component. */
import classNames from 'classnames'
import Modal from 'react-modal'
import CloseButton from '../CloseButton'
import { motion } from 'framer-motion'
import type ReactModal from 'react-modal'
import type { MouseEvent, ReactNode } from 'react'

/* The `DrawerProps` interface is defining the props that can be passed to the `Drawer` component. */
export interface DrawerProps extends ReactModal.Props {
    bodyClass?: string
    closable?: boolean
    footer?: string | ReactNode
    footerClass?: string
    headerClass?: string
    height?: string | number
    lockScroll?: boolean
    onClose?: (e: MouseEvent<HTMLSpanElement>) => void
    placement?: 'top' | 'right' | 'bottom' | 'left'
    showBackdrop?: boolean
    title?: string | ReactNode
    width?: string | number
}

const Drawer = (props: DrawerProps) => {
    /* This code is using object destructuring to extract the properties from the `props` object passed
    to the `Drawer` component. */
    const {
        bodyOpenClassName,
        bodyClass,
        children,
        className,
        closable = true,
        closeTimeoutMS = 300,
        footer,
        footerClass,
        headerClass,
        height = 400,
        isOpen,
        lockScroll = true,
        onClose,
        overlayClassName,
        placement = 'right',
        portalClassName,
        showBackdrop = true,
        title,
        width = 400,
        ...rest
    } = props

    /**
     * The function `onCloseClick` is a TypeScript function that takes a MouseEvent and calls the
     * `onClose` function if it exists.
     * @param e - MouseEvent<HTMLSpanElement> - This is the event object that is passed when the close
     * button is clicked. It is of type MouseEvent and specifically for the HTMLSpanElement element.
     */
    const onCloseClick = (e: MouseEvent<HTMLSpanElement>) => {
        onClose?.(e)
    }

    /* The line `const renderCloseButton = <CloseButton onClick={onCloseClick} />` is creating a
    variable `renderCloseButton` that holds the JSX element `<CloseButton onClick={onCloseClick}
    />`. This JSX element represents the `CloseButton` component with the `onClick` prop set to the
    `onCloseClick` function. This variable is later used to render the close button in the `Drawer`
    component. */
    const renderCloseButton = <CloseButton onClick={onCloseClick} />

    /**
     * The function `getStyle` returns an object with different styles based on the value of the
     * `placement` variable.
     * @returns The function `getStyle` returns an object with the following properties:
     */
    const getStyle = (): {
        dimensionClass?: string
        contentStyle?: {
            width?: string | number
            height?: string | number
        }
        motionStyle: {
            [x: string]: string
        }
    } => {
        if (placement === 'left' || placement === 'right') {
            return {
                dimensionClass: 'vertical',
                contentStyle: { width },
                motionStyle: {
                    [placement]: `-${width}${
                        typeof width === 'number' && 'px'
                    }`,
                },
            }
        }

        if (placement === 'top' || placement === 'bottom') {
            return {
                dimensionClass: 'horizontal',
                contentStyle: { height },
                motionStyle: {
                    [placement]: `-${height}${
                        typeof height === 'number' && 'px'
                    }`,
                },
            }
        }

        return {
            motionStyle: {},
        }
    }

    /* The line `const { dimensionClass, contentStyle, motionStyle } = getStyle()` is using object
    destructuring to extract the properties `dimensionClass`, `contentStyle`, and `motionStyle` from
    the object returned by the `getStyle()` function. This allows us to use these properties
    directly in the `return` statement of the `Drawer` component. */
    const { dimensionClass, contentStyle, motionStyle } = getStyle()

    /* The `return` statement is rendering the `Modal` component from the `react-modal` library. The
    `Modal` component is used to create a modal dialog box. */
    return (
        <Modal
            className={{
                base: classNames('drawer', className as string),
                afterOpen: 'drawer-after-open',
                beforeClose: 'drawer-before-close',
            }}
            overlayClassName={{
                base: classNames(
                    'drawer-overlay',
                    overlayClassName as string,
                    !showBackdrop && 'bg-transparent'
                ),
                afterOpen: 'drawer-overlay-after-open',
                beforeClose: 'drawer-overlay-before-close',
            }}
            portalClassName={classNames('drawer-portal', portalClassName)}
            bodyOpenClassName={classNames(
                'drawer-open',
                lockScroll && 'drawer-lock-scroll',
                bodyOpenClassName
            )}
            ariaHideApp={false}
            isOpen={isOpen}
            closeTimeoutMS={closeTimeoutMS}
            {...rest}
        >
            <motion.div
                className={classNames('drawer-content', dimensionClass)}
                style={contentStyle}
                initial={motionStyle}
                animate={{
                    [placement as 'top' | 'right' | 'bottom' | 'left']: isOpen
                        ? 0
                        : motionStyle[placement],
                }}
            >
                {title || closable ? (
                    <div className={classNames('drawer-header', headerClass)}>
                        {typeof title === 'string' ? (
                            <h4>{title}</h4>
                        ) : (
                            <span>{title}</span>
                        )}
                        {closable && renderCloseButton}
                    </div>
                ) : null}
                <div className={classNames('drawer-body', bodyClass)}>
                    {children}
                </div>
                {footer && (
                    <div className={classNames('drawer-footer', footerClass)}>
                        {footer}
                    </div>
                )}
            </motion.div>
        </Modal>
    )
}

Drawer.displayName = 'Drawer'

export default Drawer

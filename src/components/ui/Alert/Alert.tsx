/* The code is importing various dependencies and types from different modules. Here is a breakdown of
what each import statement is doing: */
import { useState, forwardRef } from 'react'
import classNames from 'classnames'
import useTimeout from '../hooks/useTimeout'
import {
    HiCheckCircle,
    HiInformationCircle,
    HiExclamation,
    HiXCircle,
} from 'react-icons/hi'
import { motion } from 'framer-motion'
import CloseButton from '../CloseButton'
import StatusIcon from '../StatusIcon'
import type { TypeAttributes, CommonProps } from '../@types/common'
import type { ReactNode, MouseEvent } from 'react'

/* The `export interface AlertProps` is defining the props that can be passed to the `Alert` component.
Here is a breakdown of each prop: */
export interface AlertProps extends CommonProps {
    closable?: boolean
    customClose?: ReactNode | string
    customIcon?: ReactNode | string
    duration?: number
    title?: ReactNode | string
    onClose?: (e?: MouseEvent<HTMLDivElement>) => void
    rounded?: boolean
    showIcon?: boolean
    triggerByToast?: boolean
    type?: TypeAttributes.Status
}

const DEFAULT_TYPE = 'warning'

/* The `TYPE_MAP` constant is an object that maps different types of alerts to their corresponding
styles and icons. Each type of alert (success, info, warning, danger) has a set of properties such
as background color, title color, text color, icon color, and icon component. These properties are
used to style and display the alerts based on their type. For example, if the type of the alert is
"success", the background color will be 'bg-emerald-50' in light mode and 'dark:bg-emerald-500' in
dark mode, the title color will be 'text-emerald-700' in light mode and 'dark:text-emerald-50' in
dark mode, and so on. The icon component associated with each type is also provided to display the
appropriate icon for the alert. */
const TYPE_MAP = {
    success: {
        backgroundColor: 'bg-emerald-50 dark:bg-emerald-500',
        titleColor: 'text-emerald-700 dark:text-emerald-50',
        textColor: 'text-emerald-500 dark:text-emerald-50',
        iconColor: 'text-emerald-400 dark:text-emerald-50',
        icon: <HiCheckCircle />,
    },
    info: {
        backgroundColor: 'bg-blue-50 dark:bg-blue-500',
        titleColor: 'text-blue-700 dark:text-blue-100',
        textColor: 'text-blue-500 dark:text-blue-100',
        iconColor: 'text-blue-400 dark:text-blue-100',
        icon: <HiInformationCircle />,
    },
    warning: {
        backgroundColor: 'bg-yellow-50 dark:bg-yellow-500',
        titleColor: 'text-yellow-700 dark:text-yellow-50',
        textColor: 'text-yellow-500 dark:text-yellow-50',
        iconColor: 'text-yellow-400 dark:text-yellow-50',
        icon: <HiExclamation />,
    },
    danger: {
        backgroundColor: 'bg-red-50 dark:bg-red-500',
        titleColor: 'text-red-700 dark:text-red-100',
        textColor: 'text-red-500 dark:text-red-100',
        iconColor: 'text-red-400 dark:text-red-100',
        icon: <HiXCircle />,
    },
}

/* The `const TYPE_ARRAY` is an array of `TypeAttributes.Status` values. It contains the possible types
of alerts that can be used in the `Alert` component. The available types are `'success'`,
`'danger'`, `'info'`, and `'warning'`. This array is used to validate and determine the type of the
alert based on the props passed to the `Alert` component. If the type provided is not one of these
values, the default type `'warning'` will be used. */
const TYPE_ARRAY: TypeAttributes.Status[] = [
    'success',
    'danger',
    'info',
    'warning',
]

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
    /* The code is using object destructuring to extract specific props from the `props` object passed
    to the `Alert` component. Here is a breakdown of each extracted prop: */
    const {
        children,
        className,
        closable = false,
        customClose,
        customIcon,
        duration = 3000,
        title = null,
        onClose,
        rounded = true,
        showIcon = false,
        triggerByToast = false,
        ...rest
    } = props

    /**
     * The function `getType` returns the value of the `type` property from the `props` object, or a
     * default value if the `type` is not included in an array of valid types.
     * @returns The function `getType` returns the value of the `type` property from the `props`
     * object. If the `type` property is included in the `TYPE_ARRAY`, then it returns the `type`
     * value. Otherwise, it returns the value of `DEFAULT_TYPE`.
     */
    const getType = () => {
        const { type = DEFAULT_TYPE } = props
        if (TYPE_ARRAY.includes(type)) {
            return type
        }
        return DEFAULT_TYPE
    }

    /* The code is defining two variables `type` and `typeMap` using the `getType` function and the
    `TYPE_MAP` constant. */
    const type = getType()
    const typeMap = TYPE_MAP[type]

    const [display, setDisplay] = useState('show')

    /* The code is using the `useTimeout` custom hook to create a timeout for the `Alert` component. */
    const { clear } = useTimeout(
        onClose as () => void,
        duration,
        (duration as number) > 0
    )

    /**
     * The function handleClose is used to handle the closing of a component, updating its display
     * state and triggering an optional onClose callback.
     * @param e - MouseEvent<HTMLDivElement> - This is the event object that is passed when the
     * `handleClose` function is called. It represents a mouse event that occurred on a `<div>`
     * element.
     */
    const handleClose = (e: MouseEvent<HTMLDivElement>) => {
        setDisplay('hiding')
        onClose?.(e)
        clear()
        if (!triggerByToast) {
            setTimeout(() => {
                setDisplay('hide')
            }, 400)
        }
    }

    /**
     * The function `renderClose` returns a div element with a click event handler that calls the
     * `handleClose` function and renders a custom close button or a default close button component.
     * @returns The renderClose function is returning a div element with the className "cursor-pointer"
     * and an onClick event handler that calls the handleClose function. Inside the div, it renders
     * either the customClose component or a CloseButton component with the defaultStyle set to false.
     */
    const renderClose = () => {
        return (
            <div
                className="cursor-pointer"
                role="presentation"
                onClick={(e) => handleClose(e)}
            >
                {customClose || <CloseButton defaultStyle={false} />}
            </div>
        )
    }

    const alertDefaultClass = 'p-4 relative flex'

    /* The `classNames` function is used to concatenate multiple class names together. In this case,
    the `alertClass` variable is created by combining the following class names: */
    const alertClass = classNames(
        'alert',
        alertDefaultClass,
        typeMap.backgroundColor,
        typeMap.textColor,
        !title ? 'font-semibold' : '',
        closable ? 'justify-between' : '',
        closable && !title ? 'items-center' : '',
        rounded && 'rounded-lg',
        className
    )

    if (display === 'hide') {
        return null
    }

    /* The code is returning a JSX element that represents the structure and content of the `Alert`
    component. */
    return (
        <motion.div
            ref={ref}
            className={alertClass}
            initial={{ opacity: 1 }}
            animate={display === 'hiding' ? 'exit' : 'animate'}
            transition={{ duration: 0.25, type: 'tween' }}
            variants={{
                animate: {
                    opacity: 1,
                },
                exit: {
                    opacity: 0,
                },
            }}
            {...rest}
        >
            <div className={`flex ${title ? '' : 'items-center'}`}>
                {showIcon && (
                    <StatusIcon
                        iconColor={typeMap.iconColor}
                        custom={customIcon}
                        type={type}
                    />
                )}
                <div className={showIcon ? 'ltr:ml-2 rtl:mr-2' : ''}>
                    {title ? (
                        <div
                            className={`font-semibold mb-1 ${typeMap.titleColor}`}
                        >
                            {title}
                        </div>
                    ) : null}
                    {children}
                </div>
            </div>
            {closable ? renderClose() : null}
        </motion.div>
    )
})

/* `Alert.displayName = 'Alert'` is setting the `displayName` property of the `Alert` component to the
string value `'Alert'`. */
Alert.displayName = 'Alert'

export default Alert

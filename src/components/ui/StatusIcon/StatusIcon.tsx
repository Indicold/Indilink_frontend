/* The code is importing specific components and types from different modules. */
import {
    HiCheckCircle,
    HiInformationCircle,
    HiExclamation,
    HiXCircle,
} from 'react-icons/hi'
import type { TypeAttributes, CommonProps } from '../@types/common'
import type { ReactNode } from 'react'

/* The `export interface StatusIconProps extends CommonProps` is defining an interface called
`StatusIconProps` that extends the `CommonProps` interface. */
export interface StatusIconProps extends CommonProps {
    type: TypeAttributes.Status
    custom?: ReactNode | JSX.Element
    iconColor?: string
}

/* The `const ICONS` is a constant variable that stores a record (an object with key-value pairs) of
different status types and their corresponding color and icon. */
const ICONS: Record<
    TypeAttributes.Status,
    {
        color: string
        icon: JSX.Element
    }
> = {
    success: {
        color: 'text-emerald-400',
        icon: <HiCheckCircle />,
    },
    info: {
        color: 'text-blue-400',
        icon: <HiInformationCircle />,
    },
    warning: {
        color: 'text-yellow-400',
        icon: <HiExclamation />,
    },
    danger: {
        color: 'text-red-400',
        icon: <HiXCircle />,
    },
}

/**
 * The `StatusIcon` component is a TypeScript React component that renders an icon based on the
 * provided `type` prop, with an optional custom icon and icon color.
 * @param {StatusIconProps} props - The `props` parameter is an object that contains the properties
 * passed to the `StatusIcon` component.
 * @returns The component is returning a `<span>` element with a class name of "text-2xl" and the icon
 * or custom content inside it.
 */
const StatusIcon = (props: StatusIconProps) => {
    const { type = 'info', custom, iconColor } = props

    const icon = ICONS[type]

    return (
        <span className={`text-2xl ${iconColor || icon.color}`}>
            {custom || icon.icon}
        </span>
    )
}

export default StatusIcon

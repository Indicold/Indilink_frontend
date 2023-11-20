/* These lines of code are importing various dependencies and types from different modules. */
import { Children, cloneElement, Fragment } from 'react'
import classNames from 'classnames'
import Avatar from './Avatar'
import Tooltip from '../Tooltip/Tooltip'
import type { AvatarProps } from './Avatar'
import type { CommonProps } from '../@types/common'
import type { ReactNode, ReactElement } from 'react'

/* The `export interface AvatarGroupProps` is defining the props that can be passed to the
`AvatarGroup` component. */
export interface AvatarGroupProps extends CommonProps {
    chained?: boolean
    maxCount?: number
    onOmittedAvatarClick?: () => void
    omittedAvatarContent?: string | ReactNode
    omittedAvatarProps?: AvatarProps
    omittedAvatarTooltip?: boolean
}

/* The `interface GroupContainerProps` is defining the props that can be passed to the `GroupContainer`
component. It extends the `CommonProps` interface and picks the `chained` prop from the
`AvatarGroupProps` interface. This means that the `GroupContainerProps` interface will have all the
props from the `CommonProps` interface, as well as the `chained` prop from the `AvatarGroupProps`
interface. */
interface GroupContainerProps
    extends CommonProps,
        Pick<AvatarGroupProps, 'chained'> {}

/**
 * The GroupContainer component is a wrapper that renders its children inside a div with specific
 * classNames based on the props passed to it.
 * @param {GroupContainerProps}  - 1. `children`: This is a special prop in React that allows you to
 * pass components or elements as children to the `GroupContainer` component. It is used to render the
 * content inside the `div` element.
 */
const GroupContainer = ({
    children,
    chained,
    className,
}: GroupContainerProps) => (
    <div
        className={classNames(
            'avatar-group',
            chained && 'avatar-group-chained',
            className
        )}
    >
        {children}
    </div>
)

/**
 * The AvatarGroup component is a React component that displays a group of avatars, with the ability to
 * show an overflow count and handle click events.
 * @param {AvatarGroupProps} props - The `props` parameter is an object that contains the following
 * properties:
 * @returns The function `AvatarGroup` returns JSX elements wrapped in a `GroupContainer` component.
 * The returned JSX elements are either the `children` passed to the `AvatarGroup` component, or a
 * subset of the `children` with an additional `Avatar` component appended if the `maxCount` prop is
 * provided and the number of `children` exceeds the `maxCount` value.
 */
const AvatarGroup = (props: AvatarGroupProps) => {
    /* The code is using object destructuring to extract specific properties from the `props` object
    passed to the `AvatarGroup` component. */
    const {
        chained = false,
        children,
        className,
        maxCount = 4,
        onOmittedAvatarClick,
        omittedAvatarContent,
        omittedAvatarProps,
        omittedAvatarTooltip = false,
    } = props

    const childCount = Children.count(children)

    /* The code `const childWithKey = Children.toArray(children).map((child, index) =>
            cloneElement(child as ReactElement, {
                key: `grouped-avatar-`,
            })
        )` is creating a new array called `childWithKey` by iterating over the `children` prop using
    the `map` function. */
    const childWithKey = Children.toArray(children).map((child, index) =>
        cloneElement(child as ReactElement, {
            key: `grouped-avatar-${index}`,
        })
    )

    /* This code block is checking if the number of avatars (`childCount`) exceeds the maximum count
    (`maxCount`) specified in the props. If it does, it creates a subset of avatars (`childToShow`)
    by slicing the `childWithKey` array up to the `maxCount` value. */
    if (maxCount && maxCount < childCount) {
        const childToShow = childWithKey.slice(0, maxCount)
        const overflowCount = childCount - maxCount
        const avatar = (
            <Avatar
                className={onOmittedAvatarClick ? 'cursor-pointer' : ''}
                onClick={() => onOmittedAvatarClick?.()}
                {...omittedAvatarProps}
            >
                {omittedAvatarContent || `+${overflowCount}`}
            </Avatar>
        )

        childToShow.push(
            omittedAvatarTooltip ? (
                <Tooltip
                    key="avatar-more-tooltip"
                    title={`${overflowCount} More`}
                >
                    <>{avatar}</>
                </Tooltip>
            ) : (
                <Fragment key="avatar-more-tooltip">{avatar}</Fragment>
            )
        )
        return (
            <GroupContainer className={className} chained={chained}>
                {childToShow}
            </GroupContainer>
        )
    }

    /* The `return` statement is returning JSX elements wrapped in a `GroupContainer` component. The
    returned JSX elements are either the `children` passed to the `AvatarGroup` component or a
    subset of the `children` with an additional `Avatar` component appended if the `maxCount` prop
    is provided and the number of `children` exceeds the `maxCount` value. */
    return (
        <GroupContainer className={className} chained={chained}>
            {children}
        </GroupContainer>
    )
}

/* The line `AvatarGroup.displayName = 'AvatarGroup'` is setting the `displayName` property of the
`AvatarGroup` component to the string value `'AvatarGroup'`. */
AvatarGroup.displayName = 'AvatarGroup'

export default AvatarGroup

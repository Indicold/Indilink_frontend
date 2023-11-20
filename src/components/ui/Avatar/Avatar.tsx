/* The code is importing various dependencies and types from different modules. */
import { useState, useEffect, useRef, forwardRef } from 'react'
import useMergedRef from '../hooks/useMergeRef'
import classNames from 'classnames'
import type { CommonProps, TypeAttributes } from '../@types/common'
import type { ReactNode } from 'react'

/* The `export interface AvatarProps` is defining the props that can be passed to the `Avatar`
component. */
export interface AvatarProps extends CommonProps {
    alt?: string
    icon?: ReactNode
    onClick?: () => void
    size?: 'lg' | 'md' | 'sm' | number
    shape?: Exclude<TypeAttributes.Shape, 'none'> | 'square'
    src?: string
    srcSet?: string
}

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => {
    /* This code is using object destructuring to extract specific properties from the `props` object
    passed to the `Avatar` component. */
    const {
        alt,
        className,
        icon,
        shape = 'rounded',
        size = 'md',
        src,
        srcSet,
        ...rest
    } = props

    /* The line `let { children } = props` is using object destructuring to extract the `children`
    property from the `props` object passed to the `Avatar` component. This allows the code to
    directly access the `children` property without having to use `props.children` throughout the
    component. */
    let { children } = props
    const [scale, setScale] = useState(1)

    /* The code is using the `useRef` hook to create two references: `avatarChildren` and `avatarNode`. */
    const avatarChildren = useRef<HTMLSpanElement>(null)
    const avatarNode = useRef<HTMLSpanElement>(null)

    /* The line `const avatarMergeRef = useMergedRef(ref, avatarNode)` is creating a merged ref using
    the `useMergedRef` hook. */
    const avatarMergeRef = useMergedRef(ref, avatarNode)

    /**
     * The function calculates the scale factor for an avatar element based on the width of its
     * children and the width of the avatar itself.
     * @returns the value of the `setScale` function.
     */
    const innerScale = () => {
        if (!avatarChildren.current || !avatarNode.current) {
            return
        }
        const avatarChildrenWidth = avatarChildren.current.offsetWidth
        const avatarNodeWidth = avatarNode.current.offsetWidth
        if (avatarChildrenWidth === 0 || avatarNodeWidth === 0) {
            return
        }
        setScale(
            avatarNodeWidth - 8 < avatarChildrenWidth
                ? (avatarNodeWidth - 8) / avatarChildrenWidth
                : 1
        )
    }

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the `useEffect` hook is being used to call the `innerScale` function whenever the `scale` or
    `children` variables change. */
    useEffect(() => {
        innerScale()
    }, [scale, children])

    /* The `sizeStyle` constant is a JavaScript object that defines the CSS styles for the `Avatar`
    component based on the `size` prop. */
    const sizeStyle =
        typeof size === 'number'
            ? {
                  width: size,
                  height: size,
                  minWidth: size,
                  lineHeight: `${size}px`,
                  fontSize: icon ? size / 2 : 12,
              }
            : {}

    /* The `classNames` function is a utility function that is used to conditionally concatenate class
    names together. In this code, the `classNames` function is being used to generate the class
    names for the `Avatar` component. */
    const classes = classNames(
        'avatar',
        `avatar-${shape}`,
        typeof size === 'string' ? `avatar-${size}` : '',
        className
    )

    /* This code block is responsible for rendering the content of the `Avatar` component based on the
    presence of the `src` or `icon` props. */
    if (src) {
        children = (
            <img
                className={`avatar-img avatar-${shape}`}
                src={src}
                srcSet={srcSet}
                alt={alt}
                loading="lazy"
            />
        )
    } else if (icon) {
        children = (
            <span className={classNames('avatar-icon', `avatar-icon-${size}`)}>
                {icon}
            </span>
        )
    } else {
        const childrenSizeStyle =
            typeof size === 'number' ? { lineHeight: `${size}px` } : {}
        const stringCentralized = {
            transform: `translateX(-50%) scale(${scale})`,
        }
        children = (
            <span
                ref={avatarChildren}
                className={`avatar-string ${
                    typeof size === 'number' ? '' : `avatar-inner-${size}`
                }`}
                style={{
                    ...childrenSizeStyle,
                    ...stringCentralized,
                    ...(typeof size === 'number' ? { height: size } : {}),
                }}
            >
                {children}
            </span>
        )
    }

    /* The `return` statement is returning JSX code that will be rendered as the output of the `Avatar`
    component. */
    return (
        <span
            ref={avatarMergeRef}
            className={classes}
            style={{ ...sizeStyle, ...rest.style }}
            {...rest}
        >
            {children}
        </span>
    )
})

/* `Avatar.displayName = 'Avatar'` is setting the `displayName` property of the `Avatar` component to
the string value `'Avatar'`. */
Avatar.displayName = 'Avatar'

export default Avatar

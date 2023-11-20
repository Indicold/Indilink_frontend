/* The code is importing various modules and types from different files. */
import classNames from 'classnames'
import { HEADER_HEIGHT_CLASS } from '@/constants/theme.constant'
import type { ReactNode } from 'react'
import type { CommonProps } from '@/@types/common'

/* The `interface HeaderProps` is defining the props that can be passed to the `Header` component. It
extends the `CommonProps` interface, which likely contains common props used throughout the
application. */
interface HeaderProps extends CommonProps {
    headerStart?: ReactNode
    headerEnd?: ReactNode
    headerMiddle?: ReactNode
    container?: boolean
}

/* The code is defining a functional component called `Header`. It takes in a single parameter `props`
of type `HeaderProps`, which is an interface defining the props that can be passed to the component. */
const Header = (props: HeaderProps) => {
    const { headerStart, headerEnd, headerMiddle, className, container } = props

    return (
        <header className={classNames('header', className)}>
            <div
                className={classNames(
                    'header-wrapper',
                    HEADER_HEIGHT_CLASS,
                    container && 'container mx-auto'
                )}
            >
                <div className="header-action header-action-start">
                    {headerStart}
                </div>
                {headerMiddle && (
                    <div className="header-action header-action-middle">
                        {headerMiddle}
                    </div>
                )}
                <div className="header-action header-action-end">
                    {headerEnd}
                </div>
            </div>
        </header>
    )
}

export default Header

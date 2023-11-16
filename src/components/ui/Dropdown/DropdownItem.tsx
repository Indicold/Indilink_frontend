/* This code is importing various dependencies and modules that are needed for the implementation of
the `DropdownItem` component. */
import {
    useContext,
    useCallback,
    useEffect,
    useRef,
    forwardRef,
    isValidElement,
    cloneElement,
} from 'react'
import isNil from 'lodash/isNil'
import chainedFunction from '../utils/chainedFunction'
import DropdownContext from './context/dropdownContext'
import MenuContext from './context/menuContext'
import useUncertainRef from '../hooks/useUncertainRef'
import useUniqueId from '../hooks/useUniqueId'
import { useConfig } from '../ConfigProvider'
import DropdownMenuContext, {
    useDropdownMenuContext,
    DropdownMenuContextProvider,
} from './context/dropdownMenuContext'
import classNames from 'classnames'
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi'
import MenuItem from '../MenuItem'
import { DROPDOWN_ITEM_TYPE } from '../utils/constants'
import type { CommonProps } from '../@types/common'
import type {
    SyntheticEvent,
    RefObject,
    ElementType,
    ReactElement,
} from 'react'

/* The `DropdownItemProps` interface defines the props that can be passed to the `DropdownItem`
component. Here is a breakdown of each prop: */
export interface DropdownItemProps extends CommonProps {
    asElement?: ElementType
    active?: boolean
    disabled?: boolean
    submenu?: ReactElement
    eventKey?: string
    onClick?: () => void
    onSelect?: (eventKey: string, e: SyntheticEvent) => void
    variant?: 'default' | 'header' | 'divider' | 'custom'
}

const { DEFAULT, DIVIDER, HEADER, CUSTOM } = DROPDOWN_ITEM_TYPE

const DropdownItem = forwardRef<HTMLElement, DropdownItemProps>(
    (props, ref) => {
        /* This code is using object destructuring to extract specific props from the `props` object
        passed to the `DropdownItem` component. */
        const {
            asElement: Component = 'li',
            children,
            active: activeProp,
            disabled,
            className,
            submenu,
            style,
            eventKey,
            onClick,
            onSelect,
            variant = DEFAULT,
            ...rest
        } = props

        /* The line `const { mode, direction } = useConfig()` is using the `useConfig` hook to retrieve
        the `mode` and `direction` values from the configuration context. These values are used to
        determine the appearance and behavior of the `DropdownItem` component. */
        const { mode, direction } = useConfig()

        /* The line `const menuitemRef = useUncertainRef<HTMLElement>(ref) as RefObject<HTMLElement>`
        is using the `useUncertainRef` hook to create a ref object that can refer to either an HTML
        element or `null`. */
        const menuitemRef = useUncertainRef<HTMLElement>(
            ref
        ) as RefObject<HTMLElement>

        /* The `const menuitemId = useUniqueId('menu-item-')` line is using the `useUniqueId` hook to
        generate a unique ID for the `DropdownItem` component. The generated ID is prefixed with
        `'menu-item-'`. This ID is used as the `id` attribute for the `DropdownItem` component,
        which can be useful for accessibility purposes or for targeting the component in CSS or
        JavaScript. */
        const menuitemId = useUniqueId('menu-item-')

        /* The line `const submenuRef = useRef(null)` is creating a ref object called `submenuRef` and
        initializing it with a value of `null`. This ref object can be used to refer to a DOM
        element or another value in the component. In this case, it is used to refer to the submenu
        element within the `DropdownItem` component. */
        const submenuRef = useRef(null)

        /* These lines of code are using the `useContext` hook to access the values from the context
        providers. */
        const dropdown = useContext(DropdownContext)
        const menu = useContext(MenuContext)
        const menuControl = useContext(DropdownMenuContext)
        const submenuControl = useDropdownMenuContext(submenuRef)

        const open = submenuControl.open

        const active =
            activeProp ||
            (!isNil(menu?.activeKey) && menu?.activeKey === eventKey) ||
            (!isNil(dropdown?.activeKey) && dropdown?.activeKey === eventKey)

        /* The `openSubmenuIfExists` function is a callback function created using the `useCallback`
        hook. It is responsible for opening the submenu if it exists. */
        const openSubmenuIfExists = useCallback(() => {
            if (!submenu) {
                return
            }
            submenuControl.openMenu()
            submenuControl.focusItemAt(0)
        }, [submenu, submenuControl])

        /* The `activate` function is a callback function created using the `useCallback` hook. It is
        responsible for activating the `DropdownItem` component when it is clicked or selected. */
        const activate = useCallback(
            (e: SyntheticEvent) => {
                onSelect?.(eventKey as string, e)
                menu?.onSelect?.(eventKey as string, e)
            },
            [eventKey, onSelect, menu]
        )

        /* The `handleClick` function is a callback function created using the `useCallback` hook. It
        is responsible for handling the click event on the `DropdownItem` component. */
        const handleClick = useCallback(
            (e: SyntheticEvent) => {
                if (disabled) {
                    return
                }

                if (submenu) {
                    openSubmenuIfExists()
                } else {
                    activate(e)
                }
            },
            [disabled, submenu, openSubmenuIfExists, activate]
        )

        /* The `handleMouseOver` function is a callback function created using the `useCallback` hook.
        It is responsible for handling the mouse over event on the `DropdownItem` component. */
        const handleMouseOver = useCallback(() => {
            if (submenu) {
                submenuControl.openMenu()
            }
        }, [submenu, submenuControl])

        /* The `handleMouseOut` function is a callback function created using the `useCallback` hook.
        It is responsible for handling the mouse out event on the `DropdownItem` component. */
        const handleMouseOut = useCallback(() => {
            if (submenu) {
                submenuControl.closeMenu()
            }
        }, [submenu, submenuControl])

        const menuitemEventHandlers: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick: any
            onMouseOver?: () => void
            onMouseOut?: () => void
        } = {
            onClick: chainedFunction(handleClick, onClick),
        }

        const { registerItem, unregisterItem } = menuControl ?? {}

        if (submenu) {
            menuitemEventHandlers.onMouseOver = handleMouseOver
            menuitemEventHandlers.onMouseOut = handleMouseOut
        }

        useEffect(() => {
            if (variant !== DIVIDER && variant !== HEADER) {
                registerItem?.(menuitemRef.current, { disabled })
            }
            return () => {
                unregisterItem?.(menuitemId)
            }
        }, [
            registerItem,
            unregisterItem,
            menuitemRef,
            menuitemId,
            disabled,
            variant,
        ])

        if (variant === DIVIDER || variant === HEADER || variant === CUSTOM) {
            return (
                <Component
                    ref={menuitemRef}
                    id={menuitemId}
                    style={style}
                    className={classNames(`menu-item-${variant}`, className)}
                    {...(variant === CUSTOM ? menuitemEventHandlers : {})}
                    {...rest}
                >
                    {(variant === HEADER || variant === CUSTOM) && children}
                </Component>
            )
        }

        function renderChildren() {
            if (!isValidElement(children)) {
                return children
            }
            return cloneElement(children)
        }

        function renderSubmenu() {
            if (!submenu) {
                return null
            }

            return (
                <DropdownMenuContextProvider value={submenuControl}>
                    {cloneElement(submenu, {
                        ref: submenuRef,
                        hidden: !open,
                    })}
                </DropdownMenuContextProvider>
            )
        }

        if (submenu) {
            return (
                <li
                    {...rest}
                    style={style}
                    className="relative"
                    {...menuitemEventHandlers}
                >
                    <MenuItem
                        ref={menuitemRef}
                        asElement="div"
                        id={menuitemId}
                        isActive={active}
                        eventKey={eventKey}
                        variant={mode}
                        className={classNames(
                            'dropdown-submenu-item',
                            className
                        )}
                    >
                        <span>{children}</span>
                        {direction === 'rtl' ? (
                            <HiChevronLeft />
                        ) : (
                            <HiChevronRight />
                        )}
                    </MenuItem>
                    {renderSubmenu()}
                </li>
            )
        }

        return (
            <MenuItem
                ref={menuitemRef}
                asElement="li"
                style={style}
                isActive={active}
                disabled={disabled}
                eventKey={eventKey}
                variant={mode}
                className={className}
                {...menuitemEventHandlers}
                {...rest}
            >
                {renderChildren()}
                {renderSubmenu()}
            </MenuItem>
        )
    }
)

DropdownItem.displayName = 'DropdownItem'

export default DropdownItem

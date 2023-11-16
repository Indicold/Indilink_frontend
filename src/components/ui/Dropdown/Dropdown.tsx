/* This code is importing various dependencies and components from different files and libraries. Here
is a breakdown of what each import statement is doing: */
import { forwardRef, useRef, useCallback } from 'react'
import DropdownMenu from './DropdownMenu'
import DropdownToggle from './DropdownToggle'
import useUniqueId from '../hooks/useUniqueId'
import DropdownContext from './context/dropdownContext'
import DropdownMenuContext, {
    useDropdownMenuContext,
} from './context/dropdownMenuContext'
import chainedFunction from '../utils/chainedFunction'
import useRootClose from '../hooks/useRootClose'
import arrayIndexOf from '../utils/arrayIndexOf'
import { PLACEMENT } from '../utils/constants'
import type { CommonProps } from '../@types/common'
import type { DropdownToggleSharedProps } from './DropdownToggle'
import type { DropdownPlacement } from '../@types/placement'
import type { SyntheticEvent, CSSProperties } from 'react'

/* The `export interface DropdownProps` defines the props that can be passed to the `Dropdown`
component. Here is a breakdown of each prop: */
export interface DropdownProps extends CommonProps, DropdownToggleSharedProps {
    title?: string
    menuClass?: string
    menuStyle?: CSSProperties
    disabled?: boolean
    activeKey?: string
    trigger?: 'click' | 'hover' | 'context'
    onClick?: (event: SyntheticEvent) => void
    onMouseEnter?: (event: SyntheticEvent) => void
    onMouseLeave?: (event: SyntheticEvent) => void
    onContextMenu?: (event: SyntheticEvent) => void
    onSelect?: (eventKey: string, event: SyntheticEvent) => void
    onOpen?: () => void
    onClose?: () => void
    onToggle?: (open?: boolean) => void
}

/* This line of code is destructuring the `BOTTOM_START` property from the `PLACEMENT` object and
assigning it to the constant `BOTTOM_START`. The `PLACEMENT` object is casted as `Record<string,
DropdownPlacement>`, which means it is treated as an object with string keys and values of type
`DropdownPlacement`. */
const { BOTTOM_START } = PLACEMENT as Record<string, DropdownPlacement>

const CLICK = 'click'
const HOVER = 'hover'
const CONTEXT = 'context'

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
    /* This code is using object destructuring to extract specific properties from the `props` object
    passed to the `Dropdown` component. */
    const {
        title,
        children,
        menuClass,
        menuStyle,
        disabled,
        renderTitle,
        placement = BOTTOM_START,
        activeKey,
        toggleClassName,
        trigger = 'click',
        style,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onContextMenu,
        onSelect,
        onOpen,
        onClose,
        onToggle,
        ...rest
    } = props

    /* The code is using the `useRef` hook from React to create two mutable references, `overlayTarget`
    and `triggerTarget`. These references are initially set to `null`. */
    const overlayTarget = useRef(null)
    const triggerTarget = useRef(null)

    /* The line `const menuControl = useDropdownMenuContext(overlayTarget)` is using the
    `useDropdownMenuContext` hook to get the menu control object from the `DropdownMenuContext`. The
    `useDropdownMenuContext` hook takes the `overlayTarget` as an argument, which is a reference to
    the overlay element of the dropdown menu. It returns the menu control object, which contains
    functions to open and close the menu. */
    const menuControl = useDropdownMenuContext(overlayTarget)
    const open = menuControl.open

    /* The `useUniqueId` hook is being used to generate unique IDs for the button and menu elements in
    the `Dropdown` component. */
    const buttonId = useUniqueId('dropdown-toggle-')
    const menuId = useUniqueId('base-menu-')

    /* The `handleToggle` function is a callback function created using the `useCallback` hook. It is
    responsible for toggling the state of the dropdown menu. */
    const handleToggle = useCallback(
        (isOpen?: boolean) => {
            const nextOpen = typeof isOpen === 'undefined' ? !open : isOpen
            const fn = nextOpen ? onOpen : onClose

            fn?.()
            onToggle?.(nextOpen)
            if (nextOpen) {
                menuControl.openMenu()
            } else {
                menuControl.closeMenu()
            }
        },
        [onClose, onOpen, onToggle, open, menuControl]
    )

    /* The `handleClick` function is a callback function created using the `useCallback` hook. It is
    responsible for handling the click event on the dropdown component. */
    const handleClick = useCallback(
        (e: SyntheticEvent) => {
            e.preventDefault()
            if (disabled) {
                return
            }
            handleToggle()
        },
        [disabled, handleToggle]
    )

    /* The `handleMouseEnter` function is a callback function created using the `useCallback` hook. It
    is responsible for handling the mouse enter event on the dropdown component. */
    const handleMouseEnter = useCallback(() => {
        if (!disabled) {
            handleToggle(true)
        }
    }, [disabled, handleToggle])

    /* The `handleMouseLeave` function is a callback function created using the `useCallback` hook. It
    is responsible for handling the mouse leave event on the dropdown component. */
    const handleMouseLeave = useCallback(() => {
        if (!disabled) {
            handleToggle(false)
        }
    }, [disabled, handleToggle])

    /**
     * The function "handleSelect" is used to handle the selection of an event and toggle a state.
     * @param {string} eventKey - The eventKey parameter is a string that represents the key of the
     * selected item in the dropdown menu. It is typically used to identify the selected item when
     * handling the onSelect event.
     * @param {SyntheticEvent} event - The `event` parameter is a SyntheticEvent object that represents
     * the event that triggered the `handleSelect` function. It contains information about the event,
     * such as the target element, event type, and event properties.
     */
    const handleSelect = (eventKey: string, event: SyntheticEvent) => {
        onSelect?.(eventKey, event)
        handleToggle(false)
    }

    /* The `useRootClose` hook is a custom hook that is used to handle the closing of the dropdown menu
    when a user clicks outside of the menu. */
    useRootClose(() => handleToggle(), {
        triggerTarget,
        overlayTarget,
        disabled: !open,
        listenEscape: false,
    })

    /* The `dropdownProps` constant is an object that contains the `onMouseEnter` and `onMouseLeave`
    properties. These properties are assigned the values of the `onMouseEnter` and `onMouseLeave`
    functions, respectively. */
    const dropdownProps = {
        onMouseEnter,
        onMouseLeave,
    }

    /* The `toggleEventHandlers` constant is an object that contains the event handlers for the
    `onClick` and `onContextMenu` events. */
    const toggleEventHandlers = {
        onClick: onClick,
        onContextMenu,
    }

    /* This code block is checking if the `trigger` prop contains the value `'click'`. If it does, it
    means that the dropdown should be triggered by a click event. */
    if (arrayIndexOf(CLICK, trigger)) {
        toggleEventHandlers.onClick = chainedFunction(
            handleClick,
            toggleEventHandlers.onClick
        )
    }

    /* This code block is checking if the `trigger` prop contains the value `'context'`. If it does, it
    means that the dropdown should be triggered by a context menu event. */
    if (arrayIndexOf(CONTEXT, trigger)) {
        toggleEventHandlers.onContextMenu = chainedFunction(
            handleClick,
            onContextMenu
        )
    }

    /* This code block is checking if the `trigger` prop contains the value `'hover'`. If it does, it
    means that the dropdown should be triggered by a hover event. */
    if (arrayIndexOf(HOVER, trigger)) {
        dropdownProps.onMouseEnter = chainedFunction(
            handleMouseEnter,
            onMouseEnter
        )
        dropdownProps.onMouseLeave = chainedFunction(
            handleMouseLeave,
            onMouseLeave
        )
    }

    /* The `toggleElement` constant is creating a JSX element for the dropdown toggle button. It is
    using the `DropdownToggle` component and passing various props to it, such as `ref`, `id`,
    `className`, `renderTitle`, `disabled`, and `placement`. The `title` prop is also passed as the
    content of the toggle button. The `...rest` and `...toggleEventHandlers` spread operators are
    used to pass any additional props and event handlers to the `DropdownToggle` component. */
    const toggleElement = (
        <DropdownToggle
            {...rest}
            {...toggleEventHandlers}
            ref={triggerTarget}
            id={buttonId}
            className={toggleClassName}
            renderTitle={renderTitle}
            disabled={disabled}
            placement={placement}
        >
            {title}
        </DropdownToggle>
    )

    /* The `menuElement` constant is creating a JSX element for the dropdown menu. It is using the
    `DropdownMenu` component and passing various props to it, such as `ref`, `className`, `style`,
    `activeKey`, `hidden`, `placement`, `id`, and `onSelect`. The `children` prop is also passed as
    the content of the dropdown menu. The `overlayTarget` ref is used to reference the overlay
    element of the dropdown menu. The `menuClass` and `menuStyle` props are used to apply custom CSS
    classes and styles to the dropdown menu. The `activeKey` prop is used to specify the currently
    active item in the dropdown menu. The `hidden` prop is used to control the visibility of the
    dropdown menu. The `placement` prop is used to specify the position of the dropdown menu
    relative to the toggle button. The `id` prop is used to assign a unique ID to the dropdown menu.
    The `onSelect` prop is used to handle the selection of an item in the dropdown menu. */
    const menuElement = (
        <DropdownMenu
            ref={overlayTarget}
            className={menuClass}
            style={menuStyle}
            activeKey={activeKey}
            hidden={!open}
            placement={placement}
            id={menuId}
            onSelect={handleSelect}
        >
            {children}
        </DropdownMenu>
    )

    /* The `return` statement is returning a JSX element that represents the structure and content of
    the `Dropdown` component. */
    return (
        <DropdownContext.Provider value={{ activeKey }}>
            <div
                {...dropdownProps}
                ref={ref}
                style={style}
                className="dropdown"
            >
                {toggleElement}
                <DropdownMenuContext.Provider value={menuControl}>
                    {menuElement}
                </DropdownMenuContext.Provider>
            </div>
        </DropdownContext.Provider>
    )
})

Dropdown.displayName = 'Dropdown'

export default Dropdown

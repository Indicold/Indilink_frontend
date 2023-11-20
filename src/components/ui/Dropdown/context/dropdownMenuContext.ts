/* The code is importing several functions and utilities from the 'react' and 'lodash' libraries. */
import { createContext, useState, useRef, useCallback } from 'react'
import isNil from 'lodash/isNil'

/**
 * The above type represents an item with an element property that can be either an HTMLElement or
 * null, and props property that can have a disabled boolean property.
 * @property {HTMLElement | null} element - The `element` property is a reference to an HTML element.
 * It can either be an actual HTML element or `null` if no element is associated with the item.
 * @property props - The `props` property is an object that can contain various properties related to
 * the `Item` element. In this case, it can have a `disabled` property which is optional and can be a
 * boolean value.
 */
type Item = {
    element: HTMLElement | null
    props: { disabled?: boolean }
}

/**
 * The above type defines the props for a context used in a dropdown menu component.
 * @property registerItem - A function that takes in two parameters:
 * @property unregisterItem - The `unregisterItem` property is a function that takes an `id` parameter
 * and is used to unregister an item from the dropdown menu.
 */
type DropdownMenuContextProps = {
    registerItem?: (
        element: HTMLElement | null,
        props: { disabled?: boolean }
    ) => void
    unregisterItem?: (id: string) => void
}

/* The line `const DropdownMenuContext = createContext<DropdownMenuContextProps>({})` is creating a new
context object called `DropdownMenuContext` using the `createContext` function from the React
library. The `createContext` function takes in a generic type argument `<DropdownMenuContextProps>`
which specifies the type of the context value. In this case, the context value is an object with
properties `registerItem` and `unregisterItem`, both of which are optional functions. The empty
object `{}` passed as an argument is the default value for the context. */
const DropdownMenuContext = createContext<DropdownMenuContextProps>({})

/* `export const DropdownMenuContextProvider = DropdownMenuContext.Provider` is exporting a constant
variable `DropdownMenuContextProvider` that is assigned the value of `DropdownMenuContext.Provider`. */
export const DropdownMenuContextProvider = DropdownMenuContext.Provider

/* `export const DropdownMenuContextConsumer = DropdownMenuContext.Consumer` is exporting a constant
variable `DropdownMenuContextConsumer` that is assigned the value of `DropdownMenuContext.Consumer`. */
export const DropdownMenuContextConsumer = DropdownMenuContext.Consumer

/**
 * The `useDropdownMenuContext` function is a custom hook in TypeScript that provides a context for
 * managing the state and behavior of a dropdown menu.
 * @param menuRef - A React ref object that references the dropdown menu element.
 * @returns The code is returning an object with the following properties:
 */
export function useDropdownMenuContext<E extends HTMLElement>(
    menuRef: React.RefObject<E>
) {
    /* The code is using the `useState` hook from React to create and manage state variables. */
    const [open, setOpen] = useState(false)

    const [items, setItems] = useState<Item[]>([])
    const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null)

    /* The line `const previousActiveElementRef = useRef<HTMLElement | null>(null)` is creating a
    reference object called `previousActiveElementRef` using the `useRef` hook from React. The
    generic type argument `<HTMLElement | null>` specifies the type of the reference object, which
    can either be an `HTMLElement` or `null`. The initial value of the reference object is `null`. */
    const previousActiveElementRef = useRef<HTMLElement | null>(null)

    /* The `registerItem` function is a callback function created using the `useCallback` hook from
    React. It takes in two parameters: `element` of type `HTMLElement | null` and `props` of type `{
    disabled?: boolean }`. */
    const registerItem = useCallback(
        (element: HTMLElement | null, props: { disabled?: boolean }) => {
            setItems((items) => [...items, { element, props }])
        },
        []
    )

    /* The `unregisterItem` function is a callback function created using the `useCallback` hook from
    React. It takes in a parameter `id` of type `string`. */
    const unregisterItem = useCallback((id: string) => {
        setItems((items) => items.filter((item) => item?.element?.id !== id))
    }, [])

    /* The `focusSelf` function is a callback function created using the `useCallback` hook from React.
    It is responsible for focusing on the dropdown menu itself. */
    const focusSelf = useCallback(() => {
        requestAnimationFrame(() => {
            if (document.activeElement !== menuRef.current) {
                previousActiveElementRef.current =
                    document.activeElement as HTMLElement
                menuRef.current?.focus()
            }
        })
    }, [menuRef])

    /* The `focusItem` function is a callback function created using the `useCallback` hook from React.
    It takes in an `item` parameter of type `Item`. */
    const focusItem = useCallback(
        (item: Item) => {
            const itemIndex = items.indexOf(item)
            if (itemIndex !== -1) {
                setActiveItemIndex(itemIndex)
                focusSelf()
            }
        },
        [items, focusSelf]
    )

    /* The `lookupNextActiveItemIndex` function is a callback function created using the `useCallback`
    hook from React. It takes in two parameters: `start` of type `number` and `direction` of type
    `number`. */
    const lookupNextActiveItemIndex = useCallback(
        (start: number, direction: number) => {
            for (let i = start; i > -1 && i < items.length; i += direction) {
                if (!items[i].props?.disabled) {
                    return i
                }
            }
            return null
        },
        [items]
    )

    /* The `focusItemAt` function is a callback function created using the `useCallback` hook from
    React. It takes in an `index` parameter of type `number`. */
    const focusItemAt = useCallback(
        (index: number) => {
            if (isNil(index)) {
                setActiveItemIndex(null)
                focusSelf()
            } else {
                let activeItemIndex
                if (index === 0) {
                    activeItemIndex = lookupNextActiveItemIndex(0, 1)
                } else if (index === -1) {
                    activeItemIndex = lookupNextActiveItemIndex(
                        items.length - 1,
                        -1
                    )
                }

                if (!isNil(activeItemIndex)) {
                    focusItem(items[activeItemIndex])
                }
            }
        },
        [items, focusItem, focusSelf, lookupNextActiveItemIndex]
    )

    /* The `openMenu` constant is a callback function created using the `useCallback` hook from React.
    It is responsible for opening the dropdown menu. */
    const openMenu = useCallback(() => {
        setOpen(true)
        focusSelf()
    }, [focusSelf])

    /* The `closeMenu` constant is a callback function created using the `useCallback` hook from React.
    It is responsible for closing the dropdown menu. */
    const closeMenu = useCallback(() => {
        setOpen(false)
        setActiveItemIndex(null)
        requestAnimationFrame(() => {
            previousActiveElementRef.current?.focus()
        })
    }, [])

    /* The `return` statement is returning an object with several properties. These properties include: */
    return {
        open,
        items,
        activeItemIndex,
        registerItem,
        unregisterItem,
        focusItemAt,
        openMenu,
        closeMenu,
    }
}

export default DropdownMenuContext

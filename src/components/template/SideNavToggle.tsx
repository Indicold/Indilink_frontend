/* These lines of code are importing various modules and functions that are needed in the component. */
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { useAppSelector, useAppDispatch, setSideNavCollapse } from '@/store'
import useResponsive from '@/utils/hooks/useResponsive'
import NavToggle from '@/components/shared/NavToggle'
import type { CommonProps } from '@/@types/common'

/**
 * The `_SideNavToggle` component is a React component that renders a navigation toggle button, which
 * collapses or expands the side navigation menu based on the `sideNavCollapse` state value from the
 * Redux store.
 * @param {CommonProps}  - The above code defines a React functional component called `_SideNavToggle`
 * that takes a single parameter `className` of type `CommonProps`. The `className` parameter is used
 * to apply CSS classes to the component.
 * @returns The code is returning JSX code that will be rendered as HTML by React. Specifically, it is
 * returning a `<div>` element with the specified `className` and `onClick` event handler. Inside the
 * `<div>`, there is a `<NavToggle>` component with the `className` set to "text-2xl" and the `toggled`
 * prop set to the value of `sideNav
 */
const _SideNavToggle = ({ className }: CommonProps) => {
    /* `const sideNavCollapse = useAppSelector((state) => state.theme.layout.sideNavCollapse)` is using
    the `useAppSelector` hook from the Redux Toolkit to select the `sideNavCollapse` value from the
    Redux store. It is accessing the `theme.layout.sideNavCollapse` property from the state object
    in the Redux store. This value is then assigned to the `sideNavCollapse` constant. */
    const sideNavCollapse = useAppSelector(
        (state) => state.theme.layout.sideNavCollapse
    )

    /* `const dispatch = useAppDispatch()` is using the `useAppDispatch` hook from the Redux Toolkit to
    get a reference to the dispatch function. The dispatch function is used to send actions to the
    Redux store, which will then trigger the corresponding reducers to update the state. In this
    code, the dispatch function is later used to dispatch the `setSideNavCollapse` action with the
    updated `sideNavCollapse` value. */
    const dispatch = useAppDispatch()

    /* `const { larger } = useResponsive()` is using the `useResponsive` hook to get the value of the
    `larger` property. The `useResponsive` hook is a custom hook that is used to determine the
    current screen size and responsiveness of the application. The `larger` property represents the
    current screen size and is used to conditionally render certain elements or apply specific
    styles based on the screen size. */
    const { larger } = useResponsive()

    /**
     * The function `onCollapse` toggles the state of `sideNavCollapse` using the `setSideNavCollapse`
     * function from the `dispatch` object.
     */
    const onCollapse = () => {
        dispatch(setSideNavCollapse(!sideNavCollapse))
    }

    /* The `return` statement is returning JSX code that will be rendered as HTML by React. */
    return (
        <>
            {larger.md && (
                <div className={className} onClick={onCollapse}>
                    <NavToggle className="text-2xl" toggled={sideNavCollapse} />
                </div>
            )}
        </>
    )
}

/* The line `const SideNavToggle = withHeaderItem(_SideNavToggle)` is creating a new component called
`SideNavToggle` by wrapping the `_SideNavToggle` component with the `withHeaderItem` higher-order
component (HOC). The `withHeaderItem` HOC is a function that takes a component as an argument and
returns a new component with additional functionality or props. In this case, the `withHeaderItem`
HOC is likely adding some header-related functionality or props to the `_SideNavToggle` component.
The resulting `SideNavToggle` component can then be exported and used in other parts of the
codebase. */
const SideNavToggle = withHeaderItem(_SideNavToggle)

export default SideNavToggle

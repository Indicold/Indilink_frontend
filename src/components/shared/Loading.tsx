/* These lines of code are importing various dependencies and types that are used in the `Loading`
component. */
import Spinner from '@/components/ui/Spinner'
import classNames from 'classnames'
import type { CommonProps } from '@/@types/common'
import type { ElementType, ReactNode } from 'react'

/* The `BaseLoadingProps` interface is defining the props that can be passed to the `Loading`
component. */
interface BaseLoadingProps extends CommonProps {
    asElement?: ElementType
    customLoader?: ReactNode
    loading: boolean
    spinnerClass?: string
}

/* The `interface LoadingProps` extends the `BaseLoadingProps` interface and adds an optional property
`type` which can have a value of either `'default'` or `'cover'`. This allows the `Loading`
component to have different types of loading behavior based on the value of the `type` prop. */
interface LoadingProps extends BaseLoadingProps {
    type?: 'default' | 'cover'
}

/* The `DefaultLoading` function component is responsible for rendering the default loading behavior in
the `Loading` component. It takes in the `BaseLoadingProps` as its parameter. */
const DefaultLoading = (props: BaseLoadingProps) => {
    /* The code is using object destructuring to extract specific properties from the `props` object. */
    const {
        loading,
        children,
        spinnerClass,
        className,
        asElement: Component = 'div',
        customLoader,
    } = props

    return loading ? (
        <Component
            className={classNames(
                !customLoader && 'flex items-center justify-center h-full',
                className
            )}
        >
            {customLoader ? (
                <>{customLoader}</>
            ) : (
                <Spinner className={spinnerClass} size={40} />
            )}
        </Component>
    ) : (
        <>{children}</>
    )
}

/* The `CoveredLoading` function component is responsible for rendering the loading behavior with a
cover overlay in the `Loading` component. It takes in the `BaseLoadingProps` as its parameter. */
const CoveredLoading = (props: BaseLoadingProps) => {
    /* The code is using object destructuring to extract specific properties from the `props` object.
    It is assigning the values of the properties `loading`, `children`, `spinnerClass`, `className`,
    `asElement`, and `customLoader` to separate variables with the same names. */
    const {
        loading,
        children,
        spinnerClass,
        className,
        asElement: Component = 'div',
        customLoader,
    } = props

    return (
        <Component className={classNames(loading ? 'relative' : '', className)}>
            {children}
            {loading && (
                <div className="w-full h-full bg-white dark:bg-gray-800 dark:bg-opacity-60 bg-opacity-50 absolute inset-0" />
            )}
            {loading && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    {customLoader ? (
                        <>{customLoader}</>
                    ) : (
                        <Spinner className={spinnerClass} size={40} />
                    )}
                </div>
            )}
        </Component>
    )
}

/**
 * The function `Loading` is a React component that renders different types of loading indicators based
 * on the `type` prop.
 * @param {LoadingProps}  - The `type` parameter is a string that determines the type of loading
 * component to render. The `rest` parameter is an object that contains any additional props that
 * should be passed to the loading component.
 * @returns a React component based on the value of the `type` prop. If the `type` prop is 'default',
 * it returns the `DefaultLoading` component with the rest of the props passed in. If the `type` prop
 * is 'cover', it returns the `CoveredLoading` component with the rest of the props passed in. If the
 * `type` prop is
 */
const Loading = ({ type, ...rest }: LoadingProps) => {
    switch (type) {
        case 'default':
            return <DefaultLoading {...rest} />
        case 'cover':
            return <CoveredLoading {...rest} />
        default:
            return <DefaultLoading {...rest} />
    }
}

/* `Loading.defaultProps` is an object that defines default values for the props of the `Loading`
component. In this case, it sets the default values for the `loading`, `type`, and `asElement`
props. */
Loading.defaultProps = {
    loading: false,
    type: 'default',
    asElement: 'div',
}

export default Loading

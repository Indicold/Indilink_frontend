/* These lines of code are importing various dependencies and types that are used in the
`FormContainer` component. */
import { FormContextProvider, FormContextConsumer } from './context'
import { useConfig } from '../ConfigProvider'
import classNames from 'classnames'
import { SIZES, LAYOUT } from '../utils/constants'
import type { FormContextProps } from './context'
import type { CommonProps, TypeAttributes } from '../@types/common'

/* The `export interface FormContainerProps extends CommonProps` statement is defining an interface
called `FormContainerProps` that extends the `CommonProps` interface. This means that the
`FormContainerProps` interface will inherit all the properties and types defined in the
`CommonProps` interface. */
export interface FormContainerProps extends CommonProps {
    size?: TypeAttributes.ControlSize
    layout?: TypeAttributes.FormLayout
    labelWidth?: string | number
}

/**
 * The `FormContainer` component is a wrapper that provides a context for form elements and renders its
 * children within a styled container.
 * @param {FormContainerProps} props - The `props` parameter is an object that contains the properties
 * passed to the `FormContainer` component. These properties can include:
 * @returns The code is returning a JSX element that represents the `FormContainer` component.
 */
const FormContainer = (props: FormContainerProps) => {
    /* `const { controlSize } = useConfig()` is using the `useConfig` hook to retrieve the
    `controlSize` value from the configuration context. It is destructuring the `controlSize` value
    from the returned object and assigning it to the `controlSize` variable. */
    const { controlSize } = useConfig()

    /* The code is using object destructuring to extract specific properties from the `props` object. */
    const {
        children,
        className,
        labelWidth = 100,
        layout = LAYOUT.VERTICAL,
        size = SIZES.MD,
    } = props

    /* The code is creating an object called `contextValue` that will be used as the value for the
    `FormContextProvider`. This object contains the properties `labelWidth`, `layout`, and `size`. */
    const contextValue = {
        labelWidth,
        layout,
        size: size || controlSize,
    }

    /* The code is returning a JSX element that represents the `FormContainer` component. */
    return (
        <FormContextProvider value={contextValue as FormContextProps}>
            <FormContextConsumer>
                {(context) => {
                    return (
                        <div
                            className={classNames(
                                'form-container',
                                context?.layout,
                                className
                            )}
                        >
                            {children}
                        </div>
                    )
                }}
            </FormContextConsumer>
        </FormContextProvider>
    )
}

FormContainer.displayName = 'FormContainer'

export default FormContainer

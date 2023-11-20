/* These lines of code are importing various dependencies and types that are used in the `FormItem`
component. */
import { forwardRef } from 'react'
import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from './context'
import { useConfig } from '../ConfigProvider'
import { CONTROL_SIZES, LAYOUT } from '../utils/constants'
import type { CommonProps, TypeAttributes } from '../@types/common'
import type { ReactNode } from 'react'

/* The `export interface FormItemProps` is defining the props that can be passed to the `FormItem`
component. */
export interface FormItemProps extends CommonProps {
    asterisk?: boolean
    errorMessage?: string
    extra?: string | ReactNode
    htmlFor?: string
    invalid?: boolean | ''
    label?: any
    labelClass?: string
    labelWidth?: string | number
    layout?: TypeAttributes.FormLayout
    size?: TypeAttributes.ControlSize
}

const FormItem = forwardRef<HTMLDivElement, FormItemProps>((props, ref) => {
    /* The code is using destructuring assignment to extract the values of the corresponding properties
    from the `props` object. This allows the code to access these properties directly by their names
    instead of using `props.propertyName`. */
    const {
        asterisk,
        children,
        className,
        errorMessage,
        extra,
        htmlFor,
        invalid,
        label,
        labelClass,
        labelWidth,
        layout,
        style,
        size,
    } = props

    /* `const formContext = useForm()` is using the `useForm` hook to access the form context. The
    `useForm` hook is responsible for providing the form context to the `FormItem` component and
    allows it to access properties such as `size`, `labelWidth`, and `layout` from the form context. */
    const formContext = useForm()

    /* `const { controlSize } = useConfig()` is using the `useConfig` hook to access the `controlSize`
    property from the configuration context. The `useConfig` hook is responsible for providing the
    configuration context to the `FormItem` component and allows it to access properties such as
    `controlSize`. By destructuring the `controlSize` property from the returned object, the code
    can directly access the `controlSize` value without using `controlSize` as a property of the
    returned object. */
    const { controlSize } = useConfig()

    const formItemLabelHeight = size || formContext?.size || controlSize
    const formItemLabelWidth = labelWidth || formContext?.labelWidth
    const formItemLayout = layout || formContext?.layout

    /**
     * The function `getFormLabelLayoutClass` returns a CSS class based on the value of
     * `formItemLayout`.
     * @returns The function `getFormLabelLayoutClass` returns a string value based on the value of the
     * `formItemLayout` variable. The possible return values are:
     */
    const getFormLabelLayoutClass = () => {
        switch (formItemLayout) {
            case LAYOUT.HORIZONTAL:
                return label
                    ? `h-${CONTROL_SIZES[formItemLabelHeight]} ${
                          label && 'ltr:pr-2 rtl:pl-2'
                      }`
                    : 'ltr:pr-2 rtl:pl-2'
            case LAYOUT.VERTICAL:
                return `mb-2`
            case LAYOUT.INLINE:
                return `h-${CONTROL_SIZES[formItemLabelHeight]} ${
                    label && 'ltr:pr-2 rtl:pl-2'
                }`
            default:
                break
        }
    }

    /* The `const formItemClass = classNames(...)` line is using the `classNames` function from the
    `classnames` library to generate a string of CSS classes based on the provided arguments. */
    const formItemClass = classNames(
        'form-item',
        formItemLayout,
        className,
        invalid ? 'invalid' : ''
    )

    /* The `const formLabelClass = classNames(...)` line is using the `classNames` function from the
    `classnames` library to generate a string of CSS classes for the `formLabelClass` variable. */
    const formLabelClass = classNames(
        'form-label',
        label && getFormLabelLayoutClass(),
        labelClass
    )

    /**
     * The function `formLabelStyle` returns a style object with a minimum width property based on the
     * value of `formItemLayout`.
     * @returns The function `formLabelStyle` returns an object. If the `formItemLayout` is equal to
     * `LAYOUT.HORIZONTAL`, the returned object will have the properties of `style` and `minWidth` set
     * to the value of `formItemLabelWidth`. If `formItemLayout` is not equal to `LAYOUT.HORIZONTAL`,
     * the returned object will have the properties of `style` only
     */
    const formLabelStyle = () => {
        if (formItemLayout === LAYOUT.HORIZONTAL) {
            return { ...style, ...{ minWidth: formItemLabelWidth } }
        }

        return { ...style }
    }

    const enterStyle = { opacity: 1, marginTop: 3, bottom: -21 }
    const exitStyle = { opacity: 0, marginTop: -10 }
    const initialStyle = exitStyle

    /* The `return` statement is rendering the JSX code that represents the structure and content of
    the `FormItem` component. */
    return (
        <div ref={ref} className={formItemClass}>
            <label
                htmlFor={htmlFor}
                className={formLabelClass}
                style={formLabelStyle()}
            >
                {label}
                {asterisk && (
                    <span className="text-red-500 ltr:mr-1 rtl:ml-1">*</span>
                )}
                {extra && <span>{extra}</span>}
                {label && formItemLayout !== 'vertical' && ''}
            </label>
            <div
                className={
                    formItemLayout === LAYOUT.HORIZONTAL
                        ? 'w-full flex flex-col justify-center relative'
                        : ''
                }
            >
                {children}
                <AnimatePresence mode="wait">
                    {invalid && (
                        <motion.div
                            className="form-explain"
                            initial={initialStyle}
                            animate={enterStyle}
                            exit={exitStyle}
                            transition={{ duration: 0.15, type: 'tween' }}
                        >
                            {errorMessage}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
})

FormItem.displayName = 'FormItem'

export default FormItem

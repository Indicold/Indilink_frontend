/* These lines of code are importing various dependencies and types from different modules and
libraries. */
import { forwardRef, useState, useEffect, useMemo, useRef } from 'react'
import classNames from 'classnames'
import { useConfig } from '../ConfigProvider'
import { useForm } from '../Form/context'
import { useInputGroup } from '../InputGroup/context'
import { CONTROL_SIZES } from '../utils/constants'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import get from 'lodash/get'
import type { CommonProps, TypeAttributes } from '../@types/common'
import type {
    InputHTMLAttributes,
    ElementType,
    ReactNode,
    HTMLInputTypeAttribute,
} from 'react'

/* The `export interface InputProps` defines the props that can be passed to the `Input` component. */
export interface InputProps
    extends CommonProps,
        Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
    asElement?: ElementType
    disabled?: boolean
    invalid?: boolean
    prefix?: string | ReactNode
    size?: TypeAttributes.ControlSize
    suffix?: string | ReactNode
    textArea?: boolean
    type?: HTMLInputTypeAttribute
    unstyle?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form?: any
}

const Input = forwardRef<ElementType | HTMLInputElement, InputProps>(
    (props, ref) => {
        /* This code is using object destructuring to extract specific properties from the `props`
        object passed to the `Input` component. */
        const {
            asElement: Component = 'input',
            className,
            disabled,
            invalid,
            prefix,
            size,
            suffix,
            textArea,
            type = 'text',
            style,
            unstyle = false,
            field,
            form,
            ...rest
        } = props

        /* The code `const [prefixGutter, setPrefixGutter] = useState(0)` and `const [suffixGutter,
        setSuffixGutter] = useState(0)` are using the `useState` hook to declare two state variables
        `prefixGutter` and `suffixGutter` with initial values of 0. */
        const [prefixGutter, setPrefixGutter] = useState(0)
        const [suffixGutter, setSuffixGutter] = useState(0)

        /* The code `const { themeColor, controlSize, primaryColorLevel, direction } = useConfig()` is
        using the `useConfig` hook to access the configuration values from the `ConfigProvider`
        context. It is destructuring the returned object and assigning the values of `themeColor`,
        `controlSize`, `primaryColorLevel`, and `direction` to the corresponding variables. These
        values can be used within the `Input` component for styling or other purposes. */
        const { themeColor, controlSize, primaryColorLevel, direction } =
            useConfig()

        /* The line `const formControlSize = useForm()?.size` is using the `useForm` hook to access the
        size value from the context of the `Form` component. It is assigning the value of `size` to
        the `formControlSize` variable. This allows the `Input` component to inherit the size value
        from the `Form` component if it is not explicitly provided as a prop. */
        const formControlSize = useForm()?.size

        /* The line `const inputGroupSize = useInputGroup()?.size` is using the `useInputGroup` hook to
        access the size value from the context of the `InputGroup` component. It is assigning the
        value of `size` to the `inputGroupSize` variable. This allows the `Input` component to
        inherit the size value from the `InputGroup` component if it is not explicitly provided as a
        prop. */
        const inputGroupSize = useInputGroup()?.size

        /* The line `const inputSize = size || inputGroupSize || formControlSize || controlSize` is
        assigning the value of `size` to the `inputSize` variable. If `size` is falsy (e.g.,
        undefined, null, false), it will check the next value `inputGroupSize`. If `inputGroupSize`
        is also falsy, it will check `formControlSize`, and if that is falsy as well, it will
        finally assign the value of `controlSize` to `inputSize`. */
        const inputSize =
            size || inputGroupSize || formControlSize || controlSize

        /**
         * The function `fixControlledValue` returns an empty string if the input value is undefined or
         * null, otherwise it returns the input value.
         * @param {string | number | readonly string[] | undefined} val - The `val` parameter is a
         * value that can be of type `string`, `number`, `readonly string[]`, or `undefined`.
         * @returns the value `val` if it is not `undefined` or `null`. If `val` is `undefined` or
         * `null`, the function returns an empty string.
         */
        const fixControlledValue = (
            val: string | number | readonly string[] | undefined
        ) => {
            if (typeof val === 'undefined' || val === null) {
                return ''
            }
            return val
        }

        /* This code block is checking if the prop `value` exists in the `props` object passed to the
        `Input` component. If it does, it assigns the value of `props.value` to the `rest.value`
        property and deletes the `defaultValue` property from the `rest` object. */
        if ('value' in props) {
            rest.value = fixControlledValue(props.value)
            delete rest.defaultValue
        }

        /* The `isInvalid` constant is using the `useMemo` hook to memoize the result of a function.
        This function determines whether the input is invalid based on various conditions. */
        const isInvalid = useMemo(() => {
            let validate = false
            if (!isEmpty(form)) {
                const { touched, errors } = form
                const touchedField = get(touched, field.name)
                const errorField = get(errors, field.name)
                validate = touchedField && errorField
            }
            if (typeof invalid === 'boolean') {
                validate = invalid
            }
            return validate
        }, [form, invalid, field])

        const inputDefaultClass = 'input'
        const inputSizeClass = `input-${inputSize} h-${CONTROL_SIZES[inputSize]}`
        const inputFocusClass = `focus:ring-${themeColor}-${primaryColorLevel} focus-within:ring-${themeColor}-${primaryColorLevel} focus-within:border-${themeColor}-${primaryColorLevel} focus:border-${themeColor}-${primaryColorLevel}`
        const inputWrapperClass = `input-wrapper ${
            prefix || suffix ? className : ''
        }`
        /* The `const inputClass = classNames(...)` line is using the `classNames` function from the
        `classnames` library to generate a string of CSS class names based on the provided
        conditions and variables. */
        const inputClass = classNames(
            inputDefaultClass,
            !textArea && inputSizeClass,
            !isInvalid && inputFocusClass,
            !prefix && !suffix ? className : '',
            disabled && 'input-disabled',
            isInvalid && 'input-invalid',
            textArea && 'input-textarea'
        )

        const prefixNode = useRef<HTMLDivElement>(null)
        const suffixNode = useRef<HTMLDivElement>(null)

        /**
         * The function `getAffixSize` calculates the width of the prefix and suffix elements and sets
         * the corresponding gutter values.
         * @returns The function `getAffixSize` returns nothing (`undefined`) if both
         * `prefixNode.current` and `suffixNode.current` are falsy.
         */
        const getAffixSize = () => {
            if (!prefixNode.current && !suffixNode.current) {
                return
            }
            const prefixNodeWidth = prefixNode?.current?.offsetWidth
            const suffixNodeWidth = suffixNode?.current?.offsetWidth

            if (isNil(prefixNodeWidth) && isNil(suffixNodeWidth)) {
                return
            }

            if (prefixNodeWidth) {
                setPrefixGutter(prefixNodeWidth)
            }

            if (suffixNodeWidth) {
                setSuffixGutter(suffixNodeWidth)
            }
        }

        /* The `useEffect` hook is used to perform side effects in functional components. In this case,
        the `useEffect` hook is being used to calculate the width of the prefix and suffix elements
        and set the corresponding gutter values. */
        useEffect(() => {
            getAffixSize()
        }, [prefix, suffix])

        const remToPxConvertion = (pixel: number) => 0.0625 * pixel

        /**
         * The function `affixGutterStyle` calculates and returns the padding styles for a React
         * component based on the direction and presence of prefix and suffix elements.
         * @returns The function `affixGutterStyle` returns an object `gutterStyle` with properties
         * `paddingLeft` and `paddingRight`. The values of these properties depend on the conditions
         * inside the function.
         */
        const affixGutterStyle = () => {
            const leftGutter = `${remToPxConvertion(prefixGutter) + 1}rem`
            const rightGutter = `${remToPxConvertion(suffixGutter) + 1}rem`
            const gutterStyle: {
                paddingLeft?: string
                paddingRight?: string
            } = {}

            if (direction === 'ltr') {
                if (prefix) {
                    gutterStyle.paddingLeft = leftGutter
                }

                if (suffix) {
                    gutterStyle.paddingRight = rightGutter
                }
            }

            if (direction === 'rtl') {
                if (prefix) {
                    gutterStyle.paddingRight = leftGutter
                }

                if (suffix) {
                    gutterStyle.paddingLeft = rightGutter
                }
            }

            return gutterStyle
        }

        /* The `inputProps` constant is an object that contains the props that will be passed to the
        underlying `input` or `textarea` element in the `Input` component. */
        const inputProps = {
            className: !unstyle ? inputClass : '',
            disabled,
            type,
            ref,
            ...field,
            ...rest,
        }

        /* The above code is rendering a textarea element in a TypeScript React component. The textarea
        element is styled using the "style" object and it is given the inputProps as its attributes. */
        const renderTextArea = (
            <textarea style={style} {...inputProps}></textarea>
        )

        /* The above code is rendering an input component in a TypeScript React application. The input
        component is being passed some style props and other input props. */
        const renderInput = (
            <Component
                style={{ ...affixGutterStyle(), ...style }}
                {...inputProps}
            />
        )

        /* The above code is rendering an input element with optional prefix and suffix elements. The
        input element is wrapped in a span element with a specified class. If a prefix element is
        provided, it is rendered before the input element. If a suffix element is provided, it is
        rendered after the input element. */
        const renderAffixInput = (
            <span className={inputWrapperClass}>
                {prefix ? (
                    <div ref={prefixNode} className="input-suffix-start">
                        {' '}
                        {prefix}{' '}
                    </div>
                ) : null}
                {renderInput}
                {suffix ? (
                    <div ref={suffixNode} className="input-suffix-end">
                        {suffix}
                    </div>
                ) : null}
            </span>
        )

        /**
         * The function `renderChildren` returns different render functions based on the conditions of
         * `textArea`, `prefix`, and `suffix`.
         * @returns The function `renderChildren` returns either `renderTextArea`, `renderAffixInput`,
         * or `renderInput` depending on the conditions specified in the code.
         */
        const renderChildren = () => {
            if (textArea) {
                return renderTextArea
            }

            if (prefix || suffix) {
                return renderAffixInput
            } else {
                return renderInput
            }
        }

        return renderChildren()
    }
)

Input.displayName = 'Input'

export default Input

/* The code is importing various dependencies and types from different modules. */
import { useState } from 'react'
import { Input, InputProps } from '@/components/ui/Input'
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'
import type { MouseEvent } from 'react'

/* The `interface PasswordInputProps` is extending the `InputProps` interface, which means it inherits
all the properties and types defined in `InputProps`. Additionally, it adds a new optional property
`onVisibleChange` of type `(visible: boolean) => void`. This property is a callback function that
can be used to handle changes in the visibility of the password input. */
interface PasswordInputProps extends InputProps {
    onVisibleChange?: (visible: boolean) => void
}

/* The code defines a functional component called `PasswordInput`. It takes in a single parameter
`props` of type `PasswordInputProps`, which is an interface extending `InputProps`. */
const PasswordInput = (props: PasswordInputProps) => {
    const { onVisibleChange, ...rest } = props

    const [pwInputType, setPwInputType] = useState('password')

    const onPasswordVisibleClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault()
        const nextValue = pwInputType === 'password' ? 'text' : 'password'
        setPwInputType(nextValue)
        onVisibleChange?.(nextValue === 'text')
    }

    return (
        <Input
            {...rest}
            type={pwInputType}
            suffix={
                <span
                    className="cursor-pointer text-xl"
                    onClick={onPasswordVisibleClick}
                >
                    {pwInputType === 'password' ? (
                        <HiOutlineEyeOff />
                    ) : (
                        <HiOutlineEye />
                    )}
                </span>
            }
        />
    )
}

export default PasswordInput

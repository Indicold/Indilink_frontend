/* The code is importing types and components from the 'react' library and local files. */
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import _InputGroup, { InputGroupProps } from './InputGroup'
import Addon from './Addon'

/* These lines of code are exporting the types `InputGroupProps` from the file './InputGroup' and
`AddonProps` from the file './Addon'. By exporting these types, other files can import and use them
for type checking and type inference. */
export type { InputGroupProps } from './InputGroup'
export type { AddonProps } from './Addon'

type CompoundedComponent = ForwardRefExoticComponent<
    InputGroupProps & RefAttributes<HTMLDivElement>
> & {
    Addon: typeof Addon
}

const InputGroup = _InputGroup as CompoundedComponent

InputGroup.Addon = Addon

export { InputGroup }

export default InputGroup

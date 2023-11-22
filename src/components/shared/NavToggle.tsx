/* The code is importing two icons, `HiOutlineMenuAlt2` and `HiOutlineMenu`, from the `react-icons/hi`
package. These icons are used as components in the `NavToggle` component. */
import { HiOutlineMenuAlt2, HiOutlineMenu } from 'react-icons/hi'
import type { CommonProps } from '@/@types/common'

/* The code is defining an interface called `NavToggleProps` that extends the `CommonProps` interface.
The `NavToggleProps` interface includes an optional property called `toggled` of type `boolean`.
This interface is used to define the props that can be passed to the `NavToggle` component. */
export interface NavToggleProps extends CommonProps {
    toggled?: boolean
}

/**
 * The NavToggle component renders a menu icon or an alternative menu icon based on the value of the
 * "toggled" prop.
 * @param {NavToggleProps}  - - `toggled`: A boolean value indicating whether the navigation is toggled
 * or not.
 * @returns The component is returning a `<div>` element with the specified `className`. Inside the
 * `<div>`, it conditionally renders either the `<HiOutlineMenu />` or `<HiOutlineMenuAlt2 />`
 * component based on the value of the `toggled` prop.
 */
const NavToggle = ({ toggled, className }: NavToggleProps) => {
    return (
        <div className={className}>
            {toggled ? <HiOutlineMenu /> : <HiOutlineMenuAlt2 />}
        </div>
    )
}

export default NavToggle

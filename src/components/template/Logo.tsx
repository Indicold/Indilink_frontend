/* The code is importing various dependencies and assets for the Logo component. */
import classNames from 'classnames'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'
import logo from "../../../public/img/images/logimg.png"

/* The `interface LogoProps` is defining the props that can be passed to the `Logo` component. */
interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
}

const LOGO_SRC_PATH = '/img/logo/'

/**
 * The `Logo` component is a TypeScript React component that renders a logo image with customizable
 * properties.
 * @param {LogoProps} props - The `props` parameter is an object that contains the properties passed to
 * the `Logo` component. These properties are used to customize the appearance and behavior of the
 * logo. The available properties are:
 */
const Logo = (props: LogoProps) => {
    const {
        type = 'full',
        mode = 'light',
        className,
        imgClass,
        style,
        logoWidth = 'auto',
    } = props

    return (
        <div
            className={classNames('logo', className)}
            style={{
                ...style,
                ...{ width: logoWidth },
            }}
        >
            <img
                className={imgClass}
                style={{padding:"20px",width:"150px"}}
                // src={`${LOGO_SRC_PATH}logo-${mode}-${type}.png`}
                alt={`${APP_NAME} logo`}
                src={logo}
            />
        </div>
    )
}

export default Logo

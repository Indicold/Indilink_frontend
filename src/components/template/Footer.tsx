/* The code is importing various modules and constants that are used in the Footer component. */
import classNames from 'classnames'
import Container from '@/components/shared/Container'
import { APP_NAME } from '@/constants/app.constant'
import { PAGE_CONTAINER_GUTTER_X } from '@/constants/theme.constant'

export type FooterPageContainerType = 'gutterless' | 'contained'

/**
 * The type `FooterProps` is a TypeScript type for the props of a React component called `Footer`,
 * which includes a property `pageContainerType` of type `FooterPageContainerType`.
 * @property {FooterPageContainerType} pageContainerType - The `pageContainerType` property is a type
 * that represents the type of container the footer is being used in.
 */
type FooterProps = {
    pageContainerType: FooterPageContainerType
}

/**
 * The `FooterContent` function returns a JSX element representing the footer content of a website,
 * including copyright information and links to terms and conditions and privacy policy.
 * @returns The FooterContent component is returning a JSX element.
 */
const FooterContent = () => {
    return (
        <div className="flex items-center justify-between flex-auto w-full">
            {/* <span>
                Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                <span className="font-semibold">{`${APP_NAME}`}</span> All
                rights reserved.
            </span>
            <div className="">
                <a
                    className="text-gray"
                    href="/#"
                    onClick={(e) => e.preventDefault()}
                >
                    Term & Conditions
                </a>
                <span className="mx-2 text-muted"> | </span>
                <a
                    className="text-gray"
                    href="/#"
                    onClick={(e) => e.preventDefault()}
                >
                    Privacy & Policy
                </a>
            </div> */}
        </div>
    )
}

/**
 * The above function is a TypeScript React component that renders a footer with optional page
 * container styling.
 * @param {FooterProps}  - 1. `pageContainerType`: This parameter is optional and has a default value
 * of `'contained'`. It determines the type of container to be used for the footer content. If set to
 * `'contained'`, the footer content will be wrapped inside a `Container` component. If set to any
 * other
 */
export default function Footer({
    pageContainerType = 'contained',
}: FooterProps) {
    return (
        <footer
            className={classNames(
                `footer flex flex-auto items-center h-16 ${PAGE_CONTAINER_GUTTER_X}`
            )}
        >
            {pageContainerType === 'contained' ? (
                <Container>
                    <FooterContent />
                </Container>
            ) : (
                <FooterContent />
            )}
        </footer>
    )
}

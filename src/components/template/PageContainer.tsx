/* The code is importing various dependencies and types for the PageContainer component. */
import { Suspense } from 'react'
import classNames from 'classnames'
import Container from '@/components/shared/Container'
import {
    PAGE_CONTAINER_GUTTER_X,
    PAGE_CONTAINER_GUTTER_Y,
} from '@/constants/theme.constant'
import Footer from '@/components/template/Footer'
import type { CommonProps } from '@/@types/common'
import type { Meta } from '@/@types/routes'
import type { ElementType, ComponentPropsWithRef } from 'react'
import type { FooterPageContainerType } from '@/components/template/Footer'

/* The `export interface PageContainerProps extends CommonProps, Meta` statement is defining the props
interface for the `PageContainer` component. It extends the `CommonProps` and `Meta` interfaces,
which are likely defined elsewhere in the codebase. Additionally, it adds an optional prop
`contained` of type boolean. */
export interface PageContainerProps extends CommonProps, Meta {
    contained?: boolean
}

/**
 * The function `CustomHeader` is a TypeScript React component that renders a custom header component
 * based on the provided `header` prop.
 * @param  - The `CustomHeader` function is a React component that takes in a `header` prop and other
 * props of type `T`. The `header` prop is expected to be a React element type (`ElementType`), and the
 * other props are expected to be the props that can be passed to the `
 */
const CustomHeader = <T extends ElementType>({
    header,
    ...props
}: {
    header: T
} & ComponentPropsWithRef<T>) => {
    const Header = header
    return <Header {...props} />
}

/* The code defines a functional component called `PageContainer` that takes in a single prop `props`
of type `PageContainerProps`. */
const PageContainer = (props: PageContainerProps) => {
    /* The code is using object destructuring to extract specific properties from the `props` object
    passed to the `PageContainer` component. */
    const {
        pageContainerType = 'default',
        children,
        header,
        contained = false,
        extraHeader,
        footer = true,
    } = props

    /* The `return` statement in the code is rendering the JSX elements that make up the
    `PageContainer` component. */
    return (
        <div className="h-full flex flex-auto flex-col justify-between">
            <main className="h-full">
                <div
                    className={classNames(
                        'page-container relative h-full flex flex-auto flex-col',
                        pageContainerType !== 'gutterless' &&
                            `${PAGE_CONTAINER_GUTTER_X} ${PAGE_CONTAINER_GUTTER_Y}`,
                        pageContainerType === 'contained' && 'container mx-auto'
                    )}
                >
                    {(header || extraHeader) && (
                        <div
                            className={classNames(
                                contained && 'container mx-auto',
                                'flex items-center justify-between mb-4'
                            )}
                        >
                            <div>
                                {header && typeof header === 'string' && (
                                    <h3>{header}</h3>
                                )}
                                <Suspense fallback={<div></div>}>
                                    {header && typeof header !== 'string' && (
                                        <CustomHeader header={header} />
                                    )}
                                </Suspense>
                            </div>
                            <Suspense fallback={<div></div>}>
                                {extraHeader &&
                                    typeof extraHeader !== 'string' && (
                                        <CustomHeader header={extraHeader} />
                                    )}
                            </Suspense>
                        </div>
                    )}
                    {pageContainerType === 'contained' ? (
                        <Container className="h-full">
                            <>{children}</>
                        </Container>
                    ) : (
                        <>{children}</>
                    )}
                </div>
            </main>
            {footer && (
                <Footer
                    pageContainerType={
                        pageContainerType as FooterPageContainerType
                    }
                />
            )}
        </div>
    )
}

export default PageContainer

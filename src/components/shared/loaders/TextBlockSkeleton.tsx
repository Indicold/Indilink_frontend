/* The code is importing the `Skeleton` component and `SkeletonProps` type from the
`@/components/ui/Skeleton` module. The `Skeleton` component is likely a UI component used for
displaying a loading skeleton or placeholder while content is being loaded. The `SkeletonProps` type
is used to define the props that can be passed to the `Skeleton` component. */
import Skeleton from '@/components/ui/Skeleton'
import type { SkeletonProps } from '@/components/ui/Skeleton'

/* The `interface TextBlockSkeletonProps` is extending the `SkeletonProps` interface, which means it
inherits all the properties and types defined in `SkeletonProps`. Additionally, it introduces some
new optional properties specific to the `TextBlockSkeleton` component: */
interface TextBlockSkeletonProps extends SkeletonProps {
    rowCount?: number
    lastChildWidth?: string | number
    height?: string | number
    titleWidth?: string | number
    title?: boolean
}

/* The `const TextBlockSkeleton` is a functional component that takes in a single parameter `props` of
type `TextBlockSkeletonProps`. It renders a block of text skeletons, which are placeholder elements
used to indicate that content is being loaded. */
const TextBlockSkeleton = (props: TextBlockSkeletonProps) => {
    /* The code is using object destructuring to extract the properties `height`, `lastChildWidth`,
    `rowCount`, `title`, and `titleWidth` from the `props` object. If these properties are present
    in the `props` object, their values will be assigned to the corresponding variables. If any of
    these properties are not present in the `props` object, default values will be used instead. */
    const {
        height,
        lastChildWidth = '60%',
        rowCount = 3,
        title = true,
        titleWidth = '40%',
    } = props

    return (
        <div className="flex flex-col gap-4">
            {title && (
                <Skeleton className="mb-1" height={height} width={titleWidth} />
            )}
            {Array.from(new Array(rowCount), (_, i) => i + 1).map(
                (row, index) => (
                    <Skeleton
                        key={row}
                        height={height}
                        width={
                            index === rowCount - 1 ? lastChildWidth : undefined
                        }
                    />
                )
            )}
        </div>
    )
}

export default TextBlockSkeleton

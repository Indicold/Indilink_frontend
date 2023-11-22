/* The code is importing the `Skeleton` and `Table` components from the `@/components/ui` directory. It
is also importing the `SkeletonProps` type from the `Skeleton` component. These imports allow the
code to use the `Skeleton` and `Table` components and access the `SkeletonProps` type in the current
file. */
import Skeleton from '@/components/ui/Skeleton'
import Table from '@/components/ui/Table'
import type { SkeletonProps } from '@/components/ui/Skeleton'

/**
 * The TableRowSkeletonProps type is used to define the props for a skeleton component that represents
 * a table row.
 * @property {number} columns - The number of columns in the table row skeleton.
 * @property {number} rows - The "rows" property specifies the number of rows to be rendered in the
 * table row skeleton component.
 * @property {number[]} avatarInColumns - The `avatarInColumns` property is an optional array that
 * specifies the columns in which avatars should be displayed in the table row skeleton. Each element
 * in the array represents a column index where an avatar should be displayed. For example, if
 * `avatarInColumns` is set to `[0,
 * @property {SkeletonProps} avatarProps - The `avatarProps` property is an optional prop that allows
 * you to customize the appearance of the skeleton avatar component within the table row skeleton. It
 * accepts a `SkeletonProps` object, which likely contains properties such as `variant`, `animation`,
 * `width`, `height`, etc. These properties can
 */
type TableRowSkeletonProps = {
    columns?: number
    rows?: number
    avatarInColumns?: number[]
    avatarProps?: SkeletonProps
}

/* `const { Tr, Td, TBody } = Table` is using object destructuring to extract the `Tr`, `Td`, and
`TBody` components from the `Table` component. This allows the code to use these components directly
without having to reference them through the `Table` component. */
const { Tr, Td, TBody } = Table

/* The `const TableRowSkeleton` is a functional component that renders a skeleton representation of a
table row. It takes in `props` of type `TableRowSkeletonProps`, which includes properties such as
`columns`, `rows`, `avatarInColumns`, and `avatarProps`. */
const TableRowSkeleton = (props: TableRowSkeletonProps) => {
    const { columns = 1, rows = 10, avatarInColumns = [], avatarProps } = props

    return (
        <TBody>
            {Array.from(new Array(rows), (_, i) => i + 0).map((row) => (
                <Tr key={`row-${row}`}>
                    {Array.from(new Array(columns), (_, i) => i + 0).map(
                        (col) => (
                            <Td key={`col-${col}`}>
                                <div className="flex flex-auto items-center gap-2">
                                    {avatarInColumns.includes(col) && (
                                        <div>
                                            <Skeleton
                                                variant="circle"
                                                {...avatarProps}
                                            />
                                        </div>
                                    )}
                                    <Skeleton />
                                </div>
                            </Td>
                        )
                    )}
                </Tr>
            ))}
        </TBody>
    )
}

export default TableRowSkeleton

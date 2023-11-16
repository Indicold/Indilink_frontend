/* The code is importing the `Skeleton` component from the `@/components/ui/Skeleton` file and also
importing the `SkeletonProps` type from the same file. This allows the code to use the `Skeleton`
component and specify the props that can be passed to it. */
import Skeleton from '@/components/ui/Skeleton'
import type { SkeletonProps } from '@/components/ui/Skeleton'

/**
 * The MediaSkeletonProps type is used in TypeScript React to define the props for a media skeleton
 * component, including options for showing an avatar and customizing the skeleton props for the
 * avatar, title, and text.
 * @property {boolean} showAvatar - A boolean value indicating whether to show the avatar or not. If
 * set to true, the avatar will be displayed. If set to false or not provided, the avatar will be
 * hidden.
 * @property {SkeletonProps} avatarProps - The `avatarProps` property is an optional object that
 * represents the props for the avatar skeleton component. These props can be used to customize the
 * appearance and behavior of the avatar skeleton.
 * @property {SkeletonProps} titleProps - An object that contains props for the skeleton component used
 * for the title of the media.
 * @property {SkeletonProps} textProps - The `textProps` property is an optional prop that can be
 * passed to customize the appearance of the skeleton for the text content in the media component. It
 * is of type `SkeletonProps`, which likely includes properties such as `variant`, `animation`,
 * `width`, `height`, etc.
 */
type MediaSkeletonProps = {
    showAvatar?: boolean
    avatarProps?: SkeletonProps
    titleProps?: SkeletonProps
    textProps?: SkeletonProps
}

/* The `const MediaSkeleton` is a functional component in TypeScript React. It takes in a single
parameter `props` of type `MediaSkeletonProps`, which represents the props passed to the component. */
const MediaSkeleton = (props: MediaSkeletonProps) => {
    const { showAvatar = true, avatarProps, titleProps, textProps } = props

    return (
        <div className="flex flex-auto items-center gap-2">
            {showAvatar && (
                <div>
                    <Skeleton variant="circle" {...avatarProps} />
                </div>
            )}
            <div className="flex flex-col gap-4 w-full">
                <Skeleton width="40%" {...titleProps} />
                <Skeleton width="20%" {...textProps} />
            </div>
        </div>
    )
}

export default MediaSkeleton

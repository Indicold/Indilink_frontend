/* The code is importing various modules and functions from different files and libraries. */
import Side from './Side'
import View from '@/views'
import { useAppSelector } from '@/store'
import { LAYOUT_TYPE_BLANK } from '@/constants/theme.constant'

const AuthLayout = () => {
    /* `const layoutType = useAppSelector((state) => state.theme.layout.type)` is using the
    `useAppSelector` hook to retrieve the `layout.type` value from the `theme` slice of the
    application state. It is assigning this value to the `layoutType` constant. */
    const layoutType = useAppSelector((state) => state.theme.layout.type)

    /* The `return` statement is returning JSX code that will be rendered as HTML by React. */
    return (
        <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
            {layoutType === LAYOUT_TYPE_BLANK ? (
                <View />
            ) : (
                <Side>
                    <View />
                </Side>
            )}
        </div>
    )
}

export default AuthLayout // For using AuthLayout component in other files

/* The code is importing various modules and types from different files: */
import ConfigProvider from '@/components/ui/ConfigProvider'
import type { CommonProps } from '@/@types/common'
import { themeConfig } from '@/configs/theme.config'
import { useAppSelector } from '@/store'

/**
 * The `Theme` component retrieves the current theme and locale from the Redux store and creates a new
 * object by merging them with the `themeConfig` object, which is then passed as a value to the
 * `ConfigProvider` component.
 * @param {CommonProps} props - The `props` parameter is of type `CommonProps`. It is an object that
 * contains any additional props that are passed to the `Theme` component. These props can be accessed
 * using dot notation, for example `props.someProp`. The `props` object is then passed as a parameter
 * to the
 * @returns The `Theme` component is returning the `props.children` wrapped in a `ConfigProvider`
 * component with the `currentTheme` object passed as the `value` prop.
 */
const Theme = (props: CommonProps) => {
    /* `const theme = useAppSelector((state) => state.theme)` is using the `useAppSelector` hook to
    select the `theme` state from the Redux store. It retrieves the current value of the `theme`
    state from the Redux store. */
    const theme = useAppSelector((state) => state.theme)
    const locale = useAppSelector((state) => state.locale.currentLang)

    /* The code is creating a new object called `currentTheme` by merging the properties of three
    objects: `themeConfig`, `theme`, and `{ locale }`. */
    const currentTheme = {
        ...themeConfig,
        ...theme,
        ...{ locale },
    }

    return (
        <ConfigProvider value={currentTheme}>{props.children}</ConfigProvider>
    )
}

export default Theme

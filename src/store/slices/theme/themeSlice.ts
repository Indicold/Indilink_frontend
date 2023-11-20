/* The code is importing various modules and constants that are needed for the theme slice in Redux. */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { themeConfig } from '@/configs/theme.config'
import {
    LAYOUT_TYPE_CLASSIC,
    NAV_MODE_TRANSPARENT,
    NAV_MODE_LIGHT,
    NAV_MODE_DARK,
    NAV_MODE_THEMED,
    MODE_DARK,
    MODE_LIGHT,
} from '@/constants/theme.constant'
import type {
    LayoutType,
    Mode,
    NavMode,
    ColorLevel,
    Direction,
} from '@/@types/theme'

/**
 * The above type represents the state of a theme in a TypeScript application, including various
 * properties such as theme color, direction, mode, color level, panel expand status, navigation mode,
 * card border status, and layout type.
 * @property {string} themeColor - A string representing the color theme of the application.
 * @property {Direction} direction - The direction property represents the direction of the theme, such
 * as "ltr" (left-to-right) or "rtl" (right-to-left).
 * @property {Mode} mode - The `mode` property represents the current mode of the theme. It can have
 * values like "light" or "dark" to indicate the light or dark mode respectively.
 * @property {ColorLevel} primaryColorLevel - The primaryColorLevel property represents the level of
 * intensity or brightness of the primary color used in the theme. It can be used to control the shade
 * or tone of the primary color in the theme.
 * @property {boolean} panelExpand - The `panelExpand` property is a boolean value that determines
 * whether a panel or section in the user interface is expanded or collapsed.
 * @property {NavMode} navMode - The `navMode` property represents the navigation mode of the theme. It
 * can have different values such as "vertical", "horizontal", or "collapsed".
 * @property {boolean} cardBordered - A boolean value indicating whether cards should have borders or
 * not.
 * @property layout - The `layout` property is an object that contains information about the layout of
 * the application. It has the following properties:
 */
export type ThemeState = {
    themeColor: string
    direction: Direction
    mode: Mode
    primaryColorLevel: ColorLevel
    panelExpand: boolean
    navMode: NavMode
    cardBordered: boolean
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
        previousType?: LayoutType
    }
}

/* The `initialState` constant is defining the initial state of the theme slice in Redux. It is an
object of type `ThemeState` that contains various properties representing different aspects of the
theme. The values of these properties are being set based on the corresponding values in the
`themeConfig` object. This allows the initial state of the theme slice to be populated with the
default values specified in the `themeConfig` object. */
const initialState: ThemeState = {
    themeColor: themeConfig.themeColor,
    direction: themeConfig.direction,
    mode: themeConfig.mode,
    primaryColorLevel: themeConfig.primaryColorLevel,
    panelExpand: themeConfig.panelExpand,
    cardBordered: themeConfig.cardBordered,
    navMode: themeConfig.navMode,
    layout: themeConfig.layout,
}

/* The `const availableNavColorLayouts` is an array that contains the available navigation color
layouts. In this case, it only contains one value, `LAYOUT_TYPE_CLASSIC`. This array is used to
check if a specific layout type supports changing the navigation color. If the current layout type
is included in this array, it means that the navigation color can be changed. */
const availableNavColorLayouts = [
    LAYOUT_TYPE_CLASSIC,
]

/* The code is creating a Redux slice called `themeSlice` using the `createSlice` function from the
`@reduxjs/toolkit` library. */
export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDirection: (state, action: PayloadAction<Direction>) => {
            state.direction = action.payload
        },
        setMode: (state, action: PayloadAction<Mode>) => {
            const availableColorNav = availableNavColorLayouts.includes(
                state.layout.type
            )

            if (
                availableColorNav &&
                action.payload === MODE_DARK &&
                state.navMode !== NAV_MODE_THEMED
            ) {
                state.navMode = NAV_MODE_DARK
            }
            if (
                availableColorNav &&
                action.payload === MODE_LIGHT &&
                state.navMode !== NAV_MODE_THEMED
            ) {
                state.navMode = NAV_MODE_LIGHT
            }
            state.mode = action.payload
        },
        setLayout: (state, action: PayloadAction<LayoutType>) => {

            const availableColorNav = availableNavColorLayouts.includes(
                action.payload
            )

            if (availableColorNav && state.mode === MODE_LIGHT) {
                state.navMode = NAV_MODE_LIGHT
            }

            if (availableColorNav && state.mode === MODE_DARK) {
                state.navMode = NAV_MODE_DARK
            }

            state.layout = {
                ...state.layout,
                ...{ type: action.payload },
            }
        },
        setPreviousLayout: (state, action) => {
            state.layout.previousType = action.payload
        },
        setSideNavCollapse: (state, action) => {
            state.layout = {
                ...state.layout,
                ...{ sideNavCollapse: action.payload },
            }
        },
        setNavMode: (state, action: PayloadAction<NavMode | 'default'>) => {
            if (action.payload !== 'default') {
                state.navMode = action.payload
            } else {

                const availableColorNav = availableNavColorLayouts.includes(
                    state.layout.type
                )

                if (availableColorNav && state.mode === MODE_LIGHT) {
                    state.navMode = NAV_MODE_LIGHT
                }

                if (availableColorNav && state.mode === MODE_DARK) {
                    state.navMode = NAV_MODE_DARK
                }
            }
        },
        setPanelExpand: (state, action: PayloadAction<boolean>) => {
            state.panelExpand = action.payload
        },
        setThemeColor: (state, action: PayloadAction<string>) => {
            state.themeColor = action.payload
        },
        setThemeColorLevel: (state, action) => {
            state.primaryColorLevel = action.payload
        },
    },
})

/* The code is exporting individual action creators from the `themeSlice.actions` object. These action
creators can be used to dispatch actions to update the state of the theme slice in Redux. By
exporting them individually, other parts of the application can import and use these action creators
directly without having to import the entire `themeSlice.actions` object. */
export const {
    setDirection,
    setMode,
    setLayout,
    setSideNavCollapse,
    setNavMode,
    setPanelExpand,
    setThemeColor,
    setThemeColorLevel,
    setPreviousLayout,
} = themeSlice.actions

/* `export default themeSlice.reducer` is exporting the reducer function from the `themeSlice` slice.
This allows other parts of the application to import and use the reducer function to handle actions
related to the theme slice in Redux. */
export default themeSlice.reducer

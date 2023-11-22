/**
 * The above type represents the configuration options for a theme in a TypeScript application.
 * @property {string} themeColor - The color scheme used for the theme.
 * @property {Direction} direction - The direction property determines the layout direction of the
 * theme. It can have two possible values: "ltr" for left-to-right direction and "rtl" for
 * right-to-left direction.
 * @property {Mode} mode - The mode property represents the mode of the theme. It can have values like
 * "light" or "dark" to indicate whether the theme is in light mode or dark mode.
 * @property {ColorLevel} primaryColorLevel - It represents the level of color intensity for the
 * primary color in the theme.
 * @property {boolean} panelExpand - The `panelExpand` property is a boolean value that determines
 * whether a panel or section in the UI should be expanded or collapsed.
 * @property {NavMode} navMode - The `navMode` property represents the navigation mode of the theme. It
 * can have values like "vertical", "horizontal", or "collapsed".
 * @property {ControlSize} controlSize - The `controlSize` property represents the size of the controls
 * in the theme. It can have values like "small", "medium", or "large" to determine the size of
 * buttons, inputs, and other controls in the theme.
 * @property {boolean} cardBordered - A boolean value indicating whether the cards should have borders
 * or not.
 * @property layout - The `layout` property is an object that contains two properties:
 */
import { THEME_ENUM } from '@/constants/theme.constant'
import {
    Direction,
    Mode,
    ColorLevel,
    NavMode,
    ControlSize,
    LayoutType,
} from '@/@types/theme'

export type ThemeConfig = {
    themeColor: string
    direction: Direction
    mode: Mode
    primaryColorLevel: ColorLevel
    panelExpand: boolean
    navMode: NavMode
    controlSize: ControlSize
    cardBordered: boolean
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
    }
}

/**
 * Since some configurations need to be match with specific themes,
 * we recommend to use the configuration that generated from demo.
 */
export const themeConfig: ThemeConfig = {
    themeColor: 'indigo',
    direction: THEME_ENUM.DIR_LTR,
    mode: THEME_ENUM.MODE_LIGHT,
    primaryColorLevel: 600,
    cardBordered: true,
    panelExpand: false,
    controlSize: 'md',
    navMode: THEME_ENUM.NAV_MODE_LIGHT,
    layout: {
        type: THEME_ENUM.LAYOUT_TYPE_CLASSIC,
        sideNavCollapse: false,
    },
}

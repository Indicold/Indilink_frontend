/* These lines of code are importing various modules, components, constants, and hooks that are used in
the SideNav component. Here is a breakdown of each import statement: */
import classNames from 'classnames'
import ScrollBar from '@/components/ui/ScrollBar'
import {
    SIDE_NAV_WIDTH,
    SIDE_NAV_COLLAPSED_WIDTH,
    NAV_MODE_DARK,
    NAV_MODE_THEMED,
    NAV_MODE_TRANSPARENT,
    SIDE_NAV_CONTENT_GUTTER,
    LOGO_X_GUTTER,
} from '@/constants/theme.constant'
import Logo from '@/components/template/Logo'
import navigationConfig from '@/configs/navigation.config'
import VerticalMenuContent from '@/components/template/VerticalMenuContent'
import useResponsive from '@/utils/hooks/useResponsive'
import { useAppSelector } from '@/store'
import navigationPartnerConfig from '@/configs/navigationPartner.config'
import navigationInvestorConfig from '@/configs/navigationInvestor.config'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/* The `sideNavStyle` constant is an object that defines the width and minimum width of the SideNav
component. It sets the width to the value of the `SIDE_NAV_WIDTH` constant, which is imported from
the `theme.constant` module. It also sets the minimum width to the same value. This ensures that the
SideNav component has a fixed width and cannot be resized smaller than the specified width. */
const sideNavStyle = {
    width: SIDE_NAV_WIDTH,
    minWidth: SIDE_NAV_WIDTH,
}

/* The `sideNavCollapseStyle` constant is an object that defines the width and minimum width of the
SideNav component when it is in a collapsed state. It sets the width to the value of the
`SIDE_NAV_COLLAPSED_WIDTH` constant, which is imported from the `theme.constant` module. It also
sets the minimum width to the same value. This ensures that the SideNav component has a fixed width
when it is collapsed and cannot be resized smaller than the specified width. */
const sideNavCollapseStyle = {
    width: SIDE_NAV_COLLAPSED_WIDTH,
    minWidth: SIDE_NAV_COLLAPSED_WIDTH,
}

const SideNav = () => {
    /* These lines of code are using the `useAppSelector` hook from the Redux toolkit to select
    specific pieces of state from the Redux store. */
    const themeColor = useAppSelector((state) => state.theme.themeColor)
    const primaryColorLevel = useAppSelector(
        (state) => state.theme.primaryColorLevel
    )
    const navMode = useAppSelector((state) => state.theme.navMode)
    const mode = useAppSelector((state) => state.theme.mode)
    const direction = useAppSelector((state) => state.theme.direction)
    const currentRouteKey = useAppSelector(
        (state) => state.base.common.currentRouteKey
    )
    const sideNavCollapse = useAppSelector(
        (state) => state.theme.layout.sideNavCollapse
    )
    const userAuthority = useAppSelector(
        (state: any) => state?.auth?.user?.authority
    )

    /* The line `const { larger } = useResponsive()` is using the `useResponsive` hook to get the value
    of the `larger` property. The `useResponsive` hook is a custom hook that is used to determine
    the current screen size and responsiveness of the application. The `larger` property represents
    whether the current screen size is larger than the specified breakpoint (in this case, the `md`
    breakpoint). By destructuring `larger` from the return value of the `useResponsive` hook, the
    code can directly access the value of `larger` without having to reference the entire return
    value. */
    const { larger } = useResponsive()

    /**
     * The function `sideNavColor` returns a string that represents the color of a side navigation bar
     * based on the current navigation mode and theme color.
     * @returns The function `sideNavColor` returns a string value.
     */
    const sideNavColor = () => {
        if (navMode === NAV_MODE_THEMED) {
            return `bg-${themeColor}-${primaryColorLevel} side-nav-${navMode}`
        }
        return `side-nav-${navMode}`
    }

    /**
     * The function `logoMode` returns the appropriate navigation mode based on the current navigation
     * mode.
     * @returns The function `logoMode` returns the value of `navMode`.
     */
    const logoMode = () => {
        if (navMode === NAV_MODE_THEMED) {
            return NAV_MODE_DARK
        }

        if (navMode === NAV_MODE_TRANSPARENT) {
            return mode
        }

        return navMode
    }

    let val = ''
    const location = useLocation()
    const navigate = useNavigate()
    /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
`useEffect` hook is being used to retrieve the value of the `user_type` key from the `localStorage`
object and store it in the `val` variable. */
    useEffect(() => {
        let val = localStorage.getItem('user_type')

        if (val === 'Customer') {
            val = val
        }
        if (val == 'Partner') {
            val = val
        }
        if (val == 'Investor') {
            val = val
        }
        if (val == 'Partner' && location?.pathname === '/home') {
            navigate('/partner-dashbord')
        }
        if (val == 'Customer' && location?.pathname === '/partner-dashbord') {
            navigate('/home')
        }
    }, [])

    /* The `menuContent` constant is a JSX element that represents the content of the side navigation
    menu. It is a component called `VerticalMenuContent` that takes in several props: */
    const menuContent = (
        <VerticalMenuContent
            navMode={navMode}
            collapsed={sideNavCollapse}
            navigationTree={
                localStorage.getItem('user_type') === 'Partner'
                    ? navigationPartnerConfig
                    : localStorage.getItem('user_type') === 'Investor'
                    ? navigationInvestorConfig
                    : navigationConfig
            }
            routeKey={currentRouteKey}
            userAuthority={userAuthority as string[]}
            direction={direction}
        />
    )

    /* The `return` statement in the code is returning a JSX element. */
    return (
        <>
            {larger.md && (
                <div
                    style={
                        sideNavCollapse ? sideNavCollapseStyle : sideNavStyle
                    }
                    className={classNames(
                        'side-nav',
                        sideNavColor(),
                        !sideNavCollapse && 'side-nav-expand'
                    )}
                >
                    <div className="side-nav-header">
                        <Logo
                            mode={logoMode()}
                            type={sideNavCollapse ? 'streamline' : 'full'}
                            className={
                                sideNavCollapse
                                    ? SIDE_NAV_CONTENT_GUTTER
                                    : LOGO_X_GUTTER
                            }
                        />
                    </div>
                    {sideNavCollapse ? (
                        menuContent
                    ) : (
                        <div className="side-nav-content">
                            <ScrollBar autoHide direction={direction}>
                                {menuContent}
                            </ScrollBar>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default SideNav

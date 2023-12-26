/* The code is importing various modules and components from different files and libraries. Here is a
breakdown of what each import statement is doing: */
import { useState, Suspense, lazy } from 'react'
import classNames from 'classnames'
import Drawer from '@/components/ui/Drawer'
import {
    NAV_MODE_THEMED,
    NAV_MODE_TRANSPARENT,
    DIR_RTL,
} from '@/constants/theme.constant'
import withHeaderItem, { WithHeaderItemProps } from '@/utils/hoc/withHeaderItem'
import NavToggle from '@/components/shared/NavToggle'
import navigationConfig from '@/configs/navigation.config'
import useResponsive from '@/utils/hooks/useResponsive'
import { useAppSelector } from '@/store'
import navigationInvestorConfig from '@/configs/navigationInvestor.config'
import navigationPartnerConfig from '@/configs/navigationPartner.config'
import { TokenInfo } from '@/store/customeHook/token'

/* The code is using the `lazy` function from React to dynamically import the `VerticalMenuContent`
component from the file located at `@/components/template/VerticalMenuContent`. */
const VerticalMenuContent = lazy(
    () => import('@/components/template/VerticalMenuContent')
)

/**
 * The MobileNavToggleProps type is used in TypeScript React to define the props for a mobile
 * navigation toggle component.
 * @property {boolean} toggled - A boolean value that indicates whether the mobile navigation toggle is
 * currently toggled or not.
 */
type MobileNavToggleProps = {
    toggled?: boolean
}

/* The code is creating a new component called `MobileNavToggle` by using the `withHeaderItem`
higher-order component (HOC) on the `NavToggle` component. */
const MobileNavToggle = withHeaderItem<
    MobileNavToggleProps & WithHeaderItemProps
>(NavToggle)

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false)
const {default_user_type}:any=TokenInfo()
    // Function to open drawer
    const openDrawer = () => {
        setIsOpen(true)
    }

    // Function to close drawer
    const onDrawerClose = () => {
        setIsOpen(false)
    }

    /* These lines of code are using the `useAppSelector` hook to access specific values from the Redux
    store. */
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
    const userAuthority = useAppSelector((state) => state.auth.user.authority)

    /* The line `const { smaller } = useResponsive()` is using the `useResponsive` hook to access the
    `smaller` property from the returned object. The `useResponsive` hook is a custom hook that
    provides information about the current screen size and responsiveness of the application. The
    `smaller` property represents whether the current screen size is smaller than the specified
    breakpoint (in this case, the breakpoint is `md`, which stands for medium). By destructuring the
    `smaller` property from the returned object, the code can directly access the value of `smaller`
    without having to reference the object itself. */
    const { smaller } = useResponsive()

    /**
     * The function `navColor` returns a string based on the value of `navMode` and `themeColor`.
     * @returns The function `navColor` returns a string value. The specific string that is returned
     * depends on the value of the `navMode` variable. If `navMode` is equal to `NAV_MODE_THEMED`, the
     * returned string will be in the format `bg--
     * side-nav-`. If `navMode` is equal to `NAV_MODE_TRAN
     */
    const navColor = () => {
        if (navMode === NAV_MODE_THEMED) {
            return `bg-${themeColor}-${primaryColorLevel} side-nav-${navMode}`
        }

        if (navMode === NAV_MODE_TRANSPARENT) {
            return `side-nav-${mode}`
        }

        return `side-nav-${navMode}`
    }

    /* The `return` statement is rendering JSX code that represents the mobile navigation component. */
    return (
        <>
            {smaller.md && (
                <>
                    <div className="text-2xl" onClick={openDrawer}>
                        <MobileNavToggle toggled={isOpen} />
                    </div>
                    <Drawer
                        title="Navigation"
                        isOpen={isOpen}
                        bodyClass={classNames(navColor(), 'p-0')}
                        width={330}
                        placement={direction === DIR_RTL ? 'right' : 'left'}
                        onClose={onDrawerClose}
                        onRequestClose={onDrawerClose}
                    >
                        <Suspense fallback={<></>}>
                            {isOpen && (
                                <VerticalMenuContent
                                    navMode={navMode}
                                    collapsed={sideNavCollapse}
                                    navigationTree={localStorage.getItem('user_type')==='Partner' ? navigationPartnerConfig: localStorage.getItem('user_type')==='Investor' ? navigationInvestorConfig : navigationConfig }
                                    routeKey={currentRouteKey}
                                    userAuthority={userAuthority as string[]}
                                    direction={direction}
                                    onMenuItemClick={onDrawerClose}
                                />
                            )}
                        </Suspense>
                    </Drawer>
                </>
            )}
        </>
    )
}

export default MobileNav

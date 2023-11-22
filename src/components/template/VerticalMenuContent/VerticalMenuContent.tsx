/* The code is importing various dependencies and components used in the `VerticalMenuContent`
component. */
import { useState, useEffect } from 'react'
import Menu from '@/components/ui/Menu'
import AuthorityCheck from '@/components/shared/AuthorityCheck'
import VerticalSingleMenuItem from './VerticalSingleMenuItem'
import VerticalCollapsedMenuItem from './VerticalCollapsedMenuItem'
import { themeConfig } from '@/configs/theme.config'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import useMenuActive from '@/utils/hooks/useMenuActive'
import { useTranslation } from 'react-i18next'
import { Direction, NavMode } from '@/@types/theme'
import type { NavigationTree } from '@/@types/navigation'

/* The code is defining an interface called `VerticalMenuContentProps`. This interface specifies the
props that can be passed to the `VerticalMenuContent` component. */
export interface VerticalMenuContentProps {
    navMode: NavMode
    collapsed?: boolean
    routeKey: string
    navigationTree?: NavigationTree[]
    userAuthority: string[]
    onMenuItemClick?: () => void
    direction?: Direction
}

/* `const { MenuGroup } = Menu` is destructuring the `MenuGroup` component from the `Menu` component.
This allows the `MenuGroup` component to be used directly without having to reference it as
`Menu.MenuGroup`. */
const { MenuGroup } = Menu

const VerticalMenuContent = (props: VerticalMenuContentProps) => {
    /* This code is using object destructuring to extract the values of certain props from the `props`
    object passed to the `VerticalMenuContent` component. */
    const {
        navMode = themeConfig.navMode,
        collapsed,
        routeKey,
        navigationTree = [],
        userAuthority = [],
        onMenuItemClick,
        direction = themeConfig.direction,
    } = props

    const { t } = useTranslation()

    const [defaulExpandKey, setDefaulExpandKey] = useState<string[]>([])

    const { activedRoute } = useMenuActive(navigationTree, routeKey)

    /* The `useEffect` hook in the code is used to update the `defaulExpandKey` state variable whenever
    the `activedRoute?.parentKey` value changes. */
    useEffect(() => {
        if (defaulExpandKey.length === 0 && activedRoute?.parentKey) {
            setDefaulExpandKey([activedRoute?.parentKey])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activedRoute?.parentKey])

    /**
     * The function `handleLinkClick` calls the `onMenuItemClick` function if it exists.
     */
    const handleLinkClick = () => {
        onMenuItemClick?.()
    }

    /* The `getNavItem` function is a helper function that takes a `nav` object of type
    `NavigationTree` as a parameter. It checks the type of the `nav` object and returns the
    corresponding JSX component based on the type. */
    const getNavItem = (nav: NavigationTree) => {
        if (nav.subMenu.length === 0 && nav.type === NAV_ITEM_TYPE_ITEM) {
            return (
                <VerticalSingleMenuItem
                    key={nav.key}
                    nav={nav}
                    sideCollapsed={collapsed}
                    userAuthority={userAuthority}
                    direction={direction}
                    onLinkClick={handleLinkClick}
                />
            )
        }

        if (nav.subMenu.length > 0 && nav.type === NAV_ITEM_TYPE_COLLAPSE) {
            return (
                <VerticalCollapsedMenuItem
                    key={nav.key}
                    nav={nav}
                    sideCollapsed={collapsed}
                    userAuthority={userAuthority}
                    direction={direction}
                    onLinkClick={onMenuItemClick}
                />
            )
        }

        if (nav.type === NAV_ITEM_TYPE_TITLE) {
            if (nav.subMenu.length > 0) {
                return (
                    <AuthorityCheck
                        key={nav.key}
                        userAuthority={userAuthority}
                        authority={nav.authority}
                    >
                        <MenuGroup label={t(nav.translateKey) || nav.title}>
                            {nav.subMenu.map((subNav) =>
                                subNav.subMenu.length > 0 ? (
                                    <VerticalCollapsedMenuItem
                                        key={subNav.key}
                                        nav={subNav}
                                        sideCollapsed={collapsed}
                                        userAuthority={userAuthority}
                                        direction={direction}
                                        onLinkClick={onMenuItemClick}
                                    />
                                ) : (
                                    <VerticalSingleMenuItem
                                        key={subNav.key}
                                        nav={subNav}
                                        sideCollapsed={collapsed}
                                        userAuthority={userAuthority}
                                        direction={direction}
                                        onLinkClick={onMenuItemClick}
                                    />
                                )
                            )}
                        </MenuGroup>
                    </AuthorityCheck>
                )
            } else {
                ;<MenuGroup label={nav.title} />
            }
        }
    }

    return (
        <Menu
            className="px-4 pb-4"
            variant={navMode}
            sideCollapsed={collapsed}
            defaultActiveKeys={activedRoute?.key ? [activedRoute.key] : []}
            defaultExpandedKeys={defaulExpandKey}
        >
            {navigationTree.map((nav) => getNavItem(nav))}
        </Menu>
    )
}

export default VerticalMenuContent

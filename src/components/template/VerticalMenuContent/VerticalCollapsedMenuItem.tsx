/* These import statements are importing various components and types from different files and
libraries. */
import Menu from '@/components/ui/Menu'
import Dropdown from '@/components/ui/Dropdown'
import AuthorityCheck from '@/components/shared/AuthorityCheck'
import { Link } from 'react-router-dom'
import VerticalMenuIcon from './VerticalMenuIcon'
import { Trans } from 'react-i18next'
import type { CommonProps } from '@/@types/common'
import type { Direction } from '@/@types/theme'
import type { NavigationTree } from '@/@types/navigation'

/* The `interface DefaultItemProps` is defining the props that can be passed to the `DefaultItem`
component. */
interface DefaultItemProps extends CommonProps {
    nav: NavigationTree
    onLinkClick?: (link: { key: string; title: string; path: string }) => void
    userAuthority: string[]
}

/* The `interface CollapsedItemProps` is extending the `DefaultItemProps` interface and adding an
additional property `direction` of type `Direction`. This allows the `CollapsedItem` component to
receive the `direction` prop along with the other props defined in `DefaultItemProps`. */
interface CollapsedItemProps extends DefaultItemProps {
    direction: Direction
}

/* The `interface VerticalCollapsedMenuItemProps` is extending the `CollapsedItemProps` interface and
adding an additional optional property `sideCollapsed` of type `boolean`. This allows the
`VerticalCollapsedMenuItem` component to receive the `sideCollapsed` prop along with the other props
defined in `CollapsedItemProps`. */
interface VerticalCollapsedMenuItemProps extends CollapsedItemProps {
    sideCollapsed?: boolean
}

/* The line `const { MenuItem, MenuCollapse } = Menu` is destructuring the `Menu` object and extracting
the `MenuItem` and `MenuCollapse` components from it. This allows us to use these components
directly without having to reference them through the `Menu` object. */
const { MenuItem, MenuCollapse } = Menu

/* The `DefaultItem` function component is rendering a menu item with a collapsible sub-menu. It
receives the following props: */
const DefaultItem = ({ nav, onLinkClick, userAuthority }: DefaultItemProps) => {
   
    return (
        <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
            <MenuCollapse
                key={nav.key}
                label={
                    <>
                        <VerticalMenuIcon icon={nav.icon} />
                        <span>
                            <Trans
                                i18nKey={nav.translateKey}
                                defaults={nav.title}
                            />
                        </span>
                    </>
                }
                eventKey={nav.key}
                expanded={false}
                className="mb-2"
            >
                {nav.subMenu.map((subNav) => (
                    <AuthorityCheck
                        key={subNav.key}
                        userAuthority={userAuthority}
                        authority={subNav.authority}
                    >
                        <MenuItem eventKey={subNav.key}>
                            {subNav.path ? (
                                <Link
                                    className="h-full w-full flex items-center"
                                    to={subNav.path}
                                    onClick={() =>
                                        onLinkClick?.({
                                            key: subNav.key,
                                            title: subNav.title,
                                            path: subNav.path,
                                        })
                                    }
                                >
                                    <span>
                                        <Trans
                                            i18nKey={subNav.translateKey}
                                            defaults={subNav.title}
                                        />
                                    </span>
                                </Link>
                            ) : (
                                <span>
                                    <Trans
                                        i18nKey={subNav.translateKey}
                                        defaults={subNav.title}
                                    />
                                </span>
                            )}
                        </MenuItem>
                    </AuthorityCheck>
                ))}
            </MenuCollapse>
        </AuthorityCheck>
    )
}

/* The `CollapsedItem` function component is rendering a menu item with a collapsible sub-menu. It
receives the following props: */
const CollapsedItem = ({
    nav,
    onLinkClick,
    userAuthority,
    direction,
}: CollapsedItemProps) => {
    /* The `const menuItem` is creating a JSX element that represents a single menu item. It is using
    the `MenuItem` component from the `Menu` library and passing it the `key` and `eventKey` props
    from the `nav` object. It also includes the `VerticalMenuIcon` component, which displays an icon
    based on the `icon` prop from the `nav` object. The `className` prop is set to "mb-2", which
    adds a margin-bottom of 2 units to the menu item. */
    const menuItem = (
        <MenuItem key={nav.key} eventKey={nav.key} className="mb-2">
            <VerticalMenuIcon icon={nav.icon} />
        </MenuItem>
    )

    return (
        <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
            <Dropdown
                trigger="hover"
                renderTitle={menuItem}
                placement={
                    direction === 'rtl' ? 'middle-end-top' : 'middle-start-top'
                }
            >
                {nav.subMenu.map((subNav) => (
                    <AuthorityCheck
                        key={subNav.key}
                        userAuthority={userAuthority}
                        authority={subNav.authority}
                    >
                        <Dropdown.Item eventKey={subNav.key}>
                            {subNav.path ? (
                                <Link
                                    className="h-full w-full flex items-center"
                                    to={subNav.path}
                                    onClick={() =>
                                        onLinkClick?.({
                                            key: subNav.key,
                                            title: subNav.title,
                                            path: subNav.path,
                                        })
                                    }
                                >
                                    <span>
                                        <Trans
                                            i18nKey={subNav.translateKey}
                                            defaults={subNav.title}
                                        />
                                    </span>
                                </Link>
                            ) : (
                                <span>
                                    <Trans
                                        i18nKey={subNav.translateKey}
                                        defaults={subNav.title}
                                    />
                                </span>
                            )}
                        </Dropdown.Item>
                    </AuthorityCheck>
                ))}
            </Dropdown>
        </AuthorityCheck>
    )
}

/**
 * The function `VerticalCollapsedMenuItem` returns a collapsed or default item based on the value of
 * the `sideCollapsed` prop.
 * @param {VerticalCollapsedMenuItemProps}  - - `VerticalCollapsedMenuItemProps`: This is the
 * type/interface for the props that the `VerticalCollapsedMenuItem` component accepts.
 * @returns either the `CollapsedItem` component or the `DefaultItem` component based on the value of
 * the `sideCollapsed` prop.
 */
const VerticalCollapsedMenuItem = ({
    sideCollapsed,
    ...rest
}: VerticalCollapsedMenuItemProps) => {
    return sideCollapsed ? (
        <CollapsedItem {...rest} />
    ) : (
        <DefaultItem {...rest} />
    )
}

export default VerticalCollapsedMenuItem

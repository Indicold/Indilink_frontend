/* These import statements are importing various components, functions, and types from different files
and libraries. Here is a breakdown of what each import statement is doing: */
import Tooltip from '@/components/ui/Tooltip'
import Menu from '@/components/ui/Menu'
import AuthorityCheck from '@/components/shared/AuthorityCheck'
import VerticalMenuIcon from './VerticalMenuIcon'
import { Link } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import type { CommonProps } from '@/@types/common'
import type { Direction } from '@/@types/theme'
import type { NavigationTree } from '@/@types/navigation'

const { MenuItem } = Menu

/* The `interface CollapsedItemProps` is defining the props that can be passed to the `CollapsedItem`
component. */
interface CollapsedItemProps extends CommonProps {
    title: string
    translateKey: string
    direction?: Direction
}

/* The `interface DefaultItemProps` is defining the props that can be passed to the `DefaultItem`
component. */
interface DefaultItemProps {
    nav: NavigationTree
    onLinkClick?: (link: { key: string; title: string; path: string }) => void
    sideCollapsed?: boolean
    userAuthority: string[]
}

interface VerticalMenuItemProps extends CollapsedItemProps, DefaultItemProps {}

/**
 * The `CollapsedItem` component is a tooltip that displays a translated title or a default title, with
 * the tooltip placement determined by the direction.
 * @param {CollapsedItemProps}  - - `title`: The title of the collapsed item.
 */
const CollapsedItem = ({
    title,
    translateKey,
    children,
    direction,
}: CollapsedItemProps) => {
    const { t } = useTranslation()

    return (
        <Tooltip
            title={t(translateKey) || title}
            placement={direction === 'rtl' ? 'left' : 'right'}
        >
            {children}
        </Tooltip>
    )
}

/* The `DefaultItem` component is a functional component that renders a menu item with a link. It takes
in the following props: */
const DefaultItem = (props: DefaultItemProps) => {
    const { nav, onLinkClick, sideCollapsed, userAuthority } = props

    return (
        <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
            <MenuItem key={nav.key} eventKey={nav.key} className="mb-2">
                <Link
                    to={nav.path}
                    className="flex items-center h-full w-full"
                    onClick={() =>
                        onLinkClick?.({
                            key: nav.key,
                            title: nav.title,
                            path: nav.path,
                        })
                    }
                >
                    <VerticalMenuIcon icon={nav.icon} />
                    {!sideCollapsed && (
                        <span>
                            <Trans
                                i18nKey={nav.translateKey}
                                defaults={nav.title}
                            />
                        </span>
                    )}
                </Link>
            </MenuItem>
        </AuthorityCheck>
    )
}

/* The `VerticalSingleMenuItem` component is a functional component that renders a single menu item in
a vertical menu. It takes in several props, including `nav` (which represents the navigation tree
item), `onLinkClick` (a function that is called when the link is clicked), `sideCollapsed` (a
boolean indicating whether the menu is collapsed or not), `userAuthority` (an array of user
authorities), and `direction` (the direction of the menu). */
const VerticalSingleMenuItem = ({
    nav,
    onLinkClick,
    sideCollapsed,
    userAuthority,
    direction,
}: Omit<VerticalMenuItemProps, 'title' | 'translateKey'>) => {
    return (
        <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
            {sideCollapsed ? (
                <CollapsedItem
                    title={nav.title}
                    translateKey={nav.translateKey}
                    direction={direction}
                >
                    <DefaultItem
                        nav={nav}
                        sideCollapsed={sideCollapsed}
                        userAuthority={userAuthority}
                        onLinkClick={onLinkClick}
                    />
                </CollapsedItem>
            ) : (
                <DefaultItem
                    nav={nav}
                    sideCollapsed={sideCollapsed}
                    userAuthority={userAuthority}
                    onLinkClick={onLinkClick}
                />
            )}
        </AuthorityCheck>
    )
}

export default VerticalSingleMenuItem

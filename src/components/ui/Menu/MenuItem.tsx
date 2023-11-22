/* These lines of code are importing components and types from different files. */
import { MenuContextConsumer } from './context/menuContext'
import { GroupContextConsumer } from './context/groupContext'
import { CollapseContextConsumer } from './context/collapseContext'
import BaseMenuItem from '../MenuItem'
import type { MenuItemProps as BaseMenuItemProps } from '../MenuItem'

export type MenuItemProps = BaseMenuItemProps

/**
 * The MenuItem component is a wrapper that provides context to its child components.
 * @param {MenuItemProps} props - The `props` parameter is an object that contains the properties
 * passed to the `MenuItem` component.
 */
const MenuItem = (props: MenuItemProps) => {
    const { eventKey, ...rest } = props

    return (
        <MenuContextConsumer>
            {(context) => (
                <GroupContextConsumer>
                    {() => (
                        <CollapseContextConsumer>
                            {() => (
                                <BaseMenuItem
                                    menuItemHeight={context.menuItemHeight}
                                    variant={context.variant}
                                    isActive={(
                                        context.defaultActiveKeys as string[]
                                    ).includes(eventKey as string)}
                                    eventKey={eventKey}
                                    onSelect={context.onSelect}
                                    {...rest}
                                />
                            )}
                        </CollapseContextConsumer>
                    )}
                </GroupContextConsumer>
            )}
        </MenuContextConsumer>
    )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem

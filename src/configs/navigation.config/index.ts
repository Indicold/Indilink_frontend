/* The code is importing constants and types from different files. */
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

/* The code is defining an array called `navigationConfig` which contains objects representing the
navigation menu items. Each object represents a menu item and has properties such as `key`, `path`,
`title`, `translateKey`, `icon`, `type`, `authority`, and `subMenu`. */
const navigationConfig: NavigationTree[] = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
 
    {
        key: 'CustomerMenu',
        path: '',
        title: 'Customer Query',
        translateKey: 'nav.CustomerMenu.groupMenu',
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'CustomerMenu.item1',
                path: '/collapse-menu-item-view-1',
                title: 'Add Query',
                translateKey: 'nav.CustomerMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'CustomerMenu.item2',
                path: '/ticket_list',
                title: 'Query List',
                translateKey: 'nav.CustomerMenu.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            
        ],
        
    },


]


export default navigationConfig

import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

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

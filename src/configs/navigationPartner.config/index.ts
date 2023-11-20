/* The code is importing constants and types from different files. */
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

/* The code is defining a constant variable `navigationPartnerConfig` which is an array of objects.
Each object represents a navigation item in a navigation tree. */
const navigationPartnerConfig: NavigationTree[] = [
    {
        key: 'partner',
        path: '/partner-dashbord',
        title: 'Partner',
        translateKey: 'nav.partner',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
{
        key: 'collapseMenu',
        path: '',
        title: 'Assets',
        translateKey: 'nav.collapseMenu.collapseMenu',
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'collapseMenu.item1',
                path: '/collapse-menu-item-view-1',
                title: 'Add Asset',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'collapseMenu.item2',
                path: '/asset_list',
                title: 'Assets List',
                translateKey: 'nav.collapseMenu.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'collapseMenu.item3',
                path: '/invoice',
                title: 'Invoice',
                translateKey: 'nav.collapseMenu.item3',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            }
        ],
    }, 
    
  
]


export default navigationPartnerConfig

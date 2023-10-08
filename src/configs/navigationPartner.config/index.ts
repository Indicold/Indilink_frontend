import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

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
    // {
    //     key: 'partnerDashbord',
    //     path: '/partner_dashbord',
    //     title: 'Dashbord',
    //     translateKey: 'nav.PartnerDashbord',
    //     icon: 'home',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    /** Example purpose only, please remove */
    // {
    //     key: 'singleMenuItem',
    //     path: '/single-menu-view',
    //     title: 'Single menu item',
    //     translateKey: 'nav.singleMenuItem',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    {
        key: 'collapseMenu',
        path: '',
        title: 'Collapse Menu',
        translateKey: 'nav.collapseMenu.collapseMenu',
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'collapseMenu.item1',
                path: '/collapse-menu-item-view-1',
                title: 'Collapse menu item 1',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'collapseMenu.item2',
                path: '/asset_list',
                title: 'Collapse menu item 2',
                translateKey: 'nav.collapseMenu.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },   {

       

        key: 'groupMenu.collapsesetting',

        path: '',

        title: 'Supports',

        translateKey: 'nav.groupMenu.collapse.collapsesetting',

        icon: 'groupCollapseMenu',

        type: NAV_ITEM_TYPE_COLLAPSE,

        authority: [],

        subMenu: [

            {

                key: 'groupMenu.collapse.itemsetting8',

                path: '/partner-store',

                title: 'Store',

                translateKey: 'nav.groupMenu.collapse.itemsetting8',

                icon: '',

                type: NAV_ITEM_TYPE_ITEM,

                authority: [],

                subMenu: [],

            },

            {

                key: 'groupMenu.collapse.itemsetting9',

                path: '/partner-move',

                title: 'Move',

                translateKey: 'nav.groupMenu.collapse.itemsetting9',

                icon: '',

                type: NAV_ITEM_TYPE_ITEM,

                authority: [],

                subMenu: [],

            },

            {

                key: 'groupMenu.collapse.itemsetting11',

                path: '/partner-prepare',

                title: 'Prepare',

                translateKey: 'nav.groupMenu.collapse.itemsetting11',

                icon: '',

                type: NAV_ITEM_TYPE_ITEM,

                authority: [],

                subMenu: [],

            },

        ]

 

    },
    
  
]


export default navigationPartnerConfig

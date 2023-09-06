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
            // {
            //     key: 'collapseMenu.item2',
            //     path: '/ticket_list',
            //     title: 'Collapse menu item 2',
            //     translateKey: 'nav.collapseMenu.item2',
            //     icon: '',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [],
            //     subMenu: [],
            // },
            
        ],
        
    },
    {

       

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

                path: '/ticket_list_store',

                title: 'Store',

                translateKey: 'nav.groupMenu.collapse.itemsetting8',

                icon: '',

                type: NAV_ITEM_TYPE_ITEM,

                authority: [],

                subMenu: [],

            },

            {

                key: 'groupMenu.collapse.itemsetting9',

                path: '/ticket_list_move',

                title: 'Move',

                translateKey: 'nav.groupMenu.collapse.itemsetting9',

                icon: '',

                type: NAV_ITEM_TYPE_ITEM,

                authority: [],

                subMenu: [],

            },

            {

                key: 'groupMenu.collapse.itemsetting11',

                path: '/ticket_list_prepare',

                title: 'Prepare',

                translateKey: 'nav.groupMenu.collapse.itemsetting11',

                icon: '',

                type: NAV_ITEM_TYPE_ITEM,

                authority: [],

                subMenu: [],

            },

        ]

 

    },
    // {
    //     key: 'groupMenu',
    //     path: '',
    //     title: 'Group Menu',
    //     translateKey: 'nav.groupMenu.groupMenu',
    //     icon: '',
    //     type: NAV_ITEM_TYPE_TITLE,
    //     authority: [],
    //     subMenu: [
    //         {
    //             key: 'groupMenu.single',
    //             path: '/group-single-menu-item-view',
    //             title: 'Group single menu item',
    //             translateKey: 'nav.groupMenu.single',
    //             icon: 'groupSingleMenu',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },
    //         {
    //             key: 'groupMenu.collapse',
    //             path: '',
    //             title: 'Group collapse menu',
    //             translateKey: 'nav.groupMenu.collapse.collapse',
    //             icon: 'groupCollapseMenu',
    //             type: NAV_ITEM_TYPE_COLLAPSE,
    //             authority: [],
    //             subMenu: [
    //                 {
    //                     key: 'groupMenu.collapse.item1',
    //                     path: '/group-collapse-menu-item-view-1',
    //                     title: 'Menu item 1',
    //                     translateKey: 'nav.groupMenu.collapse.item1',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: [],
    //                     subMenu: [],
    //                 },
    //                 {
    //                     key: 'groupMenu.collapse.item2',
    //                     path: '/group-collapse-menu-item-view-2',
    //                     title: 'Menu item 2',
    //                     translateKey: 'nav.groupMenu.collapse.item2',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: [],
    //                     subMenu: [],
    //                 },
    //             ],
    //         },
    //     ],
    // },
]


export default navigationConfig

import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    {
        key: 'partner',
        path: '/partner-dashbord',
        component: lazy(() => import('@/views/auth/Partner/PartnerDashbord/index')),
        authority: [],
    },
    {
        key: 'investor',
        path: '/investor-dashbord',
        component: lazy(() => import('@/views/auth/Investor/InvestorDashbord/index')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'singleMenuItem',
        path: '/single-menu-view',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: lazy(() => import('@/views/auth/BussinessTypeModal')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/asset_list',
        component: lazy(() => import('@/views/auth/Partner/PartnerTable/index')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/ticket_list',
        component: lazy(() => import('@/views/auth/Customer/CustomerTableTicketList')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/ticket_list_store',
        component: lazy(() => import('@/views/auth/Customer/TicketList/StoreTicketList')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/ticket_list_move',
        component: lazy(() => import('@/views/auth/Customer/TicketList/MoveTicketList')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/ticket_list_prepare',
        component: lazy(() => import('@/views/auth/Customer/TicketList/PrepareTicketList')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() =>
            import('@/views/demo/GroupSingleMenuItemView')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView1')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView2')
        ),
        authority: [],
    },
    {

        key: 'partner',
        path: `/partner-registration`,
        component: lazy(() => import('@/views/auth/Partner/StoreRegistration')),
        authority: [],

    },
    {

        key: 'investor',
        path: `/investor-registration`,
        component: lazy(() => import('@/views/auth/Investor/NewMultistep')),
        authority: [],

    },
    {

        key: 'investorbussinesstype',
        path: `/investor-bussiness-type-move`,
        component: lazy(() => import('@/views/auth/Investor/InvestorBussinessTypeMove')),
        authority: [],

    },
    {

        key: 'investorbussinesstype',
        path: `/investor-bussiness-type-store`,
        component: lazy(() => import('@/views/auth/InvestorBussinessTypeStore')),
        authority: [],

    },
    {

        key: 'investorbussinesstype',
        path: `/investor-bussiness-type-prepare`,
        component: lazy(() => import('@/views/auth/Investor/InvestorBussinessTypePrepare')),
        authority: [],

    },
    {

        key: 'partnerbussinesstype',
        path: `/partner-bussiness-type-move`,
        component: lazy(() => import('@/views/auth/Partner/PartnerBussinessTypeMove')),
        authority: [],

    },
    {

        key: 'partnerbussinesstype',
        path: `/partner-bussiness-type-prepare`,
        component: lazy(() => import('@/views/auth/Partner/PartnerBussinessTypePrepare')),
        authority: [],

    },
    {

        key: 'partnerbussinesstype',
        path: `/partner-bussiness-type-compliance`,
        component: lazy(() => import('@/views/auth/Partner/PartnerBussinessTypeCompliances')),
        authority: [],

    },
    {

        key: 'partnerbussinesstype',
        path: `/partner-bussiness-type-additional`,
        component: lazy(() => import('@/views/auth/Partner/PartnerBussinessTypeAdditional')),
        authority: [],

    },
    {

        key: 'customerbusinesstype',
        path: `/customer-store`,
        component: lazy(() => import('@/views/auth/Customer/StoreSearch')),
        authority: [],

    },
    {

        key: 'customerbusinesstype',
        path: `/customer-move`,
        component: lazy(() => import('@/views/auth/Customer/MoveSearch')),
        authority: [],

    },
    {

        key: 'customerbusinesstype',
        path: `/customer-prepare`,
        component: lazy(() => import('@/views/auth/Customer/PrepareSearch')),
        authority: [],

    },
    {

        key: 'partnerbusinesstype',
        path: `/partner-prepare`,
        component: lazy(() => import('@/views/auth/Partner/PartnerSupportList/PartnerPrepareList')),
        authority: [],

    },
    {

        key: 'partnerbusinesstype',
        path: `/partner-move`,
        component: lazy(() => import('@/views/auth/Partner/PartnerSupportList/PartnerMoveList')),
        authority: [],

    },
      {

        key: 'partnerbusinesstype',
        path: `/partner-store`,
        component: lazy(() => import('@/views/auth/Partner/PartnerSupportList/PartnerStoreList')),
        authority: [],

    },
]
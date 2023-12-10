/* The code is importing the `lazy` function from the `react` library, the `authRoute` object from the
`authRoute` file, and the `Routes` type from the `@/types/routes` module. */
import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

/* The code `export const publicRoutes: Routes = [...authRoute]` is creating a constant variable named
`publicRoutes` of type `Routes`. It is assigning the value of `authRoute` to `publicRoutes` using
the spread operator (`...`). This means that `publicRoutes` will contain all the elements of
`authRoute` as individual elements in an array. */
export const publicRoutes: Routes = [...authRoute]

/* The above code is exporting an array called `protectedRoutes`. Each element in the array represents
a route in a web application. Each route has properties such as `key`, `path`, `component`, and
`authority`. The `key` is a unique identifier for the route, the `path` is the URL path for the
route, the `component` is the component that should be rendered when the route is accessed, and the
`authority` is an array of roles or permissions required to access the route. */
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
        key: 'collapseMenu.item3',
        path: '/invoice',
        component: lazy(() => import('@/views/auth/Partner/Invoice/index')),
        authority: [],
    },
    {
        key: 'collapseMenu.item3',
        path: '/asset_success',
        component: lazy(() => import('@/views/auth/Partner/PartnerBusinessTypeSuccess')),
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
        path: `/partner-registration/:id`,
        component: lazy(() => import('@/views/auth/Partner/StoreRegistration')),
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

        key: 'partnerbussinesstypeid',
        path: `/partner-bussiness-type-move/:id`,
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
        path: `/partner-bussiness-type-prepare/:id`,
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
        path: `/partner-bussiness-type-compliance/:id`,
        component: lazy(() => import('@/views/auth/Partner/PartnerBussinessTypeCompliances')),
        authority: [],

    },
    {

        key: 'partnerbussinesstype',
        path: `/partner-move-compliance`,
        component: lazy(() => import('@/views/auth/Partner/PartnerComplianceMove')),
        authority: [],

    },
    {

        key: 'partnerbussinesstype',
        path: `/partner-move-compliance/:id`,
        component: lazy(() => import('@/views/auth/Partner/PartnerComplianceMove')),
        authority: [],

    },
    {

        key: 'partnerbussinesstype',
        path: `/partner-bussiness-type-additional`,
        component: lazy(() => import('@/views/auth/Partner/PartnerBussinessTypeAdditional')),
        authority: [],

    },
    {

        key: 'partnerbussinesstype',
        path: `/partner-bussiness-type-additional/:id`,
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
    {

        key: 'notifiaction',
        path: `/notification`,
        component: lazy(() => import('@/components/template/NotificationDropdown/index')),
        authority: [],

    },
    {

        key: 'profile',
        path: `/profile`,
        component: lazy(() => import('@/views/auth/UserProfile/index')),
        authority: [],

    },
    {

        key: 'profileBasic',
        path: `/basic-info`,
        component: lazy(() => import('@/views/auth/Profile/BasicInfo')),
        authority: [],
    },
    {

        key: 'profileKeyManagement',
        path: `/key-management`,
        component: lazy(() => import('@/views/auth/Profile/KeyManagement')),
        authority: [],
    },
    {

        key: 'profileAccountDetails',
        path: `/account-details`,
        component: lazy(() => import('@/views/auth/Profile/AccountDetails')),
        authority: [],
    },
    {

        key: 'assetsdocumentlist',
        path: `/documents-list/:id`,
        component: lazy(() => import('@/views/auth/Partner/AssetsDocumentsTable/index')),
        authority: [],
    },
    {

        key: 'assetsdetails',
        path: `/assets-details/:id`,
        component: lazy(() => import('@/views/auth/Partner/Details/StoreDetails')),
        authority: [],
    },
    {

        key: 'movedetails',
        path: `/assetsmove-details/:id`,
        component: lazy(() => import('@/views/auth/Partner/Details/MoveDetails')),
        authority: [],
    },
    {

        key: 'preparedetails',
        path: `/assetsprepare-details/:id`,
        component: lazy(() => import('@/views/auth/Partner/Details/PrepareDetails')),
        authority: [],
    },
]
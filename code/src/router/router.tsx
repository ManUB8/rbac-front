import { useRoutes, type RouteObject } from 'react-router';
import HomePage from '../modules/auth/page/HomePage';
import NotFoundPage from '../shared/NotFoundPage';
import LoginPage from '../modules/auth/page/LoginPage';
import DashBoardPage from '../modules/dashboard/DashBoardPage';
import type { IRouterConfig } from './Router.interface';
import UserListPage from '../modules/user/page/UserListPage';
import { Typography } from '@mui/material';
// Icon
import HomeIcon from '../assets/svg/home_icon.svg';
import Supplier from '../assets/image/supplierSVG.svg';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import MuseumOutlinedIcon from '@mui/icons-material/MuseumOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import FormatUnderlinedOutlinedIcon from '@mui/icons-material/FormatUnderlinedOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ContentPasteGoOutlinedIcon from '@mui/icons-material/ContentPasteGoOutlined';
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';

// page
import LoginForm from '../modules/auth/page/LoginForm';
import OwnerListPage from '../modules/owner/page/OwnerListPage';
import OwnerFrome from '../modules/owner/components/From/OwnerFrom';
import BranchFrom from '../modules/branch/components/From/BranchFrom';
import PackageServicesPage from '../modules/product&services/package_services/page/PackageServicesPage';
import PackageServicesFrom from '../modules/product&services/package_services/components/From/PackageServicesFrom';
import MasterFunctionPage from '../modules/systemSetting/masterFunction/page/MasterFunctionPage';
import MasterPagePage from '../modules/systemSetting/masterPage/page/MasterPage';
import MasterMetricPage from '../modules/systemSetting/masterMetric/page/MasterMetricPage';
import MasterRolePage from '../modules/systemSetting/masterRole/page/MasterRolePage';
import MasterRolePageOne from '../modules/systemSetting/masterRole/page/MasterRolePageOne';
import MasterSupplierPage from '../modules/masterSku/masterSupplier/page/MasterSupplierPage';
import ManageInventoryPage from '../modules/masterSku/masterSetting/manageInventory/page/ManageInventoryPage';
import ManageInventoryCreatePage from '../modules/masterSku/masterSetting/manageInventory/page/ManageInventoryCreatePage';
import ManageUnitPage from '../modules/masterSku/masterSetting/manageUnit/page/ManageUnitPage';
import ManageTempPage from '../modules/masterSku/masterSetting/manageTemp/page/ManageTempPage';
import MasterSkuPage from '../modules/masterSku/master_sku/page/MasterSkuPage';
import MasterSkuFrom from '../modules/masterSku/master_sku/components/From/MasterSkuFrom';

export const AppRoutes = {
    default: '/',
    user: '/user',
    authLanding: '/auth',
    login: '/login',
    notFoundPage: '*',
    dashboard: '/dashboard',
    owner_management: '/owner-management',
    cleansing_management: '/cleansing-management',
    import_management: '/import-management',
    branch_management: '/branch-management',
    product_services: '/product-services',
    package_services: '/package-services',
    master_services: '/master-services',
    master_sku: '/master-sku',
    masterSupplier: '/master-supplier',
    masterSetting: '/master-setting',
    InventoryCategory: '/inventory-category',
    manageUnit: '/manage-unit',
    manageTemp: '/manage-temp',
    system_service: '/system-service',
    master_page: '/master-page',
    master_function: '/master-function',
    master_metric: '/master-metric',
    master_role: '/master-role'

    // Products and services Package
};

export const routesConfig: {
    privateRoutes: IRouterConfig[];
    publicRoutes: RouteObject[];
} = {
    privateRoutes: [
        {
            path: AppRoutes.dashboard,
            element: <DashBoardPage />,
            code: 'dashboard',
            name: 'Dashboard',
            icon: <SpaceDashboardOutlinedIcon />
        },
        {
            path: AppRoutes.owner_management,
            code: 'owner',
            name: 'บัญชีร้านค้า',
            icon: <StoreMallDirectoryOutlinedIcon />,
            children: [
                {
                    path: AppRoutes.owner_management,
                    element: <OwnerListPage />,
                    code: 'owner-m',
                    name: 'จัดการบัญชี',
                    icon: <MuseumOutlinedIcon />,
                    subpath: false,
                    childrens: [
                        {
                            path: `${AppRoutes.owner_management}/view/create/:id`,
                            element: <OwnerFrome />,
                            code: 'owner-create',
                            name: 'เพิ่มข้อมูลบัญชี',
                            subpath: true,
                            modal: true
                        },
                        {
                            path: `${AppRoutes.owner_management}/view/edit/:id`,
                            element: <OwnerFrome />,
                            code: 'owner-edit',
                            name: 'แก้ไขข้อมูลบัญชี',
                            subpath: true,
                            modal: true
                        },
                        {
                            path: `${AppRoutes.owner_management}/branch/create/:id`,
                            element: <BranchFrom />,
                            code: 'branch-create',
                            name: 'เพิ่มข้อมูลสาขา',
                            subpath: true,
                            modal: true
                        },
                        {
                            path: `${AppRoutes.owner_management}/branch/edit/:id`,
                            element: <BranchFrom />,
                            code: 'branch-edit',
                            name: 'แก้ไขข้อมูลสาขา',
                            subpath: true,
                            modal: true
                        }
                    ]
                }
                // {
                //     path: AppRoutes.cleansing_management,
                //     element: <OwnerListPage />,
                //     code: 'cleansing',
                //     name: 'ระบบล้างข้อมูล',
                //     subpath: false,
                //     childrens: [
                //         {
                //             path: `${AppRoutes.cleansing_management}/transaction`,
                //             element: <OwnerFrome />,
                //             code: 'transaction',
                //             name: 'ล้าง Transaction บิลการขาย',
                //             subpath: false,
                //             modal: false,
                //             childrens: []
                //         },
                //         {
                //             path: `${AppRoutes.cleansing_management}/doc`,
                //             element: <OwnerFrome />,
                //             code: 'doc',
                //             name: 'ล้าง ประวัติ เอกสาร',
                //             subpath: false,
                //             modal: false,
                //             childrens: []
                //         }
                //     ]
                // },
                // {
                //     path: AppRoutes.import_management,
                //     element: <OwnerListPage />,
                //     code: 'import',
                //     name: 'นำเข้าข้อมูล',
                //     subpath: false,
                //     childrens: [
                //         {
                //             path: `${AppRoutes.import_management}/view/create/:id`,
                //             element: <OwnerFrome />,
                //             code: 'import-create',
                //             name: 'เพิ่มข้อมูล',
                //             subpath: true
                //         }
                //     ]
                // }
            ]
        },
        {
            path: AppRoutes.product_services,
            code: 'product-services',
            name: 'สินค้าและบริการ',
            icon: <InventoryOutlinedIcon />,
            children: [
                {
                    path: AppRoutes.package_services,
                    element: <PackageServicesPage />,
                    code: 'management-package',
                    icon: <ContentPasteGoOutlinedIcon />,
                    name: 'จัดการแพ็คเกจ',
                    subpath: false,
                    childrens: [
                        {
                            path: `${AppRoutes.package_services}/view/create/:id`,
                            element: <PackageServicesFrom />,
                            code: 'management-package-create',
                            name: 'จัดการสร้างแพ็คเกจ',
                            subpath: true,
                            modal: true
                        },
                        {
                            path: `${AppRoutes.package_services}/view/edit/:id`,
                            element: <PackageServicesFrom />,
                            code: 'management-package-edit',
                            name: 'จัดการแก้ไขแพ็คเกจ',
                            subpath: true,
                            modal: true
                        }
                    ]
                },
                {
                    path: AppRoutes.system_service,
                    code: 'system-service',
                    name: 'ตั้งค่าแพ็คเกจ',
                    icon: <MiscellaneousServicesOutlinedIcon />,
                    childrens: [
                        {
                            path: AppRoutes.master_page,
                            element: <MasterPagePage />,
                            code: 'system-service-page',
                            name: 'Master Page',
                            icon: <Typography variant="h6">P</Typography>,
                            subpath: false,
                            childrens: []
                        },
                        {
                            path: AppRoutes.master_function,
                            element: <MasterFunctionPage />,
                            code: 'system-service-function',
                            name: 'Master Function',
                            icon: <Typography variant="h6">F</Typography>,
                            subpath: false,
                            childrens: []
                        },
                        {
                            path: AppRoutes.master_metric,
                            element: <MasterMetricPage />,
                            code: 'system-service-metric',
                            name: 'Master Metric',
                            icon: <Typography variant="h6">M</Typography>,
                            subpath: false,
                            childrens: []
                        },
                        {
                            path: AppRoutes.master_role,
                            element: <MasterRolePage />,
                            code: 'system-service-role',
                            name: 'Master Role',
                            icon: <Typography variant="h6">R</Typography>,
                            subpath: false,
                            childrens: [
                                {
                                    path: `${AppRoutes.master_role}/view/create/:id`,
                                    element: <MasterRolePageOne />,
                                    code: 'system-service-role-create',
                                    name: 'Master Role',
                                    icon: <Typography variant="h6">R</Typography>,
                                    subpath: true,
                                    modal: true,
                                    childrens: []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            path: AppRoutes.master_services,
            code: 'master-service',
            name: 'ฐานข้อมูล',
            icon: <StorageOutlinedIcon />,
            children: [
                {
                    path: AppRoutes.master_sku,
                    element: <MasterSkuPage />,
                    icon: <Inventory2OutlinedIcon />,
                    code: 'master_sku',
                    name: 'Master SKU',
                    subpath: false,
                    childrens: [
                        {
                            path: `${AppRoutes.master_sku}/create/:id`,
                            element: <MasterSkuFrom />,
                            code: 'master-sku-create',
                            name: 'เพิ่มข้อมูลสินค้ากลาง',
                            subpath: true,
                            modal: true
                        },
                        {
                            path: `${AppRoutes.master_sku}/view/edit/:id`,
                            element: <MasterSkuFrom />,
                            code: 'master-sku-edit',
                            name: 'จัดการแก้ไขข้อมูลสินค้ากลาง',
                            subpath: true,
                            modal: true
                        }
                    ]
                },
                {
                    path: AppRoutes.masterSupplier,
                    element: <MasterSupplierPage />,
                    code: 'management-master-Supplier',
                    name: 'Master Supplier',
                    icon: <MapsHomeWorkOutlinedIcon />,
                    subpath: false,
                    childrens: []
                },
                {
                    path: AppRoutes.InventoryCategory,
                    element: <ManageInventoryPage />,
                    code: 'management-inventory',
                    name: 'ตั้งค่าฐานข้อมูล',
                    icon: <SettingsApplicationsOutlinedIcon />,
                    subpath: false,
                    childrens: [
                        {
                            path: `${AppRoutes.InventoryCategory}`,
                            element: <ManageInventoryPage />,
                            code: 'management-inventory',
                            name: 'สินค้าคงคลัง',
                            icon: <KitchenOutlinedIcon />,
                            subpath: false,
                            children: [
                                {
                                    path: `${AppRoutes.InventoryCategory}/create/:id`,
                                    element: <ManageInventoryCreatePage />,
                                    code: 'management-inventory-create',
                                    name: 'สร้างหมวดหมู่สินค้าคงคลัง',
                                    subpath: true,
                                    modal: true
                                }
                            ]
                        },
                        {
                            path: AppRoutes.manageUnit,
                            element: <ManageUnitPage />,
                            code: 'management-unit',
                            icon: <FormatUnderlinedOutlinedIcon />,
                            name: 'จัดการหน่วย',
                            subpath: false,
                            childrens: []
                        },
                        {
                            path: AppRoutes.manageTemp,
                            element: <ManageTempPage />,
                            code: 'management-temp',
                            icon: <DeviceThermostatOutlinedIcon />,
                            name: 'จัดการเก็บรักษา',
                            subpath: false,
                            childrens: []
                        }
                    ]
                }
            ]
        }
    ],
    publicRoutes: [
        {
            path: AppRoutes.notFoundPage,
            element: <NotFoundPage />
        },
        {
            path: AppRoutes.authLanding,
            element: <LoginPage />
        },
        {
            path: AppRoutes.login,
            element: <LoginForm />
        }
    ]
};

export const sub_path = `/bff/admin`
export const version = `v1`
export const sub_path_master_package = `master-package`

export const ApiConfig = {
    LOGIN_API: "/auth-service/v1/login/admin",
    OWNERS_API: "/owner-branch/v1/owners",
    BRANCHS_API: "/owner-branch/v1",
    USER_API: "/user-role-package/v1/users",
    UPLOAD_API: '/upload/v1/upload',
    UPLOAD_ROS_API: '/upload-ros/v2/image',
    UPLOAD_ROS_SKU_API: '/upload-ros/v2/upload/image',
    PRODUCTSERVICES_API: "/owner-branch/v1/owners",
    PACKAGE_API: `${sub_path}/${version}/${sub_path_master_package}`,
    MASTER_API: `${sub_path}/${version}/masterdata-web-admin`,
    MASTERDEVICE_API: "/user-role-package/v1/masterdevices",
    MASTERPAGE_API: "/user-role-package/v1/masterpage",
    MASTERFUNCTION_API: "/user-role-package/v1/masterfunction",
    MASTERMETRIC_API: "/user-role-package/v1/metric",
    MASTERROLE_API: '/user-role-package/v1/roletemplate',

    MASTERDATA_API: '/bff/admin/v1/masterdata-web-admin'
}

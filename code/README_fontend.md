# README Frontend

เอกสารนี้สรุปโครงสร้าง frontend, flow สำคัญ, logic หลัก, และไฟล์ที่ควรตรวจสอบก่อน clean ออก

## Stack และคำสั่ง

- Framework: React + TypeScript + Vite
- UI หลัก: MUI
- Form: react-hook-form + zod resolver
- API/cache: axios + TanStack Query
- State กลางเล็ก ๆ: Jotai
- Package manager: Yarn 1

คำสั่งหลัก:

```bash
yarn dev
yarn build
yarn lint
```

หมายเหตุ: Vite version นี้ควรใช้ Node ที่รองรับ เช่น Node 20.19+ หรือ 22.12+

## Entry Point

- `src/main.tsx`
  - mount React app เข้า `#root`
  - import `index.css`

- `src/App.tsx`
  - ครอบ app ด้วย `JotaiProvider`
  - ครอบ data fetching ด้วย `QueryClientProvider`
  - ครอบ theme ด้วย `ThemeProvider`
  - render `PopupProvider`, `FlashProvider`, และ `AuthRoute`

## Routing

ไฟล์หลัก:

- `src/router/router.tsx`
- `src/router/AuthRoute.tsx`
- `src/router/PrivateRoute.tsx`
- `src/router/RoleRoute.tsx`
- `src/router/PermissionRoute.tsx`
- `src/router/RoutesByModalFlag.tsx`

### router.tsx

เป็น source of truth ของ route และ sidebar ปัจจุบัน

ของสำคัญ:

- `UserRole = "admin" | "temporary_admin" | "student"`
- `AppRoutes`
- `routesConfig.privateRoutes`
- `routesConfig.publicRoutes`
- `getDefaultRouteByRole`
- `getPrivateRoutesByRole`

Sidebar ปัจจุบันอ่านจาก `routesConfig.privateRoutes` โดยตรงผ่าน `getPrivateRoutesByRole(role)`

### AuthRoute.tsx

สร้าง React Router ทั้งหมด

Flow:

1. public routes มาจาก `routesConfig.publicRoutes`
2. private routes ที่มี layout อยู่ใต้ `PrivateLayoutRoute`
3. private routes ที่ไม่มี layout อยู่ใต้ `PrivateBareRoute`
4. แต่ละ route ถูกห่อด้วย `RoleRoute roles={route.roles}`

สำคัญ: route permission ต้องใช้ role จริงจาก session ไม่ใช้ `getRouteRole()` ในการให้สิทธิ์

### PrivateRoute.tsx

เช็กว่ามี token หรือไม่

- ถ้าไม่มี token redirect ไป `/auth`
- ถ้ามี token render `Layout` หรือ bare modal layout

ไฟล์นี้ไม่ได้เช็ก role

### RoleRoute.tsx

เช็กสิทธิ์ role ของ route

```ts
roles.includes(currentRole)
```

ถ้า role ไม่ตรง redirect ไป default route ของ role นั้น

### temporary_admin behavior

ปัจจุบันออกแบบไว้แบบนี้:

- default route: `/admin/student-activities`
- เห็น sidebar แค่ `ลงทะเบียนกิจกรรม`
- เข้าได้เฉพาะ `/admin/student-activities`
- route นี้มี roles:

```tsx
roles: ["admin", "temporary_admin"]
```

route admin อื่นยังเป็น:

```tsx
roles: ["admin"]
```

`getRouteRole("temporary_admin")` คืน `"admin"` ได้เฉพาะเพื่อ UI display เช่น logo/header/sidebar style เท่านั้น ห้ามใช้เพื่อ grant permission

## Auth และ Session

ไฟล์หลัก:

- `src/modules/auth/hook/useAuth.ts`
- `src/modules/auth/page/LoginForm.tsx`
- `src/modules/auth/service/LoginApi.tsx`
- `src/modules/auth/interface/Login.interface.tsx`

### useAuth.ts

หน้าที่:

- login admin
- login student
- set localStorage/cookies
- logout
- อ่าน token/role/user จาก localStorage

localStorage keys สำคัญ:

- `access_token`
- `account_type`
- `account_name`
- `user_id`
- `user_code`

cookies สำคัญ:

- `accessToken`
- `accountName`
- `accountType`
- `account_type`
- `userId`
- `user_id`
- `user_code`

Admin login ต้องเก็บ role จาก backend จริง เช่น `admin` หรือ `temporary_admin`

Student login ยังบังคับ role เป็น `student`

## Layout และ Sidebar

ไฟล์หลัก:

- `src/shared/components/layouts/Layout.tsx`
- `src/shared/components/layouts/SidebarMenu.tsx`
- `src/shared/components/layouts/MainContent.tsx`
- `src/shared/components/layouts/ModalNavHeader.tsx`
- `src/shared/components/layouts/ModalHeaderContext.tsx`

### Layout.tsx

- อ่าน role จาก `useAuth().getAuthRole()`
- render `SidebarMenu`
- render children ใน `MainContent`
- ใช้ `getRouteRole(role)` เพื่อแสดงหัว/หน้าตาแบบ admin สำหรับ `temporary_admin`

### SidebarMenu.tsx

Sidebar ที่ใช้งานจริง

แหล่งเมนู:

```ts
getPrivateRoutesByRole(role).filter((item) => item.withLayout !== false)
```

ดังนั้นเมนูผูกกับ `routesConfig.privateRoutes` ใน `router.tsx`

ไม่มีไฟล์ `sidebarMenuConfig.tsx` แล้ว และไม่ได้ใช้ config แยก

## API Layer

ไฟล์หลัก:

- `src/shared/service/ApiConfig.tsx`
- `src/shared/service/axiosInstance.ts`

### ApiConfig.tsx

รวม base path ของ API modules เช่น auth, student, activity, dashboard

### axiosInstance.ts

axios instance กลาง ใช้กับ service ทุก module

ข้อควรระวัง:

- ถ้าแก้ response/error interceptor ให้เช็กทุก service
- หลาย service คาดว่า `api.get/post/patch` return data โดยตรง ไม่ใช่ AxiosResponse

## Module Pattern

module ส่วนใหญ่จัดแบบนี้:

```text
page/        หน้าหลักของ feature
components/  UI ย่อย แยก page/form/table
hook/        controller, form logic, query logic
service/     เรียก API
interface/   TypeScript interface
utils/       validation/options/style เฉพาะ module
```

## Admin Modules ที่ใช้งานผ่าน route

จาก `routesConfig.privateRoutes`:

- `Dashboard_Admin`
  - path: `/dashboard`
  - role: `admin`

- `Student_Manage`
  - path: `/admin/students`
  - role: `admin`

- `ActivityManage`
  - path: `/admin/activities`
  - role: `admin`

- `Faculty_Majors`
  - path: `/admin/branchfaculty`
  - role: `admin`

- `Student_Activities`
  - path: `/admin/student-activities`
  - role: `admin`, `temporary_admin`

- `EventRegistrants`
  - path: `/admin/student-event`
  - role: `admin`
  - เป็น child route ของ `/admin/event`

- `StudentReport`
  - path: `/admin/student-report`
  - role: `admin`
  - เป็น child route ของ `/admin/event`

## Student Modules ที่ใช้งานผ่าน route

- `StudentMaster`
  - path: `/student/card`
  - role: `student`

- `StudentActivity`
  - path: `/student/activity`
  - role: `student`

- `Dashboard/ActivitySummary`
  - path: `/student/summary`
  - role: `student`

## Auth Pages

- `/auth`: `LoginPage`
- `/login`: `LoginForm`
- `/register`: `Register`

`HomePage.tsx` ใน auth ยังไม่เห็น route ใช้งาน

## ActivityManage Logic

ไฟล์สำคัญ:

- `ActivityManage/page/ActivityManagePage.tsx`
- `ActivityManage/hook/useFetchActivity.tsx`
- `ActivityManage/components/form/ActivityFrom.tsx`
- `ActivityManage/components/form/ActivityModal.tsx`
- `ActivityManage/components/form/ActivityDetail.tsx`
- `ActivityManage/components/form/ActivityPosition.tsx`
- `ActivityManage/service/ActivityManageApi.tsx`
- `ActivityManage/interface/ActivityManage.interface.tsx`
- `ActivityManage/utils/ValidationActivity.ts`

Flow:

1. `ActivityManagePage` สร้าง master controller จาก `useActivityFetch`
2. list/search ใช้ `getAllActivity`
3. add/edit เปิด modal ผ่าน `ActivityFrom`
4. form controller อยู่ใน `useMasterFunctionActivityFromFetch`
5. edit mode โหลดข้อมูลด้วย `getOneActivity`
6. create ใช้ `CreateActivity`
7. update ใช้ `UpdateActivity`
8. delete ใช้ `DeleteActivity`

ฟอร์มปัจจุบันรองรับ:

- ข้อมูลกิจกรรมพื้นฐาน
- ชั่วโมงกิจกรรม
- ชั่วโมงจิตอาสา
- ประเภทการเช็ค
- scan window checkin/checkout ตาม `check_type`
- location/radius
- require registration
- activity status

## Student Activities Logic

ไฟล์สำคัญ:

- `Student_Activities/page/StudentActivitiesPage.tsx`
- `Student_Activities/components/form/StudentActivitiesFrom.tsx`
- `Student_Activities/components/form/DetailStuActivity.tsx`
- `Student_Activities/service/StudentActivitiesApi.tsx`
- `Student_Activities/interface/StudentActivities.interface.tsx`

Flow:

1. เลือกกิจกรรมจาก `useFetchActivityFilter`
2. เลือก mode checkin หรือ checkout
3. กรอกรหัสนิสิตหรือสแกน QR
4. ส่ง `CheckInStudentActivities` หรือ `CheckOutStudentActivities`
5. response ล่าสุดแสดงใน `DetailStuActivity`

fields response ที่แสดงเพิ่มแล้ว:

- `earned_hours`
- `checkin_status_text`
- `checkout_status_text`

## Permission Logic

ไฟล์:

- `src/router/PermissionRoute.tsx`

ตอนนี้ route permission ตาม `permissionKey` ยังไม่ได้ enforce จริงในหลายจุด เพราะ logic permission ยังเป็นแบบ placeholder/เปิดผ่าน ควรตรวจไฟล์นี้ก่อนเพิ่ม permission จริง

Role permission จริงตอนนี้ใช้ `RoleRoute`

## Theme และ Styling

ไฟล์หลัก:

- `src/shared/utils/theme.tsx`
- `src/shared/store/themeAtom.ts`
- `src/index.css`
- `src/App.css`

Theme mode เก็บผ่าน Jotai และ localStorage key:

- `theme`

## ไฟล์ที่ควรระวังก่อน clean

รายการนี้คือไฟล์หรือ module ที่ “น่าสงสัยว่าไม่ได้ใช้จริง” จากการค้น import/routes ในปัจจุบัน ควรตรวจอีกครั้งก่อนลบ โดยใช้ `rg ชื่อไฟล์หรือชื่อ export`

### ไฟล์ backup / note / scratch ที่ควรลบได้ง่าย

- `src/.DS_Store`
- `src/modules/Structure/components/.DS_Store`
- `src/modules/admin/Qr_Scanner/components/.DS_Store`
- `src/modules/admin/ActivityManage/page/aa.txt`
- `src/modules/admin/Faculty_Majors/components/form/test.txt`
- `src/modules/admin/Faculty_Majors/page/d.txt`
- `src/shared/components/drawer/Drawer.txt`
- `src/shared/components/layouts/c.txt`
- `src/shared/components/popup/pop.txt`
- `src/shared/components/sidebar/contest.txt`
- `src/shared/components/sidebar/sli.txt`

ไฟล์ `.txt` เหล่านี้ดูเหมือน backup ทดลองหรือ code เก่า ไม่ใช่ source ที่ route/import ใช้

### Module หรือ page ที่ยังไม่เห็น route ใช้งาน

- `src/modules/dashboard/DashBoardPage.tsx`
  - ถูก import ใน `router.tsx` แต่ไม่ได้ใช้เป็น element ปัจจุบัน
  - route `/dashboard` ใช้ `Dashboard_Admin/page/DashboardAdminPage`

- `src/modules/admin/StudentManage`
  - มี `StudentManagePage` และไฟล์ชุดเก่า
  - `router.tsx` import `StudentManagePage` แต่ route `/admin/students` ใช้ `Student_Manage/page/Student_ManagePage`
  - ควรเทียบกับ `Student_Manage` ก่อนลบ เพราะชื่อใกล้กันมาก

- `src/modules/admin/Qr_Scanner/page/QrScannerPage.tsx`
  - ถูก import ใน `router.tsx` แต่ route ถูก comment/ไม่ได้เปิด
  - component scanner dialog ยังถูกใช้ใน `Student_Activities/components/form/StudentActivitiesFrom.tsx`
  - ห้ามลบทั้ง module ถ้ายังใช้ `QrScannerDialog`

- `src/modules/user`
  - ยังไม่เห็น route ใช้งาน
  - `UserListPage` ดูเป็น placeholder

- `src/modules/auth/page/HomePage.tsx`
  - ยังไม่เห็น route ใช้งาน

- `src/modules/admin/Position`
  - ยังไม่เห็น route ใช้งานตรง ๆ
  - อาจเป็น helper ของ student manage ต้องตรวจ import ก่อนลบ

### Layout/navigation เก่าที่อาจไม่ได้ใช้

ปัจจุบัน layout ใช้ `src/shared/components/layouts/SidebarMenu.tsx`

ไฟล์ต่อไปนี้ยังไม่เห็นถูกใช้โดย `Layout` ปัจจุบัน:

- `src/shared/components/drawer/DrawerMenuBar.tsx`
- `src/shared/components/drawer/DrawerMenuBody.tsx`
- `src/shared/components/sidebar/SidebarContent.tsx`
- `src/shared/components/sidebar/SidebarFooter.tsx`
- `src/shared/components/sidebar/SidebarHeader.tsx`
- `src/shared/components/layouts/Header.tsx`
- `src/shared/components/layouts/FooterMain.tsx`

ข้อควรระวัง: บางไฟล์อาจเป็น UI เก่าที่มี CSS ประกอบ ถ้าจะลบให้ค้นทั้งชื่อ component และ CSS class

### Assets ที่อาจเป็นของ template เดิม

ควรตรวจการใช้งานก่อนลบ:

- `src/assets/vite.svg`
- `src/assets/react.svg`
- assets ใน `src/assets/image/logo/` หลายตัว
- assets supplier/commerce เช่น `supplier.png`, `creditDebitLotsSelect.png`, `gift-box.png`
- `src/assets/video/vdo-login.mp4`, `src/assets/video/vdo-rbac.mp4`

ใช้คำสั่งเช็กตัวอย่าง:

```bash
rg "ชื่อไฟล์" src
```

## วิธีตรวจไฟล์ก่อนลบ

1. ค้นชื่อไฟล์:

```bash
rg "ComponentName|functionName|fileName" src
```

2. ค้น import path:

```bash
rg "shared/components/sidebar|modules/admin/StudentManage" src
```

3. เช็ก route:

```bash
rg "AppRoutes|routesConfig|path:" src/router src/modules
```

4. ลบทีละกลุ่มเล็ก แล้วรัน:

```bash
yarn lint
yarn build
```

หมายเหตุ: ตอนนี้ project มี TypeScript/lint errors เดิมหลายจุด เช่น unused imports และ MUI type mismatch ดังนั้นถ้า build/lint fail ต้องดูว่า fail จากไฟล์ที่ลบหรือ error เก่า

## สิ่งที่ไม่ควรลบโดยไม่ตรวจละเอียด

- `src/router/*`
- `src/shared/service/*`
- `src/shared/utils/theme.tsx`
- `src/shared/store/themeAtom.ts`
- `src/shared/components/message/*`
- `src/shared/components/popup/*`
- module ที่อยู่ใน `routesConfig.privateRoutes`
- component scanner ที่ถูกใช้ใน `Student_Activities`

## Checklist เวลาเพิ่มหน้าใหม่

1. เพิ่ม path ใน `AppRoutes`
2. เพิ่ม route object ใน `routesConfig.privateRoutes`
3. กำหนด `roles`
4. ถ้าต้องแสดงใน sidebar ให้ใส่ `withLayout: true`, `name`, `icon`, `key`
5. ถ้าเป็นหน้าไม่มี sidebar ให้ใช้ `withLayout: false`
6. เพิ่ม service API ใน module นั้น
7. เพิ่ม interface response/request
8. เพิ่ม hook/controller ถ้ามี fetch/form logic
9. ทดสอบ role admin/student/temporary_admin ถ้า route เกี่ยวกับสิทธิ์

## Known Issues ปัจจุบัน

- มี unused imports จำนวนมาก ทำให้ `tsc --noEmit` fail
- มี component เก่า/ไฟล์ทดลองหลายชุด
- มี module ซ้ำชื่อใกล้กัน เช่น `StudentManage` กับ `Student_Manage`
- `sidebarMenuConfig.tsx` ถูกลบแล้ว sidebar ใช้ `routesConfig.privateRoutes`
- `PermissionRoute.tsx` ยังไม่ใช่ permission enforcement หลัก


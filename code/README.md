# RBAC Activity Frontend

เอกสารนี้เขียนไว้เพื่อเป็น context หลักของโปรเจกต์ frontend ระบบกิจกรรมนิสิต RBAC เวลาให้คนอื่นหรือ AI ช่วยแก้ไข ให้เริ่มอ่านไฟล์นี้ก่อน เพื่อเข้าใจที่มา flow การทำงาน โครงสร้างไฟล์ และจุดที่ต้องระวัง โดยเนื้อหา README เดิมของ Vite ยังถูกเก็บไว้ท้ายไฟล์ในหัวข้อ "บันทึก README เดิม"

## ภาพรวม

โปรเจกต์นี้เป็นเว็บ frontend สำหรับระบบกิจกรรมนิสิต ใช้ React + TypeScript + Vite และแบ่งผู้ใช้หลักเป็น 2 role:

- `student`: เข้าดูบัตรนิสิต รายการกิจกรรม และผลรวมการเข้าร่วมกิจกรรม
- `admin`: จัดการนิสิต กิจกรรม คณะ/สาขา การลงทะเบียนกิจกรรม dashboard และรายงานผู้ลงทะเบียน

ระบบใช้ backend API หลักที่ `https://api.rbac-activity.com` ผ่าน wrapper ใน `src/shared/service/axiosInstance.ts`

## Tech Stack

- React 19 + TypeScript
- Vite
- React Router DOM 7
- MUI Material + MUI Icons + MUI X Charts/Date Pickers
- TanStack React Query สำหรับ data fetching/cache
- Jotai สำหรับ global state บางส่วน เช่น theme
- React Hook Form สำหรับ form
- Axios สำหรับเรียก API
- SweetAlert2 และ custom provider สำหรับ popup/flash message
- `html5-qrcode` และ `qrcode.react` สำหรับงาน QR
- `exceljs` สำหรับ export/import งาน Excel บางส่วน

## วิธีรันโปรเจกต์

คำสั่งหลักต้องรันจากโฟลเดอร์ `code`

```bash
cd code
yarn install
yarn dev
```

คำสั่งอื่น:

```bash
yarn build
yarn lint
yarn preview
```

หมายเหตุ: `package.json` ระบุ `packageManager` เป็น `yarn@1.22.22` แต่มีทั้ง `yarn.lock` และ `package-lock.json` อยู่ใน repo ถ้าต้องการลดความสับสนควรเลือกใช้ package manager เดียว โดยตอนนี้แนะนำให้ใช้ yarn ตาม package.json

## Environment และ API

ไฟล์ที่เกี่ยวข้อง:

- `.env`: ถูกอ่านใน `vite.config.ts`
- `.env.version`: มีค่า `VITE_IMAGE_VERSION=1.0.15`
- `src/shared/components/Enum.tsx`: export `ENUM_VERSION` จาก `import.meta.env.VITE_IMAGE_VERSION`
- `src/shared/service/axiosInstance.ts`: ตั้งค่า `HOST_SERVER`
- `src/shared/service/ApiConfig.tsx`: รวม path ของ API แต่ละ module

API base URL ปัจจุบัน:

```ts
export const HOST_SERVER = `https://api.rbac-activity.com`;
```

มี local API ถูก comment ไว้:

```ts
// export const HOST_SERVER = `http://127.0.0.1:8000`;
```

API path หลักใน `ApiConfig`:

- `/admin-auth/v1/login`
- `/student-auth/v1/login`
- `/student/v1`
- `/student/v2`
- `/faculty-majors/v1`
- `/activity/v1`
- `/student_activities/v1`
- `/position/v1`
- `/upload/v1/image-activities`
- `/dashboard/v1`

## Flow การทำงานหลัก

### 1. App bootstrap

ไฟล์เริ่มต้นคือ:

- `src/main.tsx`: mount React app เข้า `#root`
- `src/App.tsx`: ครอบระบบด้วย provider หลัก

Provider ใน `App.tsx`:

- `JotaiProvider`
- `QueryClientProvider`
- `ThemeProvider`
- `CssBaseline`
- `PopupProvider`
- `FlashProvider`
- `AuthRoute`

React Query ถูกตั้งค่า default:

- retry 1 ครั้ง
- ไม่ refetch ตอน window focus

### 2. Routing

ไฟล์ routing หลัก:

- `src/router/router.tsx`: รวม route config, role, path, icon, route name
- `src/router/AuthRoute.tsx`: สร้าง BrowserRouter และ render public/private route
- `src/router/PrivateRoute.tsx`: guard route ที่ต้อง login
- `src/router/RoleRoute.tsx`: guard route ตาม role
- `src/router/PermissionRoute.tsx`: จุดเตรียม logic permission รายเมนู ตอนนี้ `allowed = true`
- `src/router/RoutesByModalFlag.tsx`: หา route name จาก path สำหรับ header/modal route

Flow routing:

1. เข้า `/`
2. `DefaultRedirect` ตรวจ token และ role จาก `useAuth`
3. ถ้าไม่มี token ไป `/auth`
4. ถ้ามี token:
   - admin ไป `/dashboard`
   - student ไป `/student/card`
5. private route ถูกครอบด้วย `PrivateLayoutRoute` หรือ `PrivateBareRoute`
6. `RoleRoute` ตรวจ role ถ้าเข้าผิด role จะ redirect ไป default route ของ role ตัวเอง

### 3. Login และ session

ไฟล์หลัก:

- `src/modules/auth/page/LoginPage.tsx`: หน้า landing/auth
- `src/modules/auth/page/LoginForm.tsx`: form login เลือก tab นิสิต/แอดมิน
- `src/modules/auth/page/Register.tsx`: สมัครนิสิต
- `src/modules/auth/hook/useAuth.ts`: จัดการ login/logout/session
- `src/modules/auth/service/LoginApi.tsx`: เรียก API login/register/faculty
- `src/modules/auth/interface/Login.interface.tsx`: type ของ auth และ student

Login flow:

1. ผู้ใช้เข้า `/auth` หรือ `/login`
2. `LoginForm` เลือก role tab เป็น `student` หรือ `admin`
3. submit form ด้วย `react-hook-form`
4. ถ้าเป็น admin เรียก `getLoginAdmin`
5. ถ้าเป็น student เรียก `getLoginStudent`
6. ถ้า login สำเร็จ `useAuth` จะเรียก `setAuthSession`
7. session ถูกเก็บทั้งใน Cookie และ localStorage
8. redirect ตาม role

ข้อมูล localStorage ที่ใช้:

- `access_token`
- `account_type`
- `account_name`
- `user_id`
- `user_code`

ข้อมูล Cookie ที่ใช้:

- `accessToken`
- `accountName`
- `accountType`
- `userId`
- `user_code`

ข้อควรระวัง: token ปัจจุบันเป็น mock token ที่สร้างใน frontend ด้วย `mock-token-${role}-${Date.now()}` หลังจาก backend login สำเร็จ ไม่ใช่ token จริงจาก API

### 4. Layout และ Sidebar

ไฟล์ layout หลัก:

- `src/shared/components/layouts/Layout.tsx`
- `src/shared/components/layouts/Header.tsx`
- `src/shared/components/layouts/FooterMain.tsx`
- `src/shared/components/layouts/MainContent.tsx`
- `src/shared/components/layouts/SidebarMenu.tsx`
- `src/shared/components/layouts/ModalNavHeader.tsx`
- `src/shared/components/layouts/ModalHeaderContext.tsx`

Route ที่มี `withLayout: true` จะอยู่ใน `Layout` และมี sidebar/header ตาม config

เมนู sidebar ปัจจุบันอ่านจาก `routesConfig.privateRoutes` ใน `src/router/router.tsx` โดยตรง และ filter ตาม `roles` กับ `withLayout`

## Route สำคัญ

Public route:

- `/auth`: หน้า auth landing
- `/login`: หน้า login form
- `/register`: หน้า register
- `*`: not found

Student route:

- `/student/card`: บัตรนิสิต
- `/student/activity`: กิจกรรม
- `/student/summary`: ผลรวมเข้ากิจกรรม

Admin route:

- `/dashboard`: dashboard admin
- `/admin/students`: จัดการนิสิต
- `/admin/activities`: จัดการกิจกรรม
- `/admin/branchfaculty`: จัดการคณะสาขา
- `/admin/student-activities`: ลงทะเบียนกิจกรรม
- `/admin/student-event`: ผู้ลงทะเบียนกิจกรรม
- `/admin/student-report`: รายงานผู้ลงทะเบียน
- `/admin/event`: route กลุ่มสำหรับเมนูจัดการลงทะเบียน ไม่มี element ของตัวเอง และใช้ children

Route ที่มีอยู่แต่ยังไม่เปิดใช้งานหรือยังไม่ถูกใช้เต็ม:

- `/admin/qr-scanner`: มี page อยู่ แต่ใน route config ถูก comment
- `/admin/permissions`: อยู่ใน `AppRoutes` แต่ยังไม่เห็น route page ใน `routesConfig.privateRoutes`
- `/admin/students-last`: อยู่ใน `AppRoutes` แต่ยังไม่ได้ใช้ชัดเจน

## โครงสร้างไฟล์หลัก

```text
code/
  index.html
  package.json
  vite.config.ts
  tsconfig*.json
  eslint.config.js
  public/
  src/
    main.tsx
    App.tsx
    App.css
    index.css
    assets/
    router/
    modules/
    shared/
```

### `src/router`

เก็บ route, guard และ helper ของ routing:

- `router.tsx`: path, role, route config, default route
- `AuthRoute.tsx`: router root ของแอป
- `PrivateRoute.tsx`: ตรวจ token และใส่ layout
- `RoleRoute.tsx`: ตรวจ role
- `PermissionRoute.tsx`: จุดวาง permission รายเมนูในอนาคต
- `RoutesByModalFlag.tsx`: helper หา title จาก path
- `Router.interface.ts`: interface เกี่ยวกับ route

### `src/modules/auth`

ระบบ login/register/session:

- `page/`: `LoginPage`, `LoginForm`, `Register`, `HomePage`
- `hook/`: `useAuth`, `useFaculty`, `usePermission`
- `service/`: `LoginApi`
- `interface/`: type ของ login, student, faculty
- `utils/`: validation สมัครสมาชิก

### `src/modules/student`

หน้าฝั่งนิสิต:

- `StudentMaster`: บัตรนิสิตและข้อมูลนิสิต
- `StudentActivity`: รายการ/รายละเอียดกิจกรรม
- `Dashboard/ActivitySummary`: สรุปผลการเข้าร่วมกิจกรรม

โครงสร้างย่อยของแต่ละ feature มักเป็น:

- `page/`: หน้าหลักของ feature
- `components/page/`: ส่วนประกอบในหน้า
- `hook/`: custom hook สำหรับ fetch/process data
- `service/`: API function
- `interface/`: TypeScript interface

### `src/modules/admin`

หน้าฝั่ง admin:

- `Dashboard_Admin`: dashboard สรุปข้อมูลกิจกรรม/คณะ/ปี
- `Student_Manage`: จัดการนิสิตชุดใหม่ที่ใช้ route `/admin/students`
- `StudentManage`: จัดการนิสิตอีกชุดหนึ่ง มีไฟล์เดิม/มุมมองแยก faculty/major
- `ActivityManage`: จัดการกิจกรรม
- `Faculty_Majors`: จัดการคณะและสาขา
- `Student_Activities`: ลงทะเบียนกิจกรรมนิสิต
- `EventRegistrants`: ผู้ลงทะเบียนกิจกรรม
- `StudentReport`: รายงานผู้ลงทะเบียน/รายงานกิจกรรม
- `Qr_Scanner`: หน้าสแกน QR ที่มีไฟล์อยู่ แต่ route หลักถูก comment
- `Position`: service/hook/interface เกี่ยวกับตำแหน่ง

ข้อควรระวัง: มีทั้ง `Student_Manage` และ `StudentManage` ชื่อคล้ายกัน แต่ route `/admin/students` ปัจจุบันใช้ `Student_Manage/page/Student_ManagePage.tsx`

### `src/shared`

ของกลางที่ใช้ข้าม module:

- `service/axiosInstance.ts`: axios instance และ base URL
- `service/ApiConfig.tsx`: API endpoint constants
- `components/formController/`: component form กลาง เช่น text field, autocomplete, radio, checkbox, switch
- `components/loading/`: loading components
- `components/message/`: flash/alert provider
- `components/popup/`: popup confirm provider
- `components/layouts/`: layout, header, sidebar
- `components/drawer/`, `components/sidebar/`: UI navigation เดิม/เสริม
- `components/UploadImg/`: upload image service/interface
- `components/search/`: search component
- `components/error/FunctionError.ts`: helper error
- `components/swal.ts`: SweetAlert helper
- `store/themeAtom.ts`: Jotai atom สำหรับ theme
- `store/modulesAtom.ts`: ตอนนี้ไฟล์ว่าง
- `utils/theme.tsx`: MUI theme
- `types/menu.ts`: type ของ sidebar menu
- `NotFoundPage.tsx`: หน้า 404

### `src/assets` และ `public`

เก็บรูป โลโก้ ฟอนต์ วิดีโอ และ asset static:

- `src/assets/fonts/IBM_Plex_Sans_Thai/`: ฟอนต์ IBM Plex Sans Thai
- `src/assets/image/`: รูปและโลโก้ที่ import ใน React
- `src/assets/svg/`: icon/svg เฉพาะระบบ
- `src/assets/video/`: วิดีโอหน้า login/RBAC
- `public/`: favicon, logo และ `_redirects`

## Pattern การทำงานของแต่ละ Feature

โดยทั่วไปแต่ละ feature แบ่งแบบนี้:

```text
FeatureName/
  page/          หน้าหลักที่ route เรียก
  components/    component ย่อย เช่น form, table, filter, header
  hook/          custom hook เช่น useFetch...
  service/       function เรียก API
  interface/     TypeScript type/interface
  utils/         validation, option, style เฉพาะ feature
```

เวลาเพิ่ม feature ใหม่ควรยึด pattern นี้ เพื่อให้ค้นหาและแก้ต่อได้ง่าย

## วิธีเพิ่มหน้าใหม่

1. สร้าง module หรือ page ใน `src/modules/...`
2. สร้าง service API ใน `service/` ถ้าต้องเรียก backend
3. สร้าง interface ใน `interface/` แทนการใช้ `any`
4. สร้าง hook ใน `hook/` ถ้ามี logic fetch/filter ซ้ำ
5. เพิ่ม path ใน `AppRoutes` ที่ `src/router/router.tsx`
6. เพิ่ม route object ใน `routesConfig.privateRoutes` หรือ `publicRoutes`
7. ถ้าต้องมี sidebar ให้กำหนด `withLayout: true`, `roles`, `name`, `icon`, และ `key` ใน route object
8. ถ้ามี permission เฉพาะเมนู ให้กำหนด `permissionKey` และต่อ logic ใน `PermissionRoute.tsx`

## ข้อควรระวังเวลาให้ AI ช่วยแก้

- อ่าน README นี้ก่อน แล้วค่อยอ่านไฟล์ที่เกี่ยวกับงานจริง
- อย่าลบของเก่าหรือ refactor กว้างถ้าไม่ได้สั่ง เพราะมีไฟล์เก่า/ไฟล์ทดลองปนอยู่
- ถ้าแก้ route/sidebar ต้องตรวจ `router.tsx` และ `SidebarMenu.tsx`
- ถ้าแก้ login/session ต้องตรวจ `useAuth.ts`, `LoginForm.tsx`, `LoginApi.tsx`
- ถ้าแก้ API ต้องตรวจ `ApiConfig.tsx` และ service ของ module นั้น
- ถ้าแก้ theme/layout ต้องตรวจ `App.tsx`, `theme.tsx`, layout components และ CSS global
- ถ้าแก้หน้านิสิต ให้ดู module ใน `src/modules/student`
- ถ้าแก้หน้า admin ให้ดู module ใน `src/modules/admin`
- ถ้าเจอชื่อคล้ายกัน เช่น `Student_Manage` กับ `StudentManage` ต้องเช็ค route ปัจจุบันก่อนเลือกแก้
- ตอนนี้ permission จริงยังไม่ได้ enforce เพราะ `PermissionRoute.tsx` ตั้ง `allowed = true`
- ตอนนี้ token เป็น mock token ใน frontend หลัง login สำเร็จ ไม่ใช่ JWT/token จริงจาก backend

## Docker และ Deployment

มีไฟล์ Docker ที่ root ของ repo:

- `Dockerfile`
- `docker-compose.yaml`

แต่ source app และ `package.json` อยู่ใน `code/` ขณะที่ Dockerfile root ใช้:

```dockerfile
COPY package.json yarn.lock ./
```

ดังนั้นถ้าจะใช้ Docker จาก root ปัจจุบันควรตรวจ path ก่อน เพราะ Dockerfile อาจต้องย้ายเข้า `code/` หรือปรับ context/build path ให้ตรงกับโครงสร้างจริง

`public/_redirects` มีไว้ช่วย routing สำหรับ static hosting ที่ต้อง fallback SPA route

## บันทึก README เดิม

ส่วนนี้คือเนื้อหา README เดิมจาก Vite template เก็บไว้เพื่ออ้างอิง ไม่ได้ลบทิ้งตามเงื่อนไขให้รักษาของเก่าไว้

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

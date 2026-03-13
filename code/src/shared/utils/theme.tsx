// theme/getTheme.ts
import { createTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type { } from '@mui/x-date-pickers/themeAugmentation';
// ====== ตารางสีจาก Figma ======
const PRIMARY_TONES: ToneRamp = {
    100: '#FFFFFF',
    99: '#FFFDFB',
    98: '#FDF8F7',
    95: '#F5F0EF',
    90: '#E6E1E1',
    80: '#CAC5C5',
    70: '#AEAAAA',
    60: '#93908F',
    50: '#797676',
    40: '#605E5D',
    35: '#545252',
    30: '#484646',
    25: '#3D3B3B',
    20: '#323030',
    15: '#272525',
    10: '#1D1B1B',
    5: '#121111',
    0: '#0B0A0A'
};

const SECONDARY_TONES: ToneRamp = {
    100: '#FFFFFF',
    99: '#FFFDF6',
    98: '#FFF8F2',
    95: '#FFEDD4',
    90: '#FFDF9D',
    80: '#F9BD11',
    70: '#D8A300',
    60: '#B78A00',
    50: '#977100',
    40: '#785A00',
    35: '#6A4E00',
    30: '#5B4300',
    25: '#4D3800',
    20: '#3F2E00',
    15: '#322300',
    10: '#251A00',
    5: '#181000',
    0: '#000000'
};

const TERTIARY_TONES: ToneRamp = {
    100: '#FFFFFF',
    99: '#FFEFFF',
    98: '#FAF8FF',
    95: '#EEF0FF',
    90: '#DBE1FF',
    80: '#B4C5FF',
    70: '#8CA8FF',
    60: '#618BFF',
    50: '#286CFF',
    40: '#0053DA',
    35: '#0048C0',
    30: '#003EA7',
    25: '#00348F',
    20: '#002A77',
    15: '#002061',
    10: '#00174B',
    5: '#000E34',
    0: '#000000'
};

const ERROR_TONES: ToneRamp = {
    100: '#FFFFFF',
    99: '#FFF8FF',
    98: '#FFF8F7',
    95: '#FFEDEA',
    90: '#FFDAD6',
    80: '#FFB4AB',
    70: '#FF897D',
    60: '#FF5449',
    50: '#DE3730',
    40: '#BA1A1A',
    35: '#A80710',
    30: '#93000A',
    25: '#7E0007',
    20: '#690005',
    15: '#540003',
    10: '#410002',
    5: '#2D0001',
    0: '#000000'
};

const NEUTRAL_TONES: ToneRamp = {
    100: '#FFFFFF',
    99: '#F6FEFF',
    98: '#FCF8F8',
    95: '#F4F0EF',
    90: '#E5E2E1',
    80: '#C9C6C5',
    70: '#ADA9A8',
    60: '#929090',
    50: '#787776',
    40: '#5F5E5E',
    35: '#535252',
    30: '#484646',
    25: '#3D3B3B',
    20: '#313030',
    15: '#262625',
    10: '#1C1B1B',
    5: '#111111',
    0: '#0B0A0A'
};

const NEUTRAL_VARIANT_TONES: ToneRamp = {
    100: '#FFFFFF',
    99: '#F6FEFF',
    98: '#FCF8F8',
    95: '#F3F0EF',
    90: '#E5E2E1',
    80: '#C9C6C5',
    70: '#ADABAA',
    60: '#929090',
    50: '#787776',
    40: '#5F5E5E',
    35: '#535252',
    30: '#474646',
    25: '#3C3B3B',
    20: '#313030',
    15: '#262625',
    10: '#1C1B1B',
    5: '#111111',
    0: '#0B0A0A'
};

export const getTheme = (mode: 'light' | 'dark') =>
    createTheme({
        palette: {
            mode,
            primaryTones: PRIMARY_TONES,
            secondaryTones: SECONDARY_TONES,
            tertiaryTones: TERTIARY_TONES,
            errorTones: ERROR_TONES,
            neutralTones: NEUTRAL_TONES,
            neutralVariantTones: NEUTRAL_VARIANT_TONES,
            ...(mode === 'light'
                ? {
                    // ---- PRIMARY ----
                    primary: { main: '#0B0A0A' }, // Primary : สีหลักของแบรนด์ / ปุ่มหลัก
                    onPrimary: '#FFFFFF', // On Primary : สีข้อความ/ไอคอนบนพื้น primary

                    primaryContainer: '#272525', // Primary Container : พื้นหลังบล็อคที่ใช้ primary
                    onPrimaryContainer: '#B4B0B0', // On Primary Container : สีข้อความบน primary container

                    // ---- SECONDARY ----
                    secondary: { main: '#785A00' }, // Secondary : สีรอง (ปุ่มรอง / element เสริม)
                    onSecondary: '#FFFFFF', // On Secondary : ข้อความบน secondary

                    secondaryContainer: '#FBBF14', // Secondary Container : พื้นหลัง container สีรอง
                    onSecondaryContainer: '#483400', // On Secondary Container : ข้อความบน secondary container

                    // ---- TERTIARY ----
                    tertiary: { main: '#014AC5' }, // Tertiary : สีเสริมพิเศษ เช่น accent, link บางจุด
                    onTertiary: '#FFFFFF', // On Tertiary : ข้อความบน tertiary

                    tertiaryContainer: '#0760F7', // Tertiary Container : พื้นหลัง container สี tertiary
                    onTertiaryContainer: '#EDEEFF', // On Tertiary Container : ข้อความบน tertiary container

                    // ---- ERROR ----
                    error: { main: '#BA1A1A' }, // Error : สีหลักของ error (ปุ่ม/ข้อความเด่น)
                    onError: '#FFFFFF', // On Error : ข้อความบนพื้น error

                    errorContainer: '#FFDAD6', // Error Container : พื้นหลังกล่องแจ้ง error
                    onErrorContainer: '#8B363A', // On Error Container : ข้อความบน error container

                    // ---- BACKGROUND / SURFACE ----
                    background: {
                        default: '#FFFFFF', // Background : พื้นหลัง app ทั้งหมด
                        paper: '#FCFCFC' // Paper : พื้นหลัง card / surface ทั่วไป
                    },
                    onBackground: '#1C1B1B', // On Background : ข้อความหลักบนพื้นหลัง

                    surface: '#FCFCFC', // Surface : พื้นผิว component/card
                    onSurface: '#1C1B1B', // On Surface : ข้อความหลักบน surface

                    surfaceVariant: '#F5F5F5', // Surface Variant : พื้นหลังรอง (เช่น list, table header)
                    onSurfaceVariant: '#6B7274', // On Surface Variant : ข้อความบน surface variant

                    // ---- OUTLINE / BORDER / MISC ----
                    outline: '#747878', // Outline : เส้นขอบ/เส้น divider หลัก
                    outlineVariant: '#C0C8CB', // Outline Variant : เส้นขอบรอง / เส้นจาง

                    surfaceTint: '#605E5D', // Surface Tint : สี tint เวลาใช้กับ elevation/overlay
                    shadow: '#0B0A0A', // Shadow : สีของเงา
                    scrim: '#0B0A0A', // Scrim : overlay ทึบ เช่น backdrop ของ dialog

                    // ---- INVERSE (ใช้ใน bottom bar หรือ surface กลับสี) ----
                    inverseSurface: '#313030', // Inverse Surface : พื้นหลังกลับสี (มืดบนพื้นสว่าง)
                    inverseOnSurface: '#F4F0EF', // Inverse On Surface : ข้อความบน inverse surface
                    inversePrimary: '#CAC5C5', // Inverse Primary : primary เวอร์ชันกลับสี

                    // ---- FIXED (ใช้ใน dynamic color / tonal palette) ----
                    primaryFixed: '#E6E1E1', // Primary Fixed : โทน primary ที่คงที่ (ใช้ในบาง component)
                    onPrimaryFixed: '#1D1B1B', // On Primary Fixed : ข้อความบน primary fixed
                    primaryFixedDim: '#CAC5C5', // Primary Fixed Dim : primary fixed ที่หม่นลง
                    onPrimaryFixedVariant: '#484646', // On Primary Fixed Variant : ข้อความบน primary fixed variant

                    secondaryFixed: '#FFF9D9', // Secondary Fixed : โทน secondary คงที่
                    onSecondaryFixed: '#251A00', // On Secondary Fixed : ข้อความบน secondary fixed
                    secondaryFixedDim: '#F9BD11', // Secondary Fixed Dim : secondary fixed ที่หม่นลง
                    onSecondaryFixedVariant: '#5B4300', // On Secondary Fixed Variant : ข้อความบน secondary fixed variant

                    tertiaryFixed: '#DBE1FF', // Tertiary Fixed : โทน tertiary คงที่
                    onTertiaryFixed: '#1356EC', // On Tertiary Fixed : ข้อความบน tertiary fixed
                    tertiaryFixedDim: '#B4C5FF', // Tertiary Fixed Dim : tertiary fixed หม่นลง
                    onTertiaryFixedVariant: '#003EA7', // On Tertiary Fixed Variant : ข้อความบน tertiary fixed variant

                    // ---- SURFACE LEVELS ----
                    surfaceDim: '#F0F0F0', // Surface Dim : พื้นหลังมืดขึ้นเล็กน้อย (ส่วนลึก)
                    surfaceBright: '#FFFFFF', // Surface Bright : พื้นหลังสว่างที่สุด

                    surfaceContainerLowest: '#F8F8F8', // Surface Container Lowest : ชั้น container ล่างสุด
                    surfaceContainerLow: '#F2F2F2', // Surface Container Low : ชั้น container ต่ำ
                    surfaceContainer: '#EBEBEB', // Surface Container : container ปกติ
                    surfaceContainerHigh: '#E5E5E5', // Surface Container High : container สูง
                    surfaceContainerHighest: '#E0E0E0', // Surface Container Highest : container สูงสุด

                    // Success
                    success: { main: '#18874D' },
                    onSuccess: '#FFFFFF', // On Success
                    successContainer: '#C7F4DE', //Success Container
                    onSuccessContainer: '#0A6440', //On Success Container

                    // ✅ Extended Success Variants
                    successVariant0: '#002114',
                    successVariant10: '#004A2A',
                    successVariant20: '#00733F',
                    successVariant30: '#1FAE63',
                    successVariant40: '#49C47F',
                    successVariant50: '#70D89C',
                    successVariant60: '#99EAC0',
                    successVariant70: '#B8F1D2',
                    successVariant80: '#DDFBEA',
                    successVariant90: '#EAFFF3',
                    successVariant100: '#F7FFF9'
                }
                : {
                    // ================== DARK MODE ==================
                    // ---- PRIMARY ----
                    primary: { main: '#CAC5C5' }, // Primary (dark)
                    onPrimary: '#323030', // On Primary (dark)

                    primaryContainer: '#070606', // Primary Container (dark)
                    onPrimaryContainer: '#9C9898', // On Primary Container (dark)

                    // ---- SECONDARY ----
                    secondary: { main: '#FFE2A7' }, // Secondary (dark)
                    onSecondary: '#3F2E00', // On Secondary (dark)

                    secondaryContainer: '#ECB200', // Secondary Container (dark)
                    onSecondaryContainer: '#3C2B00', // On Secondary Container (dark)

                    // ---- TERTIARY ----
                    tertiary: { main: '#B4C5FF' }, // Tertiary (dark)
                    onTertiary: '#002A77', // On Tertiary (dark)

                    tertiaryContainer: '#0760F7', // Tertiary Container (dark)
                    onTertiaryContainer: '#EDEEFF', // On Tertiary Container (dark)

                    // ---- ERROR ----
                    error: { main: '#FFDAD6' }, // Error (dark) — พื้น error หลัก
                    onError: '#690005', // On Error (dark) — ข้อความบน error

                    errorContainer: '#93000A', // Error Container (dark)
                    onErrorContainer: '#FFDAD6', // On Error Container (dark)

                    // ---- BACKGROUND / SURFACE ----
                    background: {
                        default: '#252525', // Background (dark)
                        paper: '#2B2B2B' // Paper/Surface พื้นหลัง card (dark)
                    },
                    onBackground: '#F1F0EF', // On Background (dark)

                    surface: '#2B2B2B', // Surface (dark)
                    onSurface: '#F3F3F3', // On Surface (dark)

                    surfaceVariant: '#333333', // Surface Variant (dark)
                    onSurfaceVariant: '#D0D3D4', // On Surface Variant (dark)

                    // ---- OUTLINE / BORDER / MISC ----
                    outline: '#A1A3A5', // Outline (dark)
                    outlineVariant: '#55595A', // Outline Variant (dark)

                    surfaceTint: '#D4CFCF', // Surface Tint (dark)
                    shadow: '#0B0A0A', // Shadow (dark)
                    scrim: '#000000', // Scrim (dark)

                    // ---- INVERSE ----
                    inverseSurface: '#F0FEEE', // Inverse Surface (พื้นสว่างบน theme มืด)
                    inverseOnSurface: '#3A3A3A', // Inverse On Surface (ข้อความบน inverse surface)
                    inversePrimary: '#605E5D', // Inverse Primary (dark)

                    // ---- FIXED ----
                    primaryFixed: '#E6E1E1', // Primary Fixed (dark)
                    onPrimaryFixed: '#1D1B1B', // On Primary Fixed (dark)
                    primaryFixedDim: '#CAC5C5', // Primary Fixed Dim (dark)
                    onPrimaryFixedVariant: '#484646', // On Primary Fixed Variant (dark)

                    secondaryFixed: '#FFF9D9', // Secondary Fixed (dark)
                    onSecondaryFixed: '#251A00', // On Secondary Fixed (dark)
                    secondaryFixedDim: '#F9BD11', // Secondary Fixed Dim (dark)
                    onSecondaryFixedVariant: '#5B4300', // On Secondary Fixed Variant (dark)

                    tertiaryFixed: '#DBE1FF', // Tertiary Fixed (dark)
                    onTertiaryFixed: '#1356EC', // On Tertiary Fixed (dark)
                    tertiaryFixedDim: '#B4C5FF', // Tertiary Fixed Dim (dark)
                    onTertiaryFixedVariant: '#003EA7', // On Tertiary Fixed Variant (dark)

                    // ---- SURFACE LEVELS ----
                    surfaceDim: '#222222', // Surface Dim (dark)
                    surfaceBright: '#393939', // Surface Bright (dark)

                    surfaceContainerLowest: '#2E2E2E', // Surface Container Lowest (dark)
                    surfaceContainerLow: '#353535', // Surface Container Low (dark)
                    surfaceContainer: '#3E3E3E', // Surface Container (dark)
                    surfaceContainerHigh: '#454545', // Surface Container High (dark)
                    surfaceContainerHighest: '#404040', // Surface Container Highest (dark)

                    // Success
                    success: { main: '#99EAC0' },
                    onSuccess: '#003921', // On Success
                    successContainer: '#00733F', //Success Container
                    onSuccessContainer: '#B8F1D2', //On Success Container

                    // ✅ Extended Success Variants (ใช้เซ็ตเดียวกับ Light)
                    successVariant0: '#002114',
                    successVariant10: '#004A2A',
                    successVariant20: '#00733F',
                    successVariant30: '#1FAE63',
                    successVariant40: '#49C47F',
                    successVariant50: '#70D89C',
                    successVariant60: '#99EAC0',
                    successVariant70: '#B8F1D2',
                    successVariant80: '#DDFBEA',
                    successVariant90: '#EAFFF3',
                    successVariant100: '#F7FFF9'
                })
        },
        typography: {
            fontFamily: ['IBM Plex Sans', 'IBMPlexSansThai'].join(','),
            fontSize: 16,
            h1: {
                fontWeight: 700,
                fontSize: '88px',
                lineHeight: '180%',
                letterSpacing: '1.5px'
            },
            h2: {
                fontWeight: 700,
                fontSize: '56px',
                lineHeight: '180%',
                letterSpacing: '0.5px'
            },
            h3: {
                fontWeight: 500,
                fontSize: '28px',
                lineHeight: '180%'
            },
            h4: {
                fontWeight: 700,
                fontSize: '34px',
                lineHeight: '170%',
                letterSpacing: '0.25px'
            },
            h5: {
                fontWeight: 500,
                fontSize: '24px',
                lineHeight: '32px'
            },
            h6: {
                fontWeight: 500,
                fontSize: '22px',
                lineHeight: '170%'
            },
            subtitle1: {
                fontWeight: 500,
                fontSize: '16px'
            },
            subtitle2: {
                fontWeight: 400,
                fontSize: '16px'
            },
            body1: {
                fontWeight: 500,
                fontSize: '14px'
            },
            body2: {
                fontWeight: 400,
                fontSize: '14px'
            },
            caption: {
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '140%',
                letterSpacing: '1px'
            },
            button: {
                fontWeight: 500,
                fontSize: '14px'
            }
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: (theme) => ({
                    // ✅ gradient เฉพาะ light (ของเดิมคุณ)
                    body: theme.palette.mode === 'light' ? { background: 'linear-gradient(90deg, #3676ff 0%, #22bfff 100%)' } : {},
                    fontFamily: ["IBM Plex Sans", "IBMPlexSansThai"].join(","),
                    // ✅ กำหนด CSS variables ของ react-pro-sidebar ตาม theme (มีผลทุก Sidebar)
                    // ':root': {
                    //     '--ps-sidebar-bg-color': theme.palette.background.paper,
                    //     '--ps-sidebar-color': theme.palette.text.primary,
                    //     '--ps-sidebar-border-color': theme.palette.divider,

                    //     '--ps-menuitem-active-bg-color': theme.palette.action.selected,
                    //     '--ps-menuitem-active-color': theme.palette.text.primary,

                    //     '--ps-menuitem-hover-bg-color': theme.palette.action.hover,
                    //     '--ps-menuitem-hover-color': theme.palette.text.primary,
                    // },

                    ':root': {
                        '--ps-sidebar-bg-color': theme.palette.background.paper,
                        '--ps-sidebar-color': theme.palette.text.primary,
                        '--ps-sidebar-border-color': theme.palette.divider,

                        // ❌ ของเดิม
                        // '--ps-menuitem-active-bg-color': theme.palette.action.selected,
                        // '--ps-menuitem-active-color': theme.palette.text.primary,

                        // ✅ ใช้โทนเดียวกับที่ SidebarContent ใช้
                        '--ps-menuitem-active-bg-color': theme.palette.secondaryContainer,
                        '--ps-menuitem-active-color': theme.palette.onSecondaryContainer,

                        '--ps-menuitem-hover-bg-color': theme.palette.action.hover,
                        '--ps-menuitem-hover-color': theme.palette.text.primary
                    },

                    // ✅ เผื่อบางเวอร์ชัน: บังคับพื้นหลัง/ตัวอักษรที่ root ของ sidebar
                    '.ps-sidebar-root': {
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        borderRight: `1px solid ${theme.palette.divider}`
                    },

                    // ✅ สีปุ่มเมนู/โฮเวอร์ ให้ไปตาม theme
                    '.ps-menu-root .ps-menu-button': {
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.background.paper
                    },
                    '.ps-menu-root .ps-menu-button:hover': {
                        backgroundColor: theme.palette.action.hover,
                        color: theme.palette.text.primary
                    },
                    '.ps-menu-root .ps-menu-button.ps-active': {
                        // ❌ ของเดิม
                        // backgroundColor: theme.palette.action.selected,
                        // color: theme.palette.text.primary,

                        // ✅ ให้ตรงกับ design
                        backgroundColor: theme.palette.secondaryContainer,
                        color: theme.palette.onSecondaryContainer,
                    },

                    // (ถ้ามี submenu)
                    '.ps-submenu-content': {
                        backgroundColor: theme.palette.background.paper
                    },

                    '*:focus-visible': {
                        // outline: 'none !important'
                        outline: "none"
                    },
                    '.MuiIconButton-root.Mui-focusVisible': {
                        outline: 'none !important',
                        boxShadow: 'none !important'
                    },
                    '.MuiButtonBase-root.Mui-focusVisible': {
                        outline: 'none !important',
                        boxShadow: 'none !important'
                    },

                    ".form-error-focus": {
                        // อยากให้เด่นขึ้นก็ใส่ได้
                        outline: "2px solid rgba(186, 26, 26, 0.6)",
                        outlineOffset: "2px",
                        borderRadius: "8px",
                        scrollMarginTop: "100px",
                    },
                })
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        // ปิดทุกแบบของ focus ที่ MUI ใส่มาให้
                        '&.Mui-focusVisible': {
                            outline: 'none !important',
                            boxShadow: 'none !important'
                        },
                        '&:focus-visible': {
                            outline: 'none !important',
                            boxShadow: 'none !important'
                        },
                        '&:focus': {
                            outline: 'none !important',
                            boxShadow: 'none !important'
                        }
                    }
                }
            },
            MuiRadio: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        color: theme.palette.onSurfaceVariant,
                        '&.Mui-checked': {
                            color: theme.palette.secondaryContainer
                        }
                    })
                }
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        color: theme.palette.onSecondaryContainer, // สีตอนยังไม่ check
                        '&.Mui-checked': {
                            color: theme.palette.secondaryContainer // สีตอน checked
                        }
                    })
                }
            },
            MuiSwitch: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        width: 58,
                        height: 28,
                        padding: 0,
                        display: 'flex',
                        // ฐานสวิตช์ (ปุ่มกลมที่ลากได้)
                        '& .MuiSwitch-switchBase': {
                            padding: 4,
                            transitionDuration: '200ms',
                            '&.Mui-checked': {
                                transform: 'translateX(17px)',
                                color: theme.palette.onPrimary,

                                '& + .MuiSwitch-track': {
                                    backgroundColor: theme.palette.secondaryContainer,
                                    opacity: 1,
                                    border: 'none'
                                }
                            }
                        },
                        // thumb ตอน "ปิด"
                        '& .MuiSwitch-thumb': {
                            width: 20,
                            height: 12,
                            borderRadius: 24,
                            marginTop: 4,
                            marginLeft: 3,
                            boxShadow: 'none',
                            backgroundColor: theme.palette.outline
                        },
                        // thumb ตอน "เปิด"
                        '& .Mui-checked .MuiSwitch-thumb': {
                            width: 28,
                            height: 20,
                            marginTop: 0,
                            backgroundColor: theme.palette.onPrimary
                        },
                        // รางสวิตช์
                        '& .MuiSwitch-track': {
                            borderRadius: 100,
                            backgroundColor: theme.palette.surfaceContainerHighest,
                            opacity: 1,
                            border: `2px solid ${theme.palette.outline}`,
                            boxSizing: 'border-box',
                            transition: theme.transitions.create(['background-color'], {
                                duration: 200
                            })
                        }
                    })
                }
            },
            // MuiLink: {
            //     styleOverrides: {
            //         root: ({ theme }) => ({
            //             color: theme.palette.secondaryContainer,
            //             '&:hover': {
            //                 textDecoration: 'underline'
            //             }
            //         })
            //     }
            // },
            MuiLink: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        color: theme.palette.primary.main, // สีปกติ
                        cursor: 'pointer',

                        // --- ปิดสีน้ำเงินของลิงก์ทุก state ---
                        '&:visited': {
                            color: theme.palette.primary.main,
                        },
                        '&:active': {
                            color: theme.palette.primary.dark,
                        },
                        '&:hover': {
                            color: theme.palette.primary.dark,
                            textDecoration: 'underline',
                        },
                        '&:focus': {
                            color: theme.palette.primary.main,
                            outline: 'none',
                        },
                    }),
                },
            },
            MuiPaginationItem: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        '&.Mui-selected': {
                            backgroundColor: theme.palette.secondaryContainer,
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#e0aa10'
                            }
                        }
                    })
                }
            },
            MuiStepIcon: {
                styleOverrides: {
                    root: {
                        color: '#BDBDBD',
                        '&.Mui-active': {
                            color: '#FBBF14'
                        },
                        '&.Mui-completed': {
                            color: '#FBBF14'
                        }
                    }
                }
            },
            MuiButton: {
                defaultProps: {
                    color: 'secondary'
                },
                styleOverrides: {
                    root: ({ theme }) => ({
                        borderRadius: '4px',
                        fontWeight: 500,
                        transition: 'all 200ms ease',
                        boxShadow: 'none',

                        outline: 'none',
                        '&:hover': {
                            borderRadius: '8px',
                            boxShadow: 'none'
                        },
                        '&:focus': {
                            outline: 'none'
                        },
                        '&:focus-visible': {
                            outline: 'none',
                            boxShadow: 'none'
                        },
                        '&.Mui-focusVisible': {
                            outline: 'none',
                            boxShadow: 'none'
                        },

                        '&.Mui-disabled': {
                            // background: theme.palette.secondaryContainer,
                            // color: theme.palette.onSecondaryContainer
                        }
                    }),
                    sizeSmall: {
                        fontSize: 14,
                        height: 40
                    },
                    sizeMedium: {
                        fontSize: 16,
                        height: 36
                    },
                    sizeLarge: {
                        fontSize: 20,
                        height: 44
                    },
                    outlinedSecondary: ({ theme }) => ({
                        borderColor: theme.palette.grey[300],
                        color: 'black',
                        '&:hover': {
                            borderColor: theme.palette.grey[300],
                            backgroundColor: 'transparent'
                        },
                        '&:active': {
                            borderColor: theme.palette.grey[300],
                            backgroundColor: 'transparent'
                        },
                        '&.Mui-focusVisible': {
                            borderColor: theme.palette.grey[300]
                        }
                    })
                    // outlinedPrimary: ({ theme }) => ({
                    //     borderColor: theme.palette.grey[300],
                    //     color: 'black',
                    //     '&:hover': {
                    //         borderColor: theme.palette.grey[300],
                    //         backgroundColor: 'transparent',
                    //     },
                    //     '&:active': {
                    //         borderColor: theme.palette.grey[300],
                    //         backgroundColor: 'transparent',
                    //     },
                    //     '&.Mui-focusVisible': {
                    //         borderColor: theme.palette.grey[300],
                    //     },
                    // }),
                },
                variants: [
                    {
                        props: { variant: 'contained', color: 'secondary' },
                        style: ({ theme }) => ({
                            fontSize: 16,
                            backgroundColor: theme.palette.secondaryContainer,
                            color: theme.palette.onSecondaryContainer,
                            '&:focus, &.Mui-focusVisible': { outline: 'none', boxShadow: 'none' },
                            '&:hover': {
                                // backgroundColor: '#d19f0f'
                                backgroundColor: theme.palette.secondary.main
                            }
                        })
                    },
                    {
                        props: { variant: 'outlined', color: 'secondary' },
                        style: ({ theme }) => ({
                            fontSize: 16,
                            borderColor: theme.palette.grey[300],
                            color: 'black',
                            '&:hover': {
                                borderColor: theme.palette.grey[300],
                                backgroundColor: 'transparent'
                            },
                            '&:active': {
                                borderColor: theme.palette.grey[300]
                            }
                        })
                    },
                    {
                        props: { variant: 'contained', color: 'primary' },
                        style: ({ theme }) => ({
                            fontSize: 16,
                            backgroundColor: theme.palette.surfaceContainerLowest,
                            borderColor: theme.palette.surfaceContainerLowest,
                            color: theme.palette.tertiary,
                            '&:focus, &.Mui-focusVisible': { outline: 'none', boxShadow: 'none' },
                            '&:hover': {
                                backgroundColor: theme.palette.tertiaryFixed
                            }
                        })
                    },
                    {
                        props: { variant: 'outlined', color: 'primary' },
                        style: ({ theme }) => ({
                            fontSize: 16,
                            borderColor: theme.palette.grey[300],
                            color: 'black',
                            '&:hover': {
                                borderColor: theme.palette.grey[300],
                                backgroundColor: 'transparent'
                            },
                            '&:active': {
                                borderColor: theme.palette.grey[300]
                            }
                        })
                    },
                    {
                        props: { variant: 'contained', color: 'inherit' },
                        style: {
                            fontSize: 14,
                            backgroundColor: '#a2a2a2',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#a2a2a2'
                            }
                        }
                    },
                    {
                        props: { variant: 'contained', color: 'warning' },
                        style: ({ theme }) => ({
                            fontSize: 16,
                            backgroundColor: theme.palette.surfaceContainerLowest,
                            borderColor: theme.palette.surfaceContainerLowest,
                            color: theme.palette.tertiary.main,
                            '&:focus, &.Mui-focusVisible': { outline: 'none', boxShadow: 'none' },
                            '&:hover': {
                                backgroundColor: theme.palette.tertiaryFixed
                            }
                        })
                        // style: {
                        //     fontSize: 14,
                        //     backgroundColor: '#FAFAFA', // สีพื้นหลังที่ต้องการ
                        //     color: '#00677D', // สีตัวอักษร
                        //     '&:hover': {
                        //         backgroundColor: '#FAFAFA' // สี hover (เข้มขึ้น)
                        //     }
                        // }
                    },
                    {
                        props: { variant: 'contained', color: 'error' },
                        style: {
                            fontSize: 14,
                            backgroundColor: '#BA2A2A', // สีพื้นหลังที่ต้องการ
                            color: '#FAFAFA', // สีตัวอักษร
                            '&:hover': {
                                backgroundColor: '#BA1A1A' // สี hover (เข้มขึ้น)
                            }
                        }
                    },
                    {
                        props: { variant: 'outlined', color: 'error' },
                        style: ({ theme }) => ({
                            fontSize: 16,
                            backgroundColor: theme.palette.surfaceContainerLowest, // สีพื้นหลังที่ต้องการ
                            color: theme.palette.errorTones[60], // สีตัวอักษร
                            '&:focus, &.Mui-focusVisible': { outline: 'none', boxShadow: 'none' }
                        })
                    },
                    {
                        props: { variant: 'text', color: 'info' },
                        style: ({ theme }) => ({
                            fontSize: 16,
                            color: (theme.palette.info as any)['200']
                        })
                    },
                    {
                        props: { variant: 'contained', color: 'info' },
                        style: ({ theme }) => ({
                            fontSize: 16,
                            backgroundColor: theme.palette.surfaceContainerLowest,
                            color: theme.palette.tertiary.main,
                            '&:focus, &.Mui-focusVisible': { outline: 'none', boxShadow: 'none', },
                            '&:hover': {
                                backgroundColor: 'rgba(73, 69, 79, 0.08)'
                            }
                        })
                    }
                ]
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        // sync กับตัว input ผ่าน CSS var เดียวกัน
                        fontSize: '16px',
                        fontWeight: 400,
                        color: `${theme.palette.onSurfaceVariant} !important`,
                        '&.MuiFormLabel-filled': {
                            // ตอนมีค่าใน input

                            color: `${theme.palette.onSurface} !important`
                        },
                        '&.Mui-focused': {
                            color: `${theme.palette.onSurface} !important`
                        }
                    })
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        minHeight: 56,
                        borderRadius: 10,

                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.divider,
                            borderWidth: 1
                        },

                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.text.primary,
                            borderWidth: 2
                        },

                        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.error.main,
                            borderWidth: 2
                        },

                        '&.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.error.main,
                            borderWidth: 2
                        }
                    }),
                    input: ({ theme }) => ({
                        color: theme.palette.onSurface,
                        fontSize: '16px',
                        fontWeight: 400
                    })
                }
            },
            MuiTextField: {
                defaultProps: {
                    variant: 'outlined'
                },
                styleOverrides: {
                    root: ({ theme }) => ({
                        // ทำให้ disabled ไม่โปร่ง
                    }),
                }
            },
            MuiFilledInput: {
                defaultProps: {
                    disableUnderline: true,
                },
                styleOverrides: {
                    root: ({ theme }) => ({
                        fontFamily: ['IBM Plex Sans', 'IBMPlexSansThai'].join(','),
                        fontSize: 16,
                        fontWeight: 400,
                        height: 56,
                        borderRadius: 6,
                        // 👇 ตรงนี้เอา !important ออก หรือใส่สีปกติแทน
                        backgroundColor: 'transparent',
                        border: `1px solid ${theme.palette.outlineVariant}`,

                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                        '&.Mui-focused': {
                            backgroundColor: 'transparent',
                            borderColor: theme.palette.text.primary,
                            borderWidth: 1,
                        },
                        '&.Mui-error': {
                            borderColor: theme.palette.error.main,
                        },

                        '&.Mui-error.Mui-focused': {
                            borderColor: theme.palette.error.main,
                            borderWidth: 2,
                        },

                        '&:before, &:after, &:hover:before, &.Mui-disabled:before': {
                            borderBottom: 'none',
                        },

                        '& .MuiAutocomplete-inputRoot.MuiFilledInput-root:hover': {
                            backgroundColor: 'transparent',
                        },

                        // ✅ disabled ทึบ
                        '&.Mui-disabled': {
                            backgroundColor: theme.palette.action.disabledBackground, // หรือ theme.palette.action.disabledBackground
                            opacity: 1,
                            color: theme.palette.text.disabled,
                            borderColor: theme.palette.outlineVariant,
                        },
                        '&.Mui-disabled .MuiInputBase-input': {
                            WebkitTextFillColor: theme.palette.text.disabled,
                        },
                    }),

                    input: ({ theme }) => ({
                        color: theme.palette.onSurface,
                        '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus': {
                            WebkitBoxShadow: '0 0 0px 1000px transparent inset',
                            WebkitTextFillColor: theme.palette.onSurface,
                            caretColor: theme.palette.onSurface,
                            transition: 'background-color 9999s ease-out 0s',
                        },
                    }),
                },
            },
            MuiAutocomplete: {
                defaultProps: {
                    // ให้ Popper/เมนูสูงกว่าบาง layout
                    disablePortal: false,
                    autoHighlight: true
                },
                styleOverrides: {
                    // กล่องเมนู (Paper ภายใน Popper)
                    paper: ({ theme }) => ({
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: theme.shadows[4]
                    }),
                    option: ({ theme }) => ({
                        backgroundColor: 'transparent',
                        color: theme.palette.text.primary,
                        // โฮเวอร์
                        '&.Mui-focused': {
                            backgroundColor: theme.palette.action.hover
                        },
                        // ถูกเลือก (active จาก keyboard)
                        '&[aria-selected="true"]': {
                            backgroundColor: theme.palette.action.selected
                        },
                        // disabled
                        '&.Mui-disabled': {
                            opacity: 0.6
                        }
                    }),
                    // tag (chip) เมื่อเป็น multiple
                    tag: ({ theme }) => ({
                        color: theme.palette.text.primary,
                        '& .MuiChip-deleteIcon': {
                            color: theme.palette.text.primary,
                            '&:hover': { color: theme.palette.text.primary }
                        }
                    }),
                    // กล่อง root (รอบ ๆ input) — เผื่ออยากให้พื้นหลังเป็น paper เสมอ
                    root: ({ theme }) => ({
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.text.primary
                        },
                        '& .MuiInputBase-input': {
                            color: theme.palette.text.primary
                        },
                        '& .MuiInputLabel-root': {
                            color: theme.palette.text.secondary
                        },
                        '&::placeholder': {
                            fontSize: '16px',
                            fontWeight: 500,
                            lineHeight: '24px',
                            color: '#0B0A0A',
                            opacity: 1 // ต้องใส่ opacity=1 เพราะ MUI มี default = 0.42
                        }
                    }),
                    // ไอคอนเปิด/ปิด popup & clear
                    popupIndicator: ({ theme }) => ({
                        color: theme.palette.text.secondary,
                        '&:hover': { color: theme.palette.text.primary }
                    }),
                    clearIndicator: ({ theme }) => ({
                        color: theme.palette.text.secondary,
                        '&:hover': { color: theme.palette.text.primary }
                    }),
                    // กลุ่มหัวข้อ (ถ้าใช้ groupBy)
                    groupLabel: ({ theme }) => ({
                        backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
                        color: theme.palette.text.secondary,
                        fontWeight: 600
                    })
                }
            },
            MuiChip: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        color: theme.palette.onPrimaryFixed,
                        backgroundColor: theme.palette.primaryFixed,
                        // border: `1px solid ${theme.palette.divider}`
                    })
                }
            },
            MuiTabs: {
                styleOverrides: {
                    indicator: ({ theme }) => ({
                        backgroundColor: theme.palette.text.primary, // ไม่เหลือง
                        height: 2
                    })
                }
            },
            MuiTab: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        textTransform: 'none',
                        minWidth: 0,
                        color: theme.palette.onSurfaceVariant, // สีของ Tab "ที่ยังไม่ถูกเลือก"
                        fontSize: 16,
                        fontWeight: 500,

                        '&.Mui-selected': {
                            color: theme.palette.onSurface // สีของ Tab ที่ถูกเลือก
                        },
                        '&:focus': {
                            outline: 'none'
                        },
                        '&:not(.Mui-selected)': {
                            color: theme.palette.onSurfaceVariant // เผื่อย้ำอีกทีตอน unselected
                        }
                    })
                }
            },
            // ====== Date Picker (MUI X) ======
            MuiPickersPopper: {
                styleOverrides: {
                    paper: ({ theme }: { theme: Theme }) => ({
                        borderRadius: 16,
                        border: `1px solid ${theme.palette.outlineVariant}`,
                        overflow: 'hidden',
                    }),
                },
            },
            MuiPickersYear: {
                styleOverrides: {
                    root: {
                        display: "flex",
                        flexWrap: "wrap",
                        // paddingLeft: 16,
                        // paddingRight: 16,
                        // rowGap: 14,
                        // columnGap: 14,
                        justifyContent: "flex-start",
                    },

                    yearButton: ({ theme }: { theme: Theme }) => ({
                        minWidth: 0,           // ✅ สำคัญ: ห้ามดันให้แตกคอลัมน์
                        borderRadius: 999,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: 1,
                        fontWeight: 400,

                        // ✅ ปิดวงฟ้า/ดำ + ripple
                        outline: "none",
                        boxShadow: "none",
                        "&:focus, &:focus-visible, &.Mui-focusVisible": { outline: "none", boxShadow: "none" },
                        "& .MuiTouchRipple-root": { display: "none" },

                        // ✅ selected เหลืองแบบรูปที่ 3
                        "&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus, &.Mui-selected.Mui-focusVisible": {
                            backgroundColor: `${theme.palette.secondaryContainer} !important`,
                            color: `${theme.palette.onSecondaryContainer} !important`,
                            fontWeight: 500,
                        },

                        // hover ปกติ (ถ้าอยากให้มี)
                        "&:hover": {
                            backgroundColor: theme.palette.secondaryFixedDim,
                        },
                    }),
                },
            },
            MuiPickersMonth: {
                styleOverrides: {

                    monthButton: ({ theme }: { theme: Theme }) => ({
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 400,
                        // ✅ ปิดวงฟ้า/ดำ + ripple
                        outline: "none",
                        boxShadow: "none",
                        "&:focus, &:focus-visible, &.Mui-focusVisible": { outline: "none", boxShadow: "none" },
                        "& .MuiTouchRipple-root": { display: "none" },

                        // ✅ selected เหลืองแบบรูปที่ 3
                        "&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus, &.Mui-selected.Mui-focusVisible": {
                            backgroundColor: `${theme.palette.secondaryContainer} !important`,
                            color: `${theme.palette.onSecondaryContainer} !important`,
                            fontWeight: 500,
                        },

                        // hover ปกติ (ถ้าอยากให้มี)
                        "&:hover": {
                            backgroundColor: theme.palette.secondaryFixedDim,
                        },
                    }),
                },
            },
            MuiPickersDay: {
                styleOverrides: {
                    root: ({ theme }: { theme: Theme }) => ({
                        // borderRadius: 999,
                        fontWeight: 400,
                        // ✅ selected ครอบทุก state (กันโดน default primary ทำเป็นดำ)
                        "&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus, &.Mui-selected.Mui-focusVisible": {
                            backgroundColor: `${theme.palette.secondaryContainer} !important`,
                            color: `${theme.palette.onSecondaryContainer} !important`,
                            fontWeight: 500,
                        },

                        // ✅ hover วันปกติ (optional)
                        "&:hover": {
                            backgroundColor: theme.palette.secondaryFixedDim,
                            color: theme.palette.onSecondaryContainer,
                        },

                        // ✅ today ring (optional)
                        "&.MuiPickersDay-today": {
                            borderColor: theme.palette.secondaryContainer,
                        },

                        "&:focus": { outline: "none", boxShadow: "none" },
                        "&:focus-visible": { outline: "none", boxShadow: "none" },
                        "&.Mui-focusVisible": { outline: "none", boxShadow: "none" },
                    }),
                },
            },
        }
    });
export default getTheme;

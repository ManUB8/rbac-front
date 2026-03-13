
// src/theme/mui-palette.d.ts
import '@mui/material/styles';

declare global {
  type ToneRamp = {
    0: string;
    5: string;
    10: string;
    15: string;
    20: string;
    25: string;
    30: string;
    35: string;
    40: string;
    50: string;
    60: string;
    70: string;
    80: string;
    90: string;
    95: string;
    98: string;
    99: string;
    100: string;
  };
}

declare module '@mui/material/styles' {

  // ========= 1) Palette ปกติ: theme.palette.xxx =========
  interface Palette {
    // --- สีหลักตาม Material 3 ของนาย ---

    // Primary
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;

    // Secondary
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;

    // Tertiary
    tertiary: Palette['primary'];
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;

    // Error
    onError: string;
    errorContainer: string;
    onErrorContainer: string;

    // Background / Surface
    onBackground: string;

    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;

    // Outline / outlineVariant
    outline: string;
    outlineVariant: string;

    // Surface levels (จากตาราง Figma)
    surfaceDim: string;
    surfaceBright: string;
    surfaceContainerLowest: string;
    surfaceContainerLow: string;
    surfaceContainer: string;
    surfaceContainerHigh: string;
    surfaceContainerHighest: string;

    // Success
    onSuccess: string // On Success
    successContainer: string  //Success Container
    onSuccessContainer: string //On Success Container

    // ✅ Extended Success Variants
    successVariant0: string;
    successVariant10: string;
    successVariant20: string;
    successVariant30: string;
    successVariant40: string;
    successVariant50: string;
    successVariant60: string;
    successVariant70: string;
    successVariant80: string;
    successVariant90: string;
    successVariant100: string;

    primaryTones: ToneRamp;
    secondaryTones: ToneRamp;
    tertiaryTones: ToneRamp;
    errorTones: ToneRamp;
    neutralTones: ToneRamp;
    neutralVariantTones: ToneRamp;

    tertiaryFixed: string;
    onTertiaryFixed: string;
    tertiaryFixedDim: string;
    onTertiaryFixedVariant: string;

    surfaceTint: string;
    shadow: string;
    scrim: string;

    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;

    primaryFixed: string;
    onPrimaryFixed: string;
    primaryFixedDim: string;
    onPrimaryFixedVariant: string;

    secondaryFixed: string;
    onSecondaryFixed: string;
    secondaryFixedDim: string;
    onSecondaryFixedVariant: string;
  }

  interface PaletteOptions {
    onPrimary?: string;
    primaryContainer?: string;
    onPrimaryContainer?: string;

    onSecondary?: string;
    secondaryContainer?: string;
    onSecondaryContainer?: string;

    tertiary?: PaletteOptions['primary'];
    onTertiary?: string;
    tertiaryContainer?: string;
    onTertiaryContainer?: string;

    onError?: string;
    errorContainer?: string;
    onErrorContainer?: string;

    onBackground?: string;

    surface?: string;
    onSurface?: string;
    surfaceVariant?: string;
    onSurfaceVariant?: string;

    outline?: string;
    outlineVariant?: string;

    surfaceDim?: string;
    surfaceBright?: string;
    surfaceContainerLowest?: string;
    surfaceContainerLow?: string;
    surfaceContainer?: string;
    surfaceContainerHigh?: string;
    surfaceContainerHighest?: string;

    // Success
    onSuccess: string // On Success
    successContainer: string  //Success Container
    onSuccessContainer: string //On Success Container

    // ✅ Extended Success Variants
    successVariant0: string;
    successVariant10: string;
    successVariant20: string;
    successVariant30: string;
    successVariant40: string;
    successVariant50: string;
    successVariant60: string;
    successVariant70: string;
    successVariant80: string;
    successVariant90: string;
    successVariant100: string;

    primaryTones?: Partial<ToneRamp>;
    secondaryTones?: Partial<ToneRamp>;
    tertiaryTones?: Partial<ToneRamp>;
    errorTones?: Partial<ToneRamp>;
    neutralTones?: Partial<ToneRamp>;
    neutralVariantTones?: Partial<ToneRamp>;
    tertiaryFixed: string;
    onTertiaryFixed: string;
    tertiaryFixedDim: string;
    onTertiaryFixedVariant: string;

    surfaceTint: string;
    shadow: string;
    scrim: string;

    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;

    primaryFixed: string;
    onPrimaryFixed: string;
    primaryFixedDim: string;
    onPrimaryFixedVariant: string;

    secondaryFixed: string;
    onSecondaryFixed: string;
    secondaryFixedDim: string;
    onSecondaryFixedVariant: string;
  }

  // ========= 2) CssVarsPalette: ถ้า theme เป็น CssVarsTheme =========
  // (createThemeWithVars / extendTheme ฯลฯ)
  interface CssVarsPalette {
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;

    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;

    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;

    onError: string;
    errorContainer: string;
    onErrorContainer: string;

    onBackground: string;

    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;

    outline: string;
    outlineVariant: string;

    surfaceDim: string;
    surfaceBright: string;
    surfaceContainerLowest: string;
    surfaceContainerLow: string;
    surfaceContainer: string;
    surfaceContainerHigh: string;
    surfaceContainerHighest: string;

    // Success
    onSuccess: string // On Success
    successContainer: string  //Success Container
    onSuccessContainer: string //On Success Container

    // ✅ Extended Success Variants
    successVariant0: string;
    successVariant10: string;
    successVariant20: string;
    successVariant30: string;
    successVariant40: string;
    successVariant50: string;
    successVariant60: string;
    successVariant70: string;
    successVariant80: string;
    successVariant90: string;
    successVariant100: string;

    primaryTones: ToneRamp;
    secondaryTones: ToneRamp;
    tertiaryTones: ToneRamp;
    errorTones: ToneRamp;
    neutralTones: ToneRamp;
    neutralVariantTones: ToneRamp;
    tertiaryFixed: string;
    onTertiaryFixed: string;
    tertiaryFixedDim: string;
    onTertiaryFixedVariant: string;

    surfaceTint: string;
    shadow: string;
    scrim: string;

    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;

    primaryFixed: string;
    onPrimaryFixed: string;
    primaryFixedDim: string;
    onPrimaryFixedVariant: string;

    secondaryFixed: string;
    onSecondaryFixed: string;
    secondaryFixedDim: string;
    onSecondaryFixedVariant: string;
  }

  interface CssVarsPaletteOptions {
    onPrimary?: string;
    primaryContainer?: string;
    onPrimaryContainer?: string;

    onSecondary?: string;
    secondaryContainer?: string;
    onSecondaryContainer?: string;

    tertiary: string;
    onTertiary?: string;
    tertiaryContainer?: string;
    onTertiaryContainer?: string;

    onError?: string;
    errorContainer?: string;
    onErrorContainer?: string;

    onBackground?: string;

    surface?: string;
    onSurface?: string;
    surfaceVariant?: string;
    onSurfaceVariant?: string;

    outline?: string;
    outlineVariant?: string;

    surfaceDim?: string;
    surfaceBright?: string;
    surfaceContainerLowest?: string;
    surfaceContainerLow?: string;
    surfaceContainer?: string;
    surfaceContainerHigh?: string;
    surfaceContainerHighest?: string;

    // Success
    onSuccess: string // On Success
    successContainer: string  //Success Container
    onSuccessContainer: string //On Success Container

    // ✅ Extended Success Variants
    successVariant0: string;
    successVariant10: string;
    successVariant20: string;
    successVariant30: string;
    successVariant40: string;
    successVariant50: string;
    successVariant60: string;
    successVariant70: string;
    successVariant80: string;
    successVariant90: string;
    successVariant100: string;

    primaryTones?: Partial<ToneRamp>;
    secondaryTones?: Partial<ToneRamp>;
    tertiaryTones?: Partial<ToneRamp>;
    errorTones?: Partial<ToneRamp>;
    neutralTones?: Partial<ToneRamp>;
    neutralVariantTones?: Partial<ToneRamp>;
    tertiaryFixed: string;
    onTertiaryFixed: string;
    tertiaryFixedDim: string;
    onTertiaryFixedVariant: string;

    surfaceTint: string;
    shadow: string;
    scrim: string;

    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;

    primaryFixed: string;
    onPrimaryFixed: string;
    primaryFixedDim: string;
    onPrimaryFixedVariant: string;

    secondaryFixed: string;
    onSecondaryFixed: string;
    secondaryFixedDim: string;
    onSecondaryFixedVariant: string;
  }
}
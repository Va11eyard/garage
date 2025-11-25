/**
 * Kazakhstan Government Official Color Palette
 * Based on egov.kz and mvd.gov.kz standards
 */

export const govColors = {
  // Primary - Kazakhstan Blue (from flag and official portals)
  blue: {
    50: '#E6F2F9',
    100: '#CCE5F3',
    200: '#99CBE7',
    300: '#66B1DB',
    400: '#3397CF',
    500: '#0066B3',  // Primary
    600: '#00528F',
    700: '#004A85',
    800: '#003D6B',
    900: '#002F52',
  },
  
  // Secondary - Kazakhstan Gold (from flag)
  gold: {
    50: '#FFF9E6',
    100: '#FFF3CC',
    200: '#FFE799',
    300: '#FFDB66',
    400: '#FFCF33',
    500: '#FFC72C',  // Primary
    600: '#E5B200',
    700: '#B38900',
    800: '#806200',
    900: '#4D3A00',
  },
  
  // Accent - Green (for success, active states)
  green: {
    50: '#E6F5ED',
    100: '#CCEBDB',
    200: '#99D7B7',
    300: '#66C393',
    400: '#33AF6F',
    500: '#007A33',  // Primary
    600: '#006329',
    700: '#005221',
    800: '#004119',
    900: '#003010',
  },
  
  // Semantic Colors
  red: {
    50: '#FEE2E2',
    100: '#FECACA',
    200: '#FCA5A5',
    300: '#F87171',
    400: '#EF4444',
    500: '#DC2626',  // Primary
    600: '#B91C1C',
    700: '#991B1B',
    800: '#7F1D1D',
    900: '#450A0A',
  },
  
  orange: {
    50: '#FEF3C7',
    100: '#FDE68A',
    200: '#FCD34D',
    300: '#FBBF24',
    400: '#F59E0B',  // Primary
    500: '#D97706',
    600: '#B45309',
    700: '#92400E',
    800: '#78350F',
    900: '#451A03',
  },
  
  cyan: {
    50: '#CFFAFE',
    100: '#A5F3FC',
    200: '#67E8F9',
    300: '#22D3EE',
    400: '#06B6D4',  // Primary
    500: '#0891B2',
    600: '#0E7490',
    700: '#155E75',
    800: '#164E63',
    900: '#083344',
  },
  
  // Neutral Colors
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
} as const

// Semantic color mappings for easier use
export const semanticColors = {
  primary: govColors.blue[500],
  primaryHover: govColors.blue[600],
  primaryActive: govColors.blue[700],
  
  secondary: govColors.gold[500],
  secondaryHover: govColors.gold[600],
  
  accent: govColors.green[500],
  accentHover: govColors.green[600],
  
  success: govColors.green[500],
  warning: govColors.orange[400],
  error: govColors.red[500],
  info: govColors.cyan[400],
  
  text: {
    primary: govColors.gray[900],
    secondary: govColors.gray[600],
    tertiary: govColors.gray[500],
    disabled: govColors.gray[400],
    inverse: '#FFFFFF',
  },
  
  background: {
    primary: '#FFFFFF',
    secondary: govColors.gray[50],
    tertiary: govColors.gray[100],
  },
  
  border: {
    light: govColors.gray[200],
    medium: govColors.gray[300],
    dark: govColors.gray[400],
  },
} as const

export type GovColor = typeof govColors
export type SemanticColor = typeof semanticColors

/**
 * Kazakhstan Government Typography System
 */

export const govTypography = {
  fontFamily: {
    sans: ['Inter', 'Arial', 'Helvetica Neue', 'sans-serif'],
    mono: ['Courier New', 'monospace'],
  },
  
  fontSize: {
    // Display (for hero sections)
    'display-lg': ['3.75rem', { lineHeight: '1.2', fontWeight: '700' }],  // 60px
    'display-md': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],     // 48px
    'display-sm': ['2.25rem', { lineHeight: '1.3', fontWeight: '700' }],  // 36px
    
    // Headings
    'h1': ['2rem', { lineHeight: '1.3', fontWeight: '700' }],      // 32px
    'h2': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],    // 24px
    'h3': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],   // 20px
    'h4': ['1.125rem', { lineHeight: '1.5', fontWeight: '600' }],  // 18px
    'h5': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],      // 16px
    'h6': ['0.875rem', { lineHeight: '1.5', fontWeight: '600' }],  // 14px
    
    // Body
    'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],  // 18px
    'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],         // 16px
    'body-sm': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],  // 14px
    
    // UI Elements
    'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],   // 12px
    'overline': ['0.75rem', { lineHeight: '1.5', fontWeight: '600' }],  // 12px uppercase
  },
  
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const

export type GovTypography = typeof govTypography

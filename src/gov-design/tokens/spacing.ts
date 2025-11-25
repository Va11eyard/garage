/**
 * Kazakhstan Government Spacing System
 */

export const govSpacing = {
  // Component spacing
  'comp-xs': '0.25rem',   // 4px
  'comp-sm': '0.5rem',    // 8px
  'comp-md': '0.75rem',   // 12px
  'comp-lg': '1rem',      // 16px
  'comp-xl': '1.5rem',    // 24px
  'comp-2xl': '2rem',     // 32px
  
  // Layout spacing
  'layout-xs': '1rem',    // 16px
  'layout-sm': '1.5rem',  // 24px
  'layout-md': '2rem',    // 32px
  'layout-lg': '3rem',    // 48px
  'layout-xl': '4rem',    // 64px
  'layout-2xl': '6rem',   // 96px
} as const

export type GovSpacing = typeof govSpacing

import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./app/**/*.{ts,tsx,js,jsx}",
        "./components/**/*.{ts,tsx,js,jsx}",
        "./src/**/*.{ts,tsx,js,jsx}"
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                // Kazakhstan Government Official Colors
                'gov-blue': {
                    50: '#E6F2F9',
                    100: '#CCE5F3',
                    200: '#99CBE7',
                    300: '#66B1DB',
                    400: '#3397CF',
                    500: '#0066B3',
                    600: '#00528F',
                    700: '#004A85',
                    800: '#003D6B',
                    900: '#002F52',
                    DEFAULT: '#0066B3',
                },
                'gov-gold': {
                    50: '#FFF9E6',
                    100: '#FFF3CC',
                    200: '#FFE799',
                    300: '#FFDB66',
                    400: '#FFCF33',
                    500: '#FFC72C',
                    600: '#E5B200',
                    700: '#B38900',
                    800: '#806200',
                    900: '#4D3A00',
                    DEFAULT: '#FFC72C',
                },
                'gov-green': {
                    50: '#E6F5ED',
                    100: '#CCEBDB',
                    200: '#99D7B7',
                    300: '#66C393',
                    400: '#33AF6F',
                    500: '#007A33',
                    600: '#006329',
                    700: '#005221',
                    800: '#004119',
                    900: '#003010',
                    DEFAULT: '#007A33',
                },
                'gov-red': {
                    50: '#FEE2E2',
                    500: '#DC2626',
                    DEFAULT: '#DC2626',
                },
                'gov-orange': {
                    50: '#FEF3C7',
                    400: '#F59E0B',
                    DEFAULT: '#F59E0B',
                },
                'gov-gray': {
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
                // Legacy support (keep for backward compatibility)
                gov: {
                    primary: "#0066B3",
                    "primary-hover": "#00528F",
                    "primary-active": "#004A85",
                    secondary: "#FFC72C",
                    "secondary-hover": "#E5B200",
                    accent: "#007A33",
                    "accent-hover": "#006329",
                    danger: "#DC2626",
                    "danger-hover": "#B91C1C",
                    warning: "#F59E0B",
                    info: "#06B6D4",
                    success: "#007A33",
                    dark: "#1F2937",
                    gray: "#6B7280",
                    "light-gray": "#D1D5DB",
                    surface: "#F6F8FA",
                    "table-stripe": "#F5F8F6",
                    border: "#E5E7EB",
                    text: "#111827",
                    "text-secondary": "#6B7280",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: { DEFAULT: "#0066B3", foreground: "#FFFFFF" },
                secondary: { DEFAULT: "#F6F8FA", foreground: "#1F2937" },
                destructive: { DEFAULT: "#DC2626", foreground: "#FFFFFF" },
                muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
                accent: { DEFAULT: "#FFC72C", foreground: "#1F2937" },
                popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
                card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" }
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: [
                    "Inter",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                    "Helvetica Neue",
                    "Arial",
                    "sans-serif"
                ]
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" }
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" }
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out"
            }
        }
    }
};

export default config;

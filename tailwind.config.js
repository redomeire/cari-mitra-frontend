/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sora': 'Sora'
      },
      colors: {
        // neutral
        "neutral-25": "#FCFCFD",
        "neutral-50": "#F8FAFC",
        "neutral-100": "#EEF2F6",
        "neutral-200": "#E3E8EF",
        "neutral-300": "#CDD5DF",
        "neutral-400": "#9AA4B2",
        "neutral-500": "#697586",
        "neutral-600": "#4B5565",
        "neutral-700": "#364152",
        "neutral-800": "#202939",
        "neutral-900": "#121926",

        // primary
        "primary-25": "#FFFBE6",
        "primary-50": "#FFF7CC",
        "primary-100": "#FFF2B3",
        "primary-200": "#FFEE99",
        "primary-300": "#FFEA80",
        "primary-400": "#FFE666",
        "primary-500": "#FFDD33",
        "primary-600": "#0066DD",
        "primary-700": "#0052B1",
        "primary-800": "#00479B",
        "primary-900": "#003D85",

        // success
        "success-25": "#F6FEF9",
        "success-50": "#EDFCF2",
        "success-100": "#D3F8DF",
        "success-200": "#AAF0C4",
        "success-300": "#73E2A3",
        "success-400": "#73E2A3",
        "success-500": "#16B364",
        "success-600": "#099250",
        "success-700": "#087443",
        "success-800": "#095C37",
        "success-900": "#084C2E",

        // warning
        "warning-25": "#FFFCF5",
        "warning-50": "#EDFCF2",
        "warning-100": "#D3F8DF",
        "warning-200": "#AAF0C4",
        "warning-300": "#73E2A3",
        "warning-400": "#73E2A3",
        "warning-500": "#16B364",
        "warning-600": "#099250",
        "warning-700": "#087443",
        "warning-800": "#095C37",
        "warning-900": "#084C2E",

        // error
        "error-25": "#FFFBFA",
        "error-50": "#FEF3F2",
        "error-100": "#FEE4E2",
        "error-200": "#FECDCA",
        "error-300": "#FDA29B",
        "error-400": "#F97066",
        "error-500": "#F04438",
        "error-600": "#D92D20",
        "error-700": "#B42318",
        "error-800": "#912018",
        "error-900": "#7A271A",
        
      }
    },
  },
  plugins: [require("daisyui")],
}

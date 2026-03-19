/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tapex-navy': '#1a1f36',
        'tapex-navy-light': '#252b45',
        'tapex-gold': '#f5c518',
        'tapex-gold-light': '#ffd700',
      },
    },
  },
  plugins: [],
}

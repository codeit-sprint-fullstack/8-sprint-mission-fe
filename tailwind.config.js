/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
        rokaf: ['ROKAFSans', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: 'var(--brand-blue)',
        },
      },
    },
  },
  plugins: [],
};

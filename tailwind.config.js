/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand:          '#FE4901',
        'brand-strong': '#CC3A00',
        'brand-sky':    '#FF8C5A',
        'brand-alt':    '#FFAD8A',
        'brand-light':  '#FFCFBA',
        'brand-pale':   '#FFF0EA',
        bg:             '#1A1A1A',
        surface:        '#242424',
        'surface-high': '#2E2E2E',
        ink:            '#FFFFFF',
        line:           '#333333',
        ok:             '#27AE60',
        warn:           '#E5484D',
      },
      fontFamily: {
        sans: ["'Pretendard Variable'", 'Pretendard', '-apple-system', "'Apple SD Gothic Neo'", 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

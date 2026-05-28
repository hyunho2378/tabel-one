/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:          '#7C3AED',
        'primary-strong': '#6D28D9',
        'primary-light':  '#A78BFA',
        accent:           '#8B5CF6',
        'violet-deep':    '#7A3FC7',
        'violet-soft':    '#8A82F6',
        'violet-mid':     '#967AE0',
        bg:               '#0D0D0D',
        'bg-card':        '#131313',
        ink:              '#FFFFFF',
        ok:               '#10B981',
        warn:             '#F59E0B',
      },
      fontFamily: {
        sans: ["'Pretendard Variable'", 'Pretendard', '-apple-system', "'Apple SD Gothic Neo'", 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

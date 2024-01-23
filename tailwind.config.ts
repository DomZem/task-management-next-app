import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryPurple: 'var(--primaryPurple)',
        primaryPurpleHover: 'var(--primaryPurpleHover)',
        primaryLightPurple: 'var(--primaryLightPurple)',
        primaryLightPurpleHover: 'var(--primaryLightPurpleHover)',
        primaryBlack: 'var(--primaryBlack)',
        primaryDarkGrey: 'var(--primaryDarkGrey)',
        primaryLinesDark: 'var(--primaryLinesDark)',
        primaryMediumGrey: 'var(--primaryMediumGrey)',
        primaryLinesLight: 'var(--primaryLinesLight)',
        primaryLightGrey: 'var(--primaryLightGrey)',
        primaryWhite: 'var(--primaryWhite)',
        primaryRed: 'var(--primaryRed)',
        primaryRedHover: 'var(--primaryRedHover)',
        primaryVeryDarkGrey: 'var(--primaryVeryDarkGrey)',
        primaryBorder: 'var(--primaryBorder)',
      },
      fontSize: {
        'body-l': [
          '13px',
          {
            fontWeight: '500',
            lineHeight: '23px',
          },
        ],
        'body-m': [
          '12px',
          {
            fontWeight: '700',
            lineHeight: '15px',
          },
        ],
        'heading-xl': [
          '24px',
          {
            fontWeight: '700',
            lineHeight: '30px',
          },
        ],
        'heading-l': [
          '18px',
          {
            fontWeight: '700',
            lineHeight: '23px',
          },
        ],
        'heading-m': [
          '15px',
          {
            fontWeight: '700',
            lineHeight: '19px',
          },
        ],
        'heading-s': [
          '12px',
          {
            fontWeight: '700',
            lineHeight: '15px',
            letterSpacing: '2.4px',
          },
        ],
      },
      boxShadow: {
        task: '0px 4px 6px 0px rgba(54, 78, 126, 0.10);',
        taskHover: '0px 4px 6px 0px rgba(54, 78, 126, 0.25);',
        popover: '0px 10px 20px 0px rgba(54, 78, 126, 0.25);',
      },
      backgroundImage: {
        column:
          'linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.50) 100%)',
        columnDark:
          'linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.13) 100%)',
      },
    },
  },
  plugins: [],
};
export default config;

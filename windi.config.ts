import plugin from 'windicss/plugin'

export default {
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
      },
      fontFamily: {
        display: ['PT Mono', 'SFMono-Regular', 'ui-monospace'],
        body: ['PT Sans', 'ui-sans-serif', 'system-ui'],
      }
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const screens = theme('screens');

      const components = {
        '.debug-screens::before': Object.assign({
          content: '"screen: xs"',
          position: 'fixed',
          zIndex: '2147483647',
          bottom: '0',
          left: '0',
          padding: '.3333333em .5em',
          fontSize: '12px',
          lineHeight: '1',
          fontFamily: 'sans-serif',
          backgroundColor: '#000',
          color: '#fff',
          boxShadow: '0 0 0 1px #fff',
        }),
      };

      Object.entries(screens)
        .forEach(([screen, width]) => {
          components[`@media (min-width: ${width})`] = {
            '.debug-screens::before': {
              content: `"screen: ${screen}"`,
            },
          };
        });

      addComponents(components);
    }),
  ]
}
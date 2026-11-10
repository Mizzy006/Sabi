/* Rebuild the stylesheet after adding new utility classes (standalone CLI, no Node needed):
 *   ./tailwindcss -c tailwind.config.js -i tailwind.input.css -o static/tailwind.css --minify
 * CLI download: https://github.com/tailwindlabs/tailwindcss/releases (v3.4.x) */
module.exports = {
    content: ['./templates/index.html', './static/sabi.js'],

            theme: {
                extend: {
                    fontFamily: { sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'] },
                    fontSize: {
                        xs: ['0.8125rem', '1.25rem'], sm: ['0.875rem', '1.35rem'], base: ['0.9375rem', '1.5rem'],
                        lg: ['1.0625rem', '1.5rem'], xl: ['1.25rem', '1.75rem'], '2xl': ['1.5rem', '2rem']
                    },
                    borderRadius: { DEFAULT: '4px', md: '5px', lg: '6px', xl: '8px', '2xl': '10px' },
                    boxShadow: { sm: 'none', DEFAULT: 'none', md: 'none', lg: 'none', xl: 'none' },
                    colors: {
                        slate: { 50: '#f6f8f7', 100: '#edf0ef', 200: '#dde2e0', 300: '#c5cbc9', 400: '#939d9a', 500: '#66716e', 600: '#4c5754', 700: '#36413e', 800: '#232d2a', 900: '#141c1a' },
                        emerald: { 50: '#eef6f1', 100: '#dcece3', 200: '#bcd9c8', 400: '#4fa57c', 600: '#0b6b46', 700: '#095a3b', 800: '#074a31', 900: '#05382a', 950: '#032a1f' },
                        blue: { 50: '#eef3f8', 100: '#dce6f0', 200: '#c3d3e4', 600: '#2b5d8a', 700: '#234e75', 800: '#1b3f60' },
                        amber: { 50: '#fbf5e6', 100: '#f6e8c7', 200: '#ecd49b', 500: '#b7791f', 600: '#9a6700', 700: '#7f5400', 800: '#664300' },
                        rose: { 50: '#fdf0ee', 100: '#fbe2df', 200: '#f4c4be', 600: '#b42318', 700: '#912018', 800: '#7a1c15' }
                    }
                }
            }
        };

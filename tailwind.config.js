const plugin = require('tailwindcss/plugin');

module.exports = {
    mode: 'jit',
    purge: {
        layers: ['components', 'utilities'],
        content: [
            './bookWrench/**/*.html',
            './common/**/*.html',
            './bookWrench/**/*.{js,jsx,ts,tsx}',
            './common/**/*.{js,jsx,ts,tsx}',
        ],
        options: {
            keyframes: true,
        },
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        theme: {
            fontSize: {
                sm: ['14px', '20px'],
                base: ['16px', '24px'],
                lg: ['20px', '28px'],
                xl: ['24px', '32px'],
            },
        },
        container: {
            padding: '1rem',
            center: true,
        },
        fontFamily: {
            body: ['Helvetica, Arial, sans-serif'],
        },
        minWidth: {
            '0': '0',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
            'full': '100%',
        },
        extend: {
            fontFamily: {
                poppins : "'Poppins', sans-serif"
            },
            fontSize: {
                'tiny': '10px',
                '11px': '11px',
                '12px': '12px',
                '13px': '13px',
                '15px': '15px'
             },
             minWidth: {
                '0': '0',
                '1/4': '25%',
                '1/3': '33.333333333%',
                '1/2': '50%',
                '3/4': '75%',
                'full': '100%',
                '100px': '100px'
            },
            textColor: {
                primary: '#F75D34'
            },
            borderColor:{
                primary: '#F75D34'
            },
            zIndex: {
                '1': '1'
            },
            height: {
              '28px': '28px',
              '44px': '44px',
              '46px': '46px',
              '100px': '100px',
              '136px': '136px',
              '142px': '142px',
              '15': '3.75rem'
            },
            width: {
                '20px': '20px',
                '28px': '28px',
                '44px': '44px',
                '430px': '430px',
                '120px': '120px',
                '210px': '210px',
                '150px': '150px',
                '400px': '400px',
                '88': '22rem',
                '112': '27rem',
                '600px': '600px'

            },
            padding: {
                '20px': '20px'
            },
            backgroundColor:{
                primary: '#F75D34',
                secondary: '#7E72F2',
                lightpink:'#fff5f3',
                //lightpink:'#f7e4de',
                newpink:'#f7e4de'
            },
            border:{
                primary: '#F75D34'
            },
            minWidth: {
                '105px': '105px',
                '300px': '300px'
            },
            maxHeight: {
                '500px': '500px'
            },
            boxShadow: {
                sprade: '0 1px 8px rgba(0, 0, 0, 0.1), 0 5px 20px rgba(0, 0, 0, 0.1)'
              }
            
        }
    },
    variants: {
        extend: {
           scale: ['active', 'group-hover'],
          }
    },
    plugins: [
        require('@tailwindcss/forms'),
        plugin(function ({ addUtilities }) {
            const newUtilities = {
                '.border-none': {
                    'border': '0 !important',
                },
                '.custamSelectBox': {
                    'box-shadow': 'none !important',
                    'background': 'white',
                    'border': 'solid 1px #000'
                },
                '.btn-disabled': {
                    'border': 'solid 1px transparent !important',
                    'color': '#fff !important',
                    'background': 'rgba(36,39,44,.3) !important',
                    'align-items': 'center',
                    'justify-content': 'center',
                    'border-radius':'4px',
                    'cursor': 'no-drop !important',
                    'box-shadow': 'none',
                    'vertical-align': 'middle'
                },
                '.button-primary': {
                    'border': 'solid 1px #0052CC;',
                    'color': '#fff',
                    'background': '#0052CC;',
                    'align-items': 'center',
                    'justify-content': 'center',
                    'border-radius':'50px',
                    'font-size':'16px',
                    'line-height':'50px',
                    'box-shadow': '0px 8px 8px rgba(247, 93, 52, 0.2)',
                    'vertical-align': 'middle'
                },
                '.button-default': {
                    'border': 'solid 1px #CECECE',
                    'color': '#000',
                    'background': '#fff',
                    'align-items': 'center',
                    'justify-content': 'center',
                    'border-radius':'4px',
                    'box-shadow': '0px 8px 8px rgba(128, 128, 128, 0.1)',
                    'vertical-align': 'middle'
                }
            };
            addUtilities(newUtilities, ['responsive', 'hover']);
        }),
    ],
};

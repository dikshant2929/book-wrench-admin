// postcss.config.js
module.exports = () => ({
    map: false,
    plugins: {
        tailwindcss: {},
        // '@tailwindcss/jit': {},
        autoprefixer: {},
        'postcss-plugin': {},
    },
});

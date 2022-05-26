import defineConfig, { plugins, build, resolver, jsx } from './vite.common';

const base = '/'; 

console.log('BASE PATH :', base);
//process.env.NODE_ENV === 'production' ? 'nct-prod.cardekho.com/' : '/';
// https://vitejs.dev/config/
export default defineConfig({
    resolve: resolver,
    plugins,
    build,
    jsx,
    base,
});

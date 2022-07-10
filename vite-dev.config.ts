import defineConfig, { plugins, build, resolver, jsx } from './vite.common';
const baseUrl = {
    dev : "http://localhost:4002/api/v1/",
    staging : "http://3.145.83.133/api/v1/"
}
const env = "staging" || process.env.NODE_ENV;

const server = {
    proxy: {
        '^/api/v1/*': {
            target: baseUrl[env] || "http://localhost:4002/api/v1/",
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api\/v1/, ''),
        },
    },
};

// https://vitejs.dev/config/
export default defineConfig({
    resolve: resolver,
    plugins,
    build,
    jsx,
    server,
});

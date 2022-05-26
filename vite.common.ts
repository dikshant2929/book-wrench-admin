import { resolve } from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

console.log('Environment : ' + process.env.NODE_ENV);
console.log('Configuration : ' + process.env.configs);

// const hashedTimestamp = (+new Date()).toString(36);
// Bulid config
export const build = {
    // rollupOutputOptions: {
    //     entryFileNames: '[name].js',
    // },
    rollupOptions: {
        input: {
            main: resolve(__dirname, 'index.html'),
        },
        output: {
            dir: 'build',
            format: 'es',
            // entryFileNames: `assets/[format]/[name].${hashedTimestamp}-[hash].js`,
            // chunkFileNames: `assets/[format]/[name].${hashedTimestamp}-[hash].js`,
            // assetFileNames: `assets/[ext]/[name].${hashedTimestamp}-[hash].[ext]`,
            entryFileNames: `assets/[format]/[name]-[hash].js`,
            chunkFileNames: `assets/[format]/[name]-[hash].js`,
            assetFileNames: `assets/[ext]/[name]-[hash].[ext]`,
        },
    },
    manifest: true,
    outDir: resolve(__dirname, 'build'),
    cssCodeSplit: true,
    // watch: {},
};

// Plugin Setups
export const plugins = [
    reactRefresh(),
    tsconfigPaths(),
    // {
    //     generateBundle(options, bundle) {
    //         console.log('Plugin 1', options, bundle);
    //     },
    // },
];

// Alias Names
export const resolver = {
    alias: [
        {
            find: '@app',
            replacement: resolve(__dirname, 'bookWrench'),
        },
        {
            find: '@pages',
            replacement: resolve(__dirname, 'bookWrench', 'pages'),
        },
        {
            find: '@widgets',
            replacement: resolve(__dirname, 'bookWrench', 'widgets'),
        },
        {
            find: '@routes',
            replacement: resolve(__dirname, 'bookWrench', 'routes'),
        },
        {
            find: '@utils',
            replacement: resolve(__dirname, 'bookWrench', 'utils'),
        },
        {
            find: '@common-utils',
            replacement: resolve(__dirname, 'common', 'utils'),
        },
        {
            find: '@globals',
            replacement: resolve(__dirname, 'common', 'utils', 'globals'),
        },
        {
            find: '@configs',
            replacement: resolve(__dirname, 'bookWrench', 'configs'),
        },
        {
            find: '@dynamicConfig',
            replacement: resolve(__dirname, 'bookWrench', 'configs', `config-${process.env.configs}`),
        },
        {
            find: '@storage',
            replacement: resolve(__dirname, 'bookWrench', 'storage'),
        },
        {
            find: '@API',
            replacement: resolve(__dirname, 'bookWrench', 'Agent'),
        },
        {
            find: '@ExposedPath',
            replacement: resolve(__dirname, 'bookWrench', 'routes', 'ExposedPath'),
        },
        {
            find: '@common',
            replacement: resolve(__dirname, 'common'),
        },
        {
            find: '@button',
            replacement: resolve(__dirname, 'common', 'elements', 'Button'),
        },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
};

// Default Jsx config
export const jsx: any = {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
};

// export Vite Config
export default defineConfig;

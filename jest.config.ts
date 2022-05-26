// jest.config.ts
import type { Config } from '@jest/types';
const configLevel = process.env.configs || 'local';

// Sync object
const config: Config.InitialOptions = {
    displayName: {
        name: 'NCT-B2B-Framework',
        color: 'blue',
    },
    verbose: true,
    roots: ['<rootDir>/bookWrench', '<rootDir>/common'],
    setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.js'],
    collectCoverageFrom: [
        'bookWrench/**/*.{js,jsx,ts,tsx}',
        '!bookWrench/**/*.d.ts',
        'common/**/*.{js,jsx,ts,tsx}',
        '!common/**/*.d.ts',
        '!build/**',
        '!prod/**',
    ],
    testMatch: [
        '<rootDir>/bookWrench/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/bookWrench/**/*.{spec,test}.{js,jsx,ts,tsx}',
        '<rootDir>/common/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/common/**/*.{spec,test}.{js,jsx,ts,tsx}',
    ],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.scss$': 'jest-scss-transform',
        '^.+\\.svg$': '<rootDir>/jest/svgTransform.js',
        // '^.+\\.css$': '<rootDir>/jest/mocks/cssMock.js',
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
        '^.+\\.module\\.(css|sass|scss)$',
    ],
    moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        '^@app(.*)$': ['<rootDir>/bookWrench/$1'],
        '^@pages(.*)$': ['<rootDir>/bookWrench/pages/$1'],
        '^@widgets(.*)$': ['<rootDir>/bookWrench/widgets/$1'],
        '^@routes': ['<rootDir>/bookWrench/routes/index'],
        '^@utils(.*)$': ['<rootDir>/bookWrench/utils/$1'],
        '^@common-utils(.*)$': ['<rootDir>/common/utils/$1'],
        '^@globals': ['<rootDir>/common/utils/globals'],
        '^@configs': ['<rootDir>/bookWrench/configs/index'],
        '^@dynamicConfig': [`<rootDir>/bookWrench/configs/config-${configLevel}`],
        '^@storage': ['<rootDir>/bookWrench/storage/index'],
        '^@API': ['<rootDir>/bookWrench/Agent/index'],
        '^@ExposedPath': ['<rootDir>/bookWrench/routes/ExposedPath'],
        '^@common(.*)$': ['<rootDir>/common/$1'],
        '^@button(.*)$': ['<rootDir>/common/elements/Button'],
        "\\.(css|less|scss|sass)$": '<rootDir>/jest/styleMock.js',
    },
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
    resetMocks: true,
    modulePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
};

export default config;

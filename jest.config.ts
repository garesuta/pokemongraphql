/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './', // Path to your Next.js app to load next.config.js and .env files in your test environment
});

const config: Config = {
  clearMocks: true,
  testEnvironment: "jsdom",
};

export default createJestConfig(config);

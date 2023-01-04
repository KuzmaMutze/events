import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import { dirname, join, parse } from 'path';
import { fileURLToPath } from 'url';

const isProduction = process.env['NODE_ENV'] === 'production'; // TODO

const { root } = parse(process.cwd());
const external = (name) => {
  return !name.startsWith('.') && !name.startsWith(root);
};

const configDir = dirname(fileURLToPath(import.meta.url));
// const dirName = `${dirname()}`.split('\\').pop();
// console.log(import.meta.url, 'lalalalalallalal');
/** @type {import('rollup').RollupOptions[]} */
export default [
  {
    input: 'src/index.ts',
    external,
    plugins: [
      typescript({
        exclude: ['**/*.fixture.tsx', '**/*.stories.tsx'],
        include: ['src/**/*'],
        tsconfig: join(configDir, 'tsconfig.json'),
        declarationMap: !isProduction,
        declaration: true,
        emitDeclarationOnly: true,
        outDir: 'dist',
      }),
      json(),
    ],
    output: {
      dir: 'dist',
    },
  },
  {
    input: 'src/index.ts',
    external,
    plugins: [
      typescript({
        exclude: ['**/*.fixture.tsx', '**/*.stories.tsx'],
        include: ['src/**/*'],
        tsconfig: join(configDir, 'tsconfig.json'),
      }),
      json(),
    ],
    output: {
      file: 'dist/index.js',
      format: 'esm',
    },
  },
  {
    input: 'src/index.ts',
    external,
    plugins: [
      typescript({
        exclude: ['**/*.fixture.tsx', '**/*.stories.tsx'],
        include: ['src/**/*'],
        tsconfig: join(configDir, 'tsconfig.json'),
      }),
      json(),
    ],
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
  },
];

import typescript from '@rollup/plugin-typescript';

/**
 *  @type {import('rollup').RollupOptions}
 */

export default {
  input: 'src/index.ts',
  plugins: [typescript()],
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: ['@ngi/common', '@nestjs/common'],
};

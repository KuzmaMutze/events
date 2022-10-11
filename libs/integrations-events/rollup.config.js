import typescript from '@rollup/plugin-typescript';

/**
 *  @type {import('rollup').RollupOptions}
 */

export default {
  input: 'src/index.ts',
  plugins: [typescript()],
  external: [],
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
    },
  ],
};

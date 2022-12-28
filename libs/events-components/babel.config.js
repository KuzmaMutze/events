export default {
  presets: ['@babel/env', '@babel/preset-react', '@babel/typescript'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
  ],
};

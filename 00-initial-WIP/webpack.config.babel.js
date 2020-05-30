import path from 'path';

export default {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: ['./src/ts/index.ts'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js'),
    publicPath: '/public/js',
    libraryTarget: 'var',
    library: 'EntryPoint',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.join(__dirname),
        exclude: /(node_modules)|(public)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript'
            ],
          },
        },
      }
    ],
  },
  plugins: [],
  optimization: {},
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
  },
};

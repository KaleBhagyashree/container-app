const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true, // Optional: Helps in routing (recommended for SPAs)
  },
  output: {
    publicPath: 'http://localhost:3000/', // ✅ Container's public path
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // ✅ Container app name
      remotes: {
        header: 'header@http://localhost:3001/remoteEntry.js', // ✅ Remote app exposed correctly
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // ✅ Correct path for HTML template
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // ✅ Babel loader for JS and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // ✅ Helps import files without extensions
  },
};

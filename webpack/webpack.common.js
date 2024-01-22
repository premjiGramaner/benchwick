const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const cwd = process.cwd();

const settings = {
  buildFolderName: 'dist',
  mainEntryFile: './src/index.js',
  htmlTemplateFile: './src/index.html',
  extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.sass'],

  aliases: {
    "@Pages": "src/pages",
    "@Components": "src/components",
    "@Interface": "src/utils/interface",
    "@Utils": "src/utils",
    "@Store": "src/store",
    "@Assets": "src/assets",
    "@Images": "src/assets/images",
    "@API": "src/api",
    "@Reducers": "src/reducers",
    "@Sw": "src/socket",
  },
};


const config = () => {
  for (let name in settings.aliases) {
    let value = settings.aliases[name];
    if (value && value.startsWith('src/')) value = path.join(cwd, value);
    settings.aliases[name] = value;
  }


  return {
    entry: path.resolve(__dirname, '..', 'src/index.tsx'),
    resolve: {
      alias: {
        ...settings.aliases,
        stream: require.resolve('stream-browserify'),
        zlib: require.resolve('browserify-zlib'),
      },
      extensions: settings.extensions,
      plugins: [new TsconfigPathsPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, '..', './build'),
      filename: 'bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', './src/index.html'),
      }),
    ],
    stats: 'errors-only',
  }
}

module.exports = config();
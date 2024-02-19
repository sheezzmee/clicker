const isDev = process.env.NODE_ENV === 'development';
const rspack = require('@rspack/core');
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
    context: __dirname,
    entry: {
        main: './src/index.js'
    },
    resolve: {
        extensions: ['...', '.ts', '.tsx', '.jsx']
    }
};

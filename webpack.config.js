const path = require('path');

module.exports = {
  entry: {
    'src/popup/MainPopup': './build/src/popup/MainPopup.js',
    'src/content_scripts/KeepYourSession': './build/src/content_scripts/KeepYourSession.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
};

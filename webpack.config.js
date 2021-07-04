const path = require('path');

module.exports = {
  entry: {
    MainPopup: './app/src/popup/MainPopup.js',
    KeepYourSession: './app/src/content_scripts/KeepYourSession.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/dist'),
  },
};

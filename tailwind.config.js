// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './node_modules/flyonui/dist/js/*.js',
  ],
  plugins: [
    // eslint-disable-next-line no-undef
    require('flyonui'),
    // eslint-disable-next-line no-undef
    require('flyonui/plugin')
  ],
}

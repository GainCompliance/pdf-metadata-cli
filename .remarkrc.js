// https://github.com/remarkjs/remark/tree/master/packages/remark-stringify#options
exports.settings = {
  listItemIndent: 1,
  emphasis: '_',
  strong: '_',
  bullet: '*',
  incrementListMarker: false
};

exports.plugins = [
  '@gaincompliance/remark-preset-lint',
  ['remark-toc', {tight: true}],
  ['validate-links', {repository: false}]
];
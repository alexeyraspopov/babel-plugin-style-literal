let postcss = require('postcss');

const TARGET_TAG_NAME = 'css';
const EXPRESSION_PLACEHOLDER = '__EXPRESSION_PLACEHOLDER__';

module.exports = function StyleLiteralPlugin({ types }) {
  return {
    name: 'style-literal',
    visitor: {
      TaggedTemplateExpression(path) {
        if (path.node.tag.name !== TARGET_TAG_NAME) return;

        let { quasis, expressions } = path.node.quasi;
        let css = quasis.map(v => v.value.raw).join(EXPRESSION_PLACEHOLDER);
        let parsedCss;
        try {
          parsedCss = postcss.parse(css);
        } catch (error) {
          let msg = `${error.message}\n${error.showSourceCode()}`;
          throw new Error(msg);
        }
        let declarations = parsedCss.nodes.filter(node => node.type === 'decl');

        let entries = declarations.map(({ prop, value }) => {
          let strings = value
            .split(EXPRESSION_PLACEHOLDER)
            .map(part => types.stringLiteral(part));

          let joinedParts = join(strings, expressions).filter(
            part => !types.isStringLiteral(part) || part.value.length > 0
          );

          return types.objectProperty(
            types.identifier(dehyphenateProperty(prop)),
            joinedParts.reduce((acc, part) =>
              types.binaryExpression('+', acc, part)
            )
          );
        });

        path.replaceWith(types.objectExpression(entries));
      },
    },
  };
};

function dehyphenateProperty(name) {
  return name
    .replace('-ms-', 'ms-')
    .replace(/-([a-z])/g, (string, match) => match.toUpperCase());
}

function join(a, b) {
  return a.length > 0
    ? a.reduce(
        (acc, item, index) =>
          b.length > 0 && index < a.length - 1
            ? acc.concat(item, b.shift())
            : acc.concat(item),
        []
      )
    : [b.shift()];
}

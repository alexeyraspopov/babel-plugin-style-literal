module.exports = function StylesLiteralPlugin({ types, template }) {
  return {
    name: 'styles-literal',
    visitor: {
      TaggedTemplateExpression(path) {
        if (path.node.tag.name !== 'css') return;
        let node = path.node;
        let quasi = node.quasi;
        let entries = [];
        for (let q of quasi.quasis) {
          let value = q.value.raw.trim();
          let rules = value
            .split(';')
            .map(r => r.trim().replace(/\n/g, ' '))
            .filter(r => r.length > 0);
          for (let rule of rules) {
            let [match, key, value] = rule.match(/^([^:]+)\:\s?([^$]+)$/);
            let camelKey = key.replace(/\-([a-z])/g, (m, s) => s.toUpperCase());
            entries.push([camelKey, value.replace(/\s+|\t+/g, ' ').trim()]);
          }
        }
        let styleRules = entries.map(([k, v]) => `${k}: '${v}'`).join(',\n');
        let result = template(`({ ${styleRules} })`);
        path.replaceWith(result());
      },
    },
  };
};

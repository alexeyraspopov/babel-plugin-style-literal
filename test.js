import plugin from './index';
import { transform } from '@babel/core';

test('simple transform', () => {
  let code = `
    let style = css\`
      font-size: 12px;
      line-height: 1.5;
      box-shadow:
        1px 1px 0 red,
        inset 2px 3px 0 green;
      background-image: linear-gradient(to bottom, blue, red);
    \`;
  `.trim();
  let expected = `
    let style = {
  fontSize: '12px',
  lineHeight: '1.5',
  boxShadow: '1px 1px 0 red, inset 2px 3px 0 green',
  backgroundImage: 'linear-gradient(to bottom, blue, red)'
};
  `.trim();
  let result = transform(code, {
    babelrc: false,
    plugins: [plugin],
  });
  expect(result.code).toEqual(expected);
});

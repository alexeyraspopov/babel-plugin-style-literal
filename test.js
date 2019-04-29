let plugin = require('./index');
let { transform } = require('@babel/core');

test('simple transform', () => {
  let code = [
    'let style = css`',
    '  font-size: 12px;',
    '  line-height: 1.5;',
    '  box-shadow: 1px 1px 0 red, inset 2px 3px 0 green;',
    '  background-image: linear-gradient(to bottom, blue, red);',
    '`;',
  ].join('\n');

  let expected = [
    'let style = {',
    '  fontSize: "12px",',
    '  lineHeight: "1.5",',
    '  boxShadow: "1px 1px 0 red, inset 2px 3px 0 green",',
    '  backgroundImage: "linear-gradient(to bottom, blue, red)"',
    '};',
  ].join('\n');

  let result = transform(code, {
    babelrc: false,
    plugins: [plugin],
  });

  expect(result.code).toEqual(expected);
});

test('transform with expressions', () => {
  let code = [
    'let size = 12;',
    'let lHeight = 1.5;',
    'let color = "green";',
    'let pTop = 13;',
    'let style = css`',
    '  font: normal ${size + 1}px/1.5 Helvetica;',
    '  line-height: ${lHeight};',
    '  padding-top: ${pTop}px;',
    '  box-shadow: 1px 1px 0 red, inset 2px 3px 0 ${color};',
    '  background-image: linear-gradient(to bottom, blue, red);',
    '`;',
  ].join('\n');

  let expected = [
    'let size = 12;',
    'let lHeight = 1.5;',
    'let color = "green";',
    'let pTop = 13;',
    'let style = {',
    '  font: "normal " + (size + 1) + "px/1.5 Helvetica",',
    '  lineHeight: lHeight,',
    '  paddingTop: pTop + "px",',
    '  boxShadow: "1px 1px 0 red, inset 2px 3px 0 " + color,',
    '  backgroundImage: "linear-gradient(to bottom, blue, red)"',
    '};',
  ].join('\n');

  let result = transform(code, {
    babelrc: false,
    plugins: [plugin],
  });

  expect(result.code).toEqual(expected);
});

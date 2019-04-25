# Babel Plugin Styles Literal

_Status: Experimental_

This is an experimental plugin that compiles tagged string literals to inline
style objects that can be used for React elements. No runtime needed.

In:

```js
let style = css`
  font-size: 12px;
  line-height: 1.5;
  color: purple;
`;
let text = <p style={style}>Hello, World!</p>;
```

Out:

```js
let style = {
  fontSize: '12px',
  lineHeight: '1.5',
  color: 'purple',
};
let text = <p style={style}>Hello, World!</p>;
```

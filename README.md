# Babel Plugin Style Literal

This is _an experimental_ plugin that compiles tagged string literals to inline
style objects that can be used in JSX components. No runtime needed.

## Rationale

This is not a "CSS-in-JS" approach and is not supposed to be one. Even though
I heavily use CSS, often I find inline styles useful when prototyping or making
data visualization piece which styles are not just presentation aspects, but
the content itself.

However, there is some friction present when you need to work with inline styles
in JSX. It requires style to be written as an object, with keys camelCased. So
when you have some CSS you can copy-paste, you need to do some work to make it
look like an object. This is quite unproductive piece of work. And later, when
you decide to move those inline styles to a CSS file, an opposite amount of work
has to be done.

This plugin aims at removing that unnecessary friction and unlocking complete
experience in writing CSS code no matter where you need it.

## Usage

1. Install the plugin

```
npm install --save-dev babel-plugin-styles-literal
```

2. Add the plugin to your Babel config

```json
{
  "plugins": ["babel-plugin-styles-literal"]
}
```

In your code, use `css` as a template tag whenever you need to compile a piece
of CSS to object literal. _You don't need to import the tag_, the plugin will
remove it in the build time.

## Examples

In:

```jsx
let style = css`
  font-size: 12px;
  line-height: 1.5;
  color: purple;
`;
let text = <p style={style}>Hello, World!</p>;
```

Out:

```jsx
let style = {
  fontSize: '12px',
  lineHeight: '1.5',
  color: 'purple',
};
let text = <p style={style}>Hello, World!</p>;
```

## License

MIT License.

The implementation is partially based on [**@blia**](https://github.com/blia)'s
[css-tag](https://github.com/blia/css-tag).

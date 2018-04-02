const fs = require("fs");
const path = require("path");

module.exports = html => {
  let style = fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "node_modules",
      "prismjs",
      "themes",
      "prism-okaidia.css"
    )
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
  html, .root { font-size: 16px; line-height: 26px; }
  body, .article { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; font-size: 1rem; line-height: 1.625rem; max-width: 525px; margin: auto; }
  h1, .h1 { font-weight: 900; font-size: 1.9375rem; line-height: 3.25rem; margin-top: 1.625rem; margin-bottom: 3.25rem; }
  h2, .h2 { font-weight: 900; font-size: 1.5625rem; line-height: 1.625rem; margin-top: 8.125rem; margin-bottom: 1.625rem; }
  h3, .h3 { font-weight: 700; font-size: 1.25rem; line-height: 1.625rem; margin-top: 1.625rem; margin-bottom: 0rem; }
  h4, .h4 { font-weight: 700; font-size: 1rem; line-height: 1.625rem; margin-top: 1.625rem; margin-bottom: 0rem; }
  h5, .h5 { font-size: 1rem; line-height: 1.625rem; margin-top: 1.625rem; margin-bottom: 0rem; }
  p, ul, ol, pre, table, blockquote { margin-top: 0rem; margin-bottom: 1.625rem; }
  ul ul, ol ol, ul ol, ol ul { margin-top: 0rem; margin-bottom: 0rem; }
  hr, .hr { border: 1px solid; margin: -1px 0; }
  a, b, i, strong, em, small, code { line-height: 0; }
  sub, sup { line-height: 0; position: relative; vertical-align: baseline; }
  sup { top: -0.5em; }
  sub { bottom: -0.25em; }
  </style>
  <style>${style}</style>
  <style>
  h3, .h3 { font-size: 1rem; text-transform: uppercase }

  p, ul, ol, pre, table, blockquote  { #333 }

  pre { overflow: auto; max-width: 100% }
  pre[class*="language-"] {
    margin-bottom: 1.625rem
  }
  code { font-size: .9em }
  code:not([class*="language-"]) { background-color: #f4f4f4; padding: .25em .5em; border-radius: .125em }

  body, .article { max-width: 34em; }
  @media screen and (min-width: 0) {
      body, .article { margin: 1rem }
  }
  @media screen and (min-width: 34em) {
    body, .article { margin: 2rem }
  }
  </style>
</head>
<body>
${html}
<script src="https://unpkg.com/prismjs@1.13.0/prism.js"></script>
<script src="https://unpkg.com/prismjs@1.13.0/components/prism-jsx.js"></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-56273983-7"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-56273983-7');
</script>
</body>
</html>
`;
};

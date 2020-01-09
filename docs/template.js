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
  body, .article { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; font-size: 1rem; line-height: 1.625rem; /* max-width: 32em; */ margin: auto; }
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
  
  p { max-width: 32em }

  pre { overflow: auto; max-width: 100% }
  pre[class*="language-"] {
    margin-bottom: 1.625rem
  }
  code { font-size: .9em }
  code:not([class*="language-"]) { background-color: #f4f4f4; padding: .25em .5em; border-radius: .125em }

  body, .article { max-width: 48em }
  @media screen and (min-width: 0) {
      body, .article { margin: 1rem }
  }
  @media screen and (min-width: 34em) {
    body, .article { margin: 2rem }
  }
  </style>
  <style type="text/css">
    /* MailChimp Form Embed Code - Horizontal Super Slim - 12/16/2015 v10.7
    Adapted from: http://blog.heyimcat.com/universal-signup-form/ */

    /* #mc_embed_signup form {text-align:center; padding:10px 0 10px 0;} */
    .mc-field-group { display: inline-block; } /* positions input field horizontally */
    #mc_embed_signup input.email {font-family:"Open Sans","Helvetica Neue",Arial,Helvetica,Verdana,sans-serif; font-size: 15px; border: 1px solid #ABB0B2;  -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; color: #343434; background-color: #fff; box-sizing:border-box; height:32px; padding: 0px 0.4em; display: inline-block; margin: 0; width:350px; vertical-align:top;}
    #mc_embed_signup label {display:block; font-size:16px; padding-bottom:10px; font-weight:bold;}
    #mc_embed_signup .clear {display: inline-block;} /* positions button horizontally in line with input */
    #mc_embed_signup .button {font-size: 13px; border: none; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; letter-spacing: .03em; color: #fff; background-color: #aaa; box-sizing:border-box; height:32px; line-height:32px; padding:0 18px; display: inline-block; margin: 0; transition: all 0.23s ease-in-out 0s;}
    #mc_embed_signup .button:hover {background-color:#777; cursor:pointer;}
    #mc_embed_signup div#mce-responses {float:left; top:-1.4em; padding:0em .5em 0em .5em; overflow:hidden; width:90%;margin: 0 5%; clear: both;}
    #mc_embed_signup div.response {margin:1em 0; padding:1em .5em .5em 0; font-weight:bold; float:left; top:-1.5em; z-index:1; width:80%;}
    #mc_embed_signup #mce-error-response {display:none;}
    #mc_embed_signup #mce-success-response {color:#529214; display:none;}
    #mc_embed_signup label.error {display:block; float:none; width:auto; margin-left:1.05em; text-align:left; padding:.5em 0;}
    @media (max-width: 768px) {
        #mc_embed_signup input.email {width:100%; margin-bottom:5px;}
        #mc_embed_signup .clear {display: block; width: 100% }
        #mc_embed_signup .button {width: 100%; margin:0; }
    }
    #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; width:100%;}
    /* Add your own MailChimp form style overrides in your site stylesheet or in this style block.
      We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
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

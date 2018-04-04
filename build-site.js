#!/usr/local/bin/env node

const remark = require("remark");
const recommended = require("remark-preset-lint-recommended");
const html = require("remark-html");
const slug = require("remark-slug");
const headings = require("remark-autolink-headings");
const toc = require("remark-toc");
const report = require("vfile-reporter");
const fs = require("fs");
const path = require("path");
const prism = require("prismjs");
const jsx = require("prismjs/components/prism-jsx");
const argv = require("minimist")(process.argv.slice(2));
const chalk = require("chalk");
const prettyBytes = require("pretty-bytes");

function defaultTemplate(html) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>README</title>
</head>
<body>
${html}
</body>
</html>
`;
}

let options = {
  input: path.join(__dirname, argv.input || "README.md"),
  output: path.join(__dirname, argv.output || "index.html"),
  headings: argv.headings || 6,
  template: argv.template
    ? require(path.join(__dirname, argv.template))
    : defaultTemplate
  // watch: argv.watch || false
};

function main(opts) {
  let source = fs.readFileSync(opts.input, {
    encoding: "UTF8"
  });

  remark()
    .use(recommended)
    .use(slug)
    .use(headings)
    .use(toc, { maxDepth: opts.headings })
    .use(html)
    .process(source, (err, file) => {
      console.error(report(file));

      fs.writeFile(
        opts.output,
        opts.template(String(file)),
        {
          encoding: "UTF8"
        },
        err => {
          if (err) return console.log(chalk.red(err));

          fs.stat(opts.output, (err, stats) => {
            console.log(chalk.green(`  ${opts.output} written.`));
            console.log(chalk.green(`  ${prettyBytes(stats.size / 1000)}`));
          });
        }
      );
    });
}

main(options);

// if (options.watch) {
//   fs.watchFile(options.input, () => {
//     console.log(`Re-building ${options.input}.`);

//     main(options);
//   });
// }

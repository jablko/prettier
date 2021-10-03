"use strict";

const {
  builders: { softline, hardline, dedentToRoot },
} = require("../../document/index.js");
const { escapeTemplateCharacters } = require("../print/template-literal.js");

function format(path, print, textToDoc) {
  const node = path.getValue();
  const text = node.quasis[0].value.raw.replace(
    /((?:\\\\)*)\\`/g,
    (_, backslashes) => "\\".repeat(backslashes.length / 2) + "`"
  );
  const doc = escapeTemplateCharacters(
    textToDoc(
      text,
      { parser: "markdown", __inJsTemplate: true },
      { stripTrailingHardline: true }
    ),
    true
  );
  const isIndented = /^[\t ]+\S/m.test(text);
  return [
    "`",
    dedentToRoot([isIndented ? hardline : softline, doc]),
    softline,
    "`",
  ];
}

module.exports = format;

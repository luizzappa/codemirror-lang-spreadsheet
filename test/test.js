import {spreadsheetLanguage, setLezerIdiom} from "../dist/index.js"
import {fileTests} from "@lezer/generator/dist/test"

import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from 'url';
let caseDir = path.dirname(fileURLToPath(import.meta.url)),
  i18nDir = path.join(caseDir, 'i18n');

const isTxtFile = (file) => /\.txt$/.test(file),
  getFileName = (file) =>  /^[^\.]*/.exec(file)[0];

for (let file of fs.readdirSync(caseDir)) {
  if (!isTxtFile(file)) continue;

  let name = getFileName(file);
  describe(name, () => {
    for (let {name, run} of fileTests(fs.readFileSync(path.join(caseDir, file), "utf8"), file))
      it(name, () => run(spreadsheetLanguage.parser))
  })
}

for (let idiom of fs.readdirSync(i18nDir)) {
  for (let file of fs.readdirSync(path.join(i18nDir, idiom))) { 
    if (!isTxtFile(file)) continue;

    const name = `i18n ${idiom} [${getFileName(file)}]`;
    describe(name, () => {
      for (let {name, run} of fileTests(fs.readFileSync(path.join(i18nDir, idiom, file), "utf8"), file))
        it(name, () => {
          setLezerIdiom(idiom);
          return run(spreadsheetLanguage.parser);
        })
    })
  }
}

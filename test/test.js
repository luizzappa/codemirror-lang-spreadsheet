import {spreadsheetLanguage, setIdiom} from "../dist/index.js"
import {fileTests} from "@lezer/generator/dist/test"

import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from 'url';
let caseDir = path.dirname(fileURLToPath(import.meta.url)),
  i18nDir = path.join(caseDir, 'i18n');

const isTxtFile = (file) => /\.txt$/.test(file),
  getFileName = (file) =>  /^[^\.]*/.exec(file)[0];

// for (let file of fs.readdirSync(caseDir)) {
//   if (!isTxtFile(file)) continue;

//   let name = getFileName(file);
//   describe(name, () => {
//     for (let {name, run} of fileTests(fs.readFileSync(path.join(caseDir, file), "utf8"), file))
//       it(name, () => run(spreadsheetLanguage.parser))
//   })
// }

for (let file of fs.readdirSync(i18nDir)) {
  if (!isTxtFile(file)) continue;

  const idiom = getFileName(file),
    name = `i18n: ${idiom}`;
  describe(name, () => {
    for (let {name, run} of fileTests(fs.readFileSync(path.join(i18nDir, file), "utf8"), file))
      it(name, () => {
        setIdiom(idiom);
        return run(spreadsheetLanguage.parser);
      })
  })
}

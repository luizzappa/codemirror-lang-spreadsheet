# CodeMirror Spreadsheet plugin

Implements spreadsheet functions support for the [CodeMirror](https://codemirror.net/6/) code editor.

Includes the CodeMirror `LanguageSupport` and `LRLanguage` grammar.

To build this I used the paper  ["A Grammar for Spreadsheet Formulas Evaluated on Two Large Datasets"](https://fenia266781730.files.wordpress.com/2019/01/07335408.pdf) and [XLParser](https://github.com/spreadsheetlab/XLParser) as a basis.

### Installation

```
npm install codemirror-lang-spreadsheet
```

### Usage

```
import { spreadsheet } from "codemirror-lang-spreadsheet"
```

For a complete demo with highlighting, autocomplete and prettier go to:

### Maintainers

To build:
```
npm run build
```

Always add tests to new features. To run them:
```
npm run test
```

### To Do:

- Support for internationalization. Currently keywords are in English as boolean (`TRUE`, `FALSE`) and errors (eg `#NAME?`). Functions are identified regardless of language.
- Support for changing decimal separator (currently dot), function arguments separator (currently comma)
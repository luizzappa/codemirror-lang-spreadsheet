# CodeMirror Spreadsheet plugin

Implements spreadsheet functions support for the [CodeMirror](https://codemirror.net/6/) code editor.

Includes the CodeMirror `LanguageSupport` and `LRLanguage` grammar.

### Usage

```
import { spreadsheetLanguage } from "@luizzappa/codemirror-lang-spreadsheet"
```

For a complete demo with highlight, autocomplete and prettier go to:

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
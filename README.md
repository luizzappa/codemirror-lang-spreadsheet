# CodeMirror Spreadsheet plugin

Implements spreadsheet functions support for the [CodeMirror v6](https://codemirror.net/6/) code editor 📜

To build this I used the paper  ["A Grammar for Spreadsheet Formulas Evaluated on Two Large Datasets"](https://fenia266781730.files.wordpress.com/2019/01/07335408.pdf) and [XLParser](https://github.com/spreadsheetlab/XLParser) as a basis.

### Features

🔠 Support for different idioms ​​(and easily extensible to include new ones)
🖩 Support for different decimal separators


### Installation

```
npm install codemirror-lang-spreadsheet
```

### Usage

First import as shown below:
```
import {spreadsheet} from "codemirror-lang-spreadsheet";
```

Call the `spreadsheet` function inside the editor instance. This function expects an options object as an argument. Available options are `idiom`(string with desired language, eg `"en-US"`) and `decimalSeparator` (string with decimal separator: `"."` or `";"`)
```
new EditorView({
  extensions: [
    // ... your other CodeMirror extensions
    // ...
    spreadsheet({
        idiom: "en-US"
        decimalSeparator: "."
    })
  ],
  parent: document.getElementById("editor")
});
```

👉 For a complete demo with **highlighting**, **autocomplete** and **prettier** go to: [codemirror-app-spreadsheet](https://github.com/luizzappa/codemirror-app-spreadsheet)

### Supported idioms 🗣️

Idioms are used for keywords like booleans (`TRUE`, `FALSE`) and error tokens (like `#REF!`, `#NAME!`, ...).

Currently supported:
- en-US
- pt-BR

It's pretty simple to add support for other languages. See the contribution section.

### Contribution 

Contributions are welcome, but for every feature added, tests must be added.

To build:
```
npm run build
```

Running the tests:
```
npm run test
```

To add support for a new language follow the steps below:

In the `tokens.ts` file, add the language as a new supported type:
```
TsupportedIdioms = 'en-US' | 'pt-BR'; 
```

Still in this file, for each of the `i18n` object keys, add a value with the respective idiom translation. There is no fallback to a default idiom, so even if a token is the same in another idiom, it has to be repeated.
```
const i18n = {
  BoolToken: {
    'en-US': ['TRUE', 'FALSE'],
    'pt-BR': ['VERDADEIRO', 'FALSO']
  },
  RefErrorToken: { // repeated token
    'en-US': '#REF!',
    'pt-BR': '#REF!'
  },
  //...
}
```

Now it is necessary to create tests. Create a new folder named after the idiom inside the `test/i18n` folder. Copy the `boolean.txt` and `errors.txt` files from another idiom and adapt them to the new idiom.

[This site](https://en.excel-translator.de/) is a good reference for translations.

When extending support for a new idiom open a PR 💙

### To Do:

- Add fallback to default language (en-US) when tokens are the same across idioms. This will reduce the packet size.
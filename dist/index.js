import { ExternalTokenizer, LRParser } from '@lezer/lr';
import { LRLanguage, indentNodeProp, delimitedIndent, foldNodeProp, foldInside, LanguageSupport } from '@codemirror/language';
import { styleTags, tags } from '@lezer/highlight';

// This file was generated by lezer-generator. You probably shouldn't edit it.
const intersecop = 39,
  Separator$1 = 1,
  decimalSeparator$1 = 40,
  arrayRowSeparator = 41,
  RefErrorToken = 2,
  ErrorToken = 3,
  BoolToken = 4;

/* Hand-written tokenizers for excel formula tokens that can't be
  expressed by lezer's built-in tokenizer (or are harder to express). */
const backSlash = 92, comma = 44, closeParen = 41, dot = 46, euroSign = 8364, openParen = 40, questionMark = 63, semiColon = 59, underscore = 95, isAsciiLeter = (charCode) => {
    return ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122));
}, isDigit = (charCode) => charCode >= 48 && charCode <= 57, isSpace = (charCode) => {
    return ([
        9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196,
        8197, 8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288
    ].indexOf(charCode) !== -1);
};
let currDecimalSeparator = '.';
let currIdiom = 'en-US';
// Always uppercase
// Source: https://en.excel-translator.de/
const i18n = {
    BoolToken: {
        'en-US': ['TRUE', 'FALSE'],
        'pt-BR': ['VERDADEIRO', 'FALSO']
    },
    RefErrorToken: {
        'en-US': '#REF!',
        'pt-BR': '#REF!'
    },
    ErrorToken: {
        'en-US': [
            '#NULL!',
            '#DIV/0!',
            '#VALUE!',
            '#NAME?',
            '#NUM!',
            '#N/A',
            '#GETTING_DATA',
            '#SPILL!'
        ],
        'pt-BR': [
            '#NULO!',
            '#DIV/0!',
            '#VALOR!',
            '#NOME?',
            '#NÚM!',
            '#N/D',
            '#OBTENDO_DADOS',
            '#DESPEJAR!'
        ]
    }
};
const isIntersecop = new ExternalTokenizer((input, stack) => {
    let { next } = input, before;
    if (!isSpace(next) &&
        ((before = input.peek(-1)) !== closeParen ||
            !isDigit(before) ||
            !isAsciiLeter(before) ||
            before !== backSlash ||
            before !== underscore ||
            before !== dot ||
            before !== questionMark ||
            before !== euroSign))
        return;
    for (;;) {
        next = input.advance();
        if (!isSpace(next))
            break;
    }
    if (next === openParen ||
        isAsciiLeter(next) ||
        isDigit(next) ||
        before === backSlash ||
        before === underscore)
        return input.acceptToken(intersecop);
}, { contextual: true });
const decimalSeparator = new ExternalTokenizer((input, stack) => {
    const { next } = input, charCodeDecimalSeparator = {
        '.': dot,
        ',': comma
    }[currDecimalSeparator];
    if (next === charCodeDecimalSeparator)
        return input.acceptToken(decimalSeparator$1, 1);
});
const Separator = new ExternalTokenizer((input, stack) => {
    const { next } = input, 
    // Depending on the decimal separator, the separator changes
    currSeparator = {
        // Key is the decimal separator and Value is the separator
        '.': comma,
        ',': semiColon
    }[currDecimalSeparator];
    if (next === currSeparator)
        return input.acceptToken(Separator$1, 1);
});
const isArrayRowSeparator = (value, stack) => {
    // Depending on the decimal separator, the row separator of the array changes
    const currArrayRowSeparator = {
        // Key is the decimal separator and Value is the array row separator
        '.': ',',
        ',': '\\'
    }[currDecimalSeparator];
    return value === currArrayRowSeparator ? arrayRowSeparator : -1;
};
const desambiguateNameToken = (value, stack) => {
    if (i18n.BoolToken[currIdiom].indexOf(value.toUpperCase()) !== -1) {
        return BoolToken;
    }
    return -1;
};
const isErrors = (value, stack) => {
    if (i18n.RefErrorToken[currIdiom].indexOf(value.toUpperCase()) !==
        -1) {
        return RefErrorToken;
    }
    else if (i18n.ErrorToken[currIdiom].indexOf(value.toUpperCase()) !== -1) {
        return ErrorToken;
    }
    return -1;
};
const setLezerIdiom = (newIdiom) => (currIdiom = newIdiom);
const setDecimalSeparator = (newDecimalSeparator) => (currDecimalSeparator = newDecimalSeparator);

// This file was generated by lezer-generator. You probably shouldn't edit it.
const parser = LRParser.deserialize({
  version: 14,
  states: ",lO!aQ[OOOOQR'#Cc'#CcO!kQZO'#CcO$[QZO'#D[OOQR'#Ch'#ChO%iQ[O'#D[O&wQZO'#D]OOQO'#D`'#D`O'XQ`O'#D`OOQR'#Cb'#CbO'aQWO'#CbOOQU'#DO'#DOO'rQ^O'#CsO)VQWO'#CsOOQQ'#Cr'#CrO*VQWO'#DYO*^Q^O'#CuO%lQ[O'#CuOOQQ'#Cu'#CuO+YQ[O'#CyOOQQ'#D['#D[OOQO'#DY'#DYQOQWOOO%lQ[O'#DYO+aQWO,59TO+aQWO,59SO,OQZO,59wO,YQWO,59SO,_QWO,59vO*kQ[O'#CyOOQQ,59v,59vOOQR,59S,59SOOQO,59z,59zOOQR,58|,58|OOQU-E6|-E6|O,fQYO,59_OOQQ,59_,59_O%lQ[O,5:QO%lQ[O,5:QO%lQ[O,5:QO%lQ[O,5:QO%lQ[O,5:QOOQQ,59a,59aO-vQYO'#CxO.QQYO'#CwO.YQWO,59aO._QYO,59aOOQS'#Dq'#DqOOQO'#C|'#C|O.oQ[O'#C|O.wQWO'#C{O/SQWO'#CzO/[QWO,59eO%lQ[O,5:`O/aQWO,59tOOQR1G.o1G.oO+aQWO'#ChO/hQZO1G.nO+aQWO'#C}O0xQYO,59VOOQR1G/c1G/cOOQR1G.n1G.nOOQQ1G/b1G/bO1QQYO1G.yO3fQYO1G/lO3mQYO1G/lO4uQYO1G/lO5PQYO1G/lO5rQYO1G/lO*^Q^O'#DPO6fQYO,59cOOQQ1G.{1G.{OOQO,59h,59hO*kQ[O'#DQO6nQWO,59gO6yQWO,59fO*kQ[O'#DROOQQ1G/P1G/PO7RQWO1G/zO7YQXO'#CiO7bQZO,59iOOQQ-E6{-E6{OOQQ,59k,59kOOQQ-E6}-E6}OOQO,59l,59lOOQO-E7O-E7OOOQO-E7P-E7POOQO,59m,59mOOQO7+%f7+%f",
  stateData: "8W~O{OS~OQQOR^OS^OWPOXPOYPOZPO^TOaVObWOdVOh^Oj`Ox]O!TZO!UaO!VaO!WaO~O}gO!dcO~PVOQ!SXW!SXX!SXY!SXZ!SXvVXwVX}VX!QVX!RVX!UVX!VVX!XVX!ZVX![VX!]VX!^VX!_VX!`VX!aVX!bVX!cVXPVX`VX!gVX~OwiO!QhOv!OX}!OX!U!OX!V!OX!X!OX!Z!OX![!OX!]!OX!^!OX!_!OX!`!OX!a!OX!b!OX!c!OX`!OXP!OX!g!OX~O`nO!dmO~PVO!RoOw!PX}!PX!Q!PX!U!PX!V!PX!X!PX!Z!PX![!PX!]!PX!^!PX!_!PX!`!PX!a!PX!b!PX!c!PX~Ov!PXP!PX`!PX!g!PX~P%sOcpOepO~OQPOWPOXPOYPOZPO~OxsO!TZOvgX}gX!UgX!VgX!XgX!ZgX![gX!]gX!^gX!_gX!`gX!agX!bgX!cgX`gXPgXygX!fgX!ggX~O!TtO~O}yO!UwO!VwO!XzO!ZuO![vO!]vO!^xO!_yO!`yO!ayO!byO!cyO~Ov|X~P)[O!dmOPlP`lP~PVOQ!QOR^OS^Oh^Ox]O!TZO!U!PO!V!PO!W!PO~O}!VO~P*kOQQOWPOXPOYPOZPO^!YOaVObWOdVO~OP![O`!^O~P%sO`!_O~O`!`O~P)[O!TZOvga}ga!Uga!Vga!Xga!Zga![ga!]ga!^ga!_ga!`ga!aga!bga!cga`gaPgayga!fga!gga~OPlX`lX~P)[OP!gO`kX~O`!iO~Ovia`iaPia!gia~P)[Ox]O!TZO~Oy!kO!foX!goX~O!f!nO!gnX~O!g!oO~Ov|a~P)[O!QhOv[iw[i}[i!R[i!U[i!V[i!X[i!Z[i![[i!][i!^[i!_[i!`[i!a[i!b[i!c[iP[i`[i!g[i~OP![O`_a~O!TZOvgi}gi!Ugi!Vgi!Xgi!Zgi![gi!]gi!^gi!_gi!`gi!agi!bgi!cgi`giPgiygi!fgi!ggi~O!XzOv!Yi}!Yi!U!Yi!V!Yi![!Yi!]!Yi!^!Yi!_!Yi!`!Yi!a!Yi!b!Yi!c!Yi`!YiP!Yi!g!Yi~O!Z!Yi~P2bO!ZuO~P2bO!XzO!ZuO![vO!]vOv!Yi}!Yi!^!Yi!_!Yi!`!Yi!a!Yi!b!Yi!c!Yi`!YiP!Yi!g!Yi~O!U!Yi!V!Yi~P3tO!UwO!VwO~P3tO!UwO!VwO!XzO!ZuO![vO!]vO!^xO~Ov!Yi}!Yi!_!Yi!`!Yi!a!Yi!b!Yi!c!Yi`!YiP!Yi!g!Yi~P5ZOP!gO`ka~Oy!kO!foa!goa~O!f!nO!gna~O!g!zO~P)[OwiO!QhO~O!RoOPqa`qaw!PX!Q!PX~OZecdha!TjYW!iX!j!R!W!U{Y~",
  goto: ")f!iPPPPPP!j#QPPPP#g#yP$]PPPPPP$a$uP%[P%j%m%[%s%w&O&W&^&x'O'UPPPPPP'[P'_(RPP(kPPPPP(}PPPPPPPPPP)]PP)cjUO`aghiuvwxy!V!gSjT!YR!r![pXOT`aghiuvwxy!V!Y![!gRqYqXOT`aghiuvwxy!V!Y![!gqSOT`aghiuvwxy!V!Y![!gTkT!YhdOT`aguvwxy!V!gX!Qcm!k!np^OT`acgmuvwxy!V!g!k!nR!j!RidOT`aguvwxy!V!gR}`Q|`R!t!gT!UcmS!TcmR!y!nU!Scm!nR!v!kQ!]jR!s!]r[OT`acgmuvwxy!R!V!g!k!nSr[!aR!asQ!h|R!u!hQ!l!SR!w!lQ!m!TR!x!mRfOQ_OQlTS{`!gQ!OaQ!WgQ!buQ!cvQ!dwQ!exQ!fyR!p!VhROT`aguvwxy!V!gQ!XhQ!ZiT!q!Y![qYOT`aghiuvwxy!V!Y![!gibOT`aguvwxy!V!gX!Rcm!k!nReO",
  nodeNames: "⚠ Separator RefErrorToken ErrorToken BoolToken Program Reference ReferenceItem CellToken NameToken VerticalRangeToken HorizontalRangeToken ReferenceFunctionCall RangeToken OpenParen Union CloseParen SheetToken QuoteS SheetQuotedToken MultipleSheetsToken MultipleSheetsQuotedToken Constant Number TextToken FunctionCall Function Arguments Argument ConstantArray ArrayColumns ArrayRows ArrayConstant",
  maxTerm: 72,
  nodeProps: [
    ["closedBy", -2,14,26,"CloseParen"],
    ["openedBy", 16,"OpenParen | Function"]
  ],
  skippedNodes: [0],
  repeatNodeCount: 5,
  tokenData: "#*i~RyOX#rXY/XYZ/XZ]#r]^/X^p#rpq1Xqr#rrs2fstHetuK_uv!6[vw!7Swx!7zxy!8Syz!8zz{!9r{|!9w|}!;h}!O!<`!O!P#r!P!Q!=W!Q![!=]![!]!>|!]!^!?R!^!_!?y!_!`!Bg!`!a!C_!b!c!ET!c!}!Ft#O#P#'b#Q#R#(R#R#S!Iu#S#T#r#T#o!Ft#o#p#(y#p#q#r#q#r#)q#r;'S#r;'S;=`/R<%lO#r~#uhOp#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![#r![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#rQ%dZOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aQ&YQqr&`wx%aQ&eOcQQ&hYOw'Wwx(_xz'W{!P'W!Q!['W!]!a'W!b!}'W#Q;'S'W;'S;=`(X<%lO'WQ'ZYOw'Wwx'yxz'W{!P'W!Q!['W!]!a'W!b!}'W#Q;'S'W;'S;=`(X<%lO'WQ'|Qqr(Swx'WQ(XOeQQ([P;=`<%l'WQ(bPwx'WQ(hP;=`<%l%a~(pha~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![#r![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~*_fOp+spq'Wqs+sst'Wtu+suw'Wwx(_xz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!}+s#Q#R'W#R#o+s#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~+vgOp+spq'Wqr-_rs+sst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!}+s#Q#R'W#R#o+s#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~-dgd~Op+spq'Wqr-_rs+sst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!}+s#Q#R'W#R#o+s#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~/OP;=`<%l+s~/UP;=`<%l#r~/^m{~OX#rXY/XYZ/XZ]#r]^/X^p#rpq1Xqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![#r![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~1^b{~OX%aXY1XYZ1XZ]%a]^1X^p%apq1Xqw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%a~2ilOp2fpq4aqr=[rs?Xst4atu2fuw4awx6gxz4az{7S{|2f|!O4a!O!P2f!P!Q7S!Q![2f![!]@x!]!a4a!a!b7S!b!}2f!}#Q7S#Q#R4a#R#o2f#o#p4a#p#q2f#q#r4a#r;'S2f;'S;=`H_<%lO2f~4daOr4ars5isw4awx6gxz4az{7S{!P4a!P!Q7S!Q![4a![!]8Y!]!a4a!a!b7S!b!}4a!}#Q7S#Q;'S4a;'S;=`=U<%lO4a~5n]h~Or%ars4asw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%a~6jWOq7Sqr7trs7fsw7Swx4ax;'S7S;'S;=`7n<%lO7S~7VTOr7Srs7fs;'S7S;'S;=`7n<%lO7S~7kPh~rs7S~7qP;=`<%l7S~7yTcQOr7Srs7fs;'S7S;'S;=`7n<%lO7S~8]aOr9brs:jsw9bwx<lxz9bz{7S{!P9b!P!Q7S!Q![9b![!]7S!]!a9b!a!b7S!b!}9b!}#Q7S#Q;'S9b;'S;=`<f<%lO9b~9eaOr9brs:jsw9bwx;exz9bz{7S{!P9b!P!Q7S!Q![9b![!]7S!]!a9b!a!b7S!b!}9b!}#Q7S#Q;'S9b;'S;=`<f<%lO9b~:o[h~Or'Wrs9bsw'Wwx'yxz'W{!P'W!Q!['W!]!a'W!b!}'W#Q;'S'W;'S;=`(X<%lO'W~;hWOq7Sqr<Qrs7fsw7Swx9bx;'S7S;'S;=`7n<%lO7S~<VTeQOr7Srs7fs;'S7S;'S;=`7n<%lO7S~<iP;=`<%l9b~<oVOr7Srs7fsw7Swx9bx;'S7S;'S;=`7n<%lO7S~=XP;=`<%l4a~=ala~Op2fpq4aqr=[rs?Xst4atu2fuw4awx6gxz4az{7S{|2f|!O4a!O!P2f!P!Q7S!Q![2f![!]@x!]!a4a!a!b7S!b!}2f!}#Q7S#Q#R4a#R#o2f#o#p4a#p#q2f#q#r4a#r;'S2f;'S;=`H_<%lO2f~?^hh~Op#rpq%aqr(krs2fst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![#r![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~@{lOpBspq9bqrBsrsFkst9btuBsuw9bwx<lxz9bz{7S{|Bs|!O9b!O!PBs!P!Q7S!Q![Bs![!]7S!]!a9b!a!b7S!b!}Bs!}#Q7S#Q#R9b#R#oBs#o#p9b#p#qBs#q#r9b#r;'SBs;'S;=`HX<%lOBs~BvlOpBspq9bqrDnrsFkst9btuBsuw9bwx;exz9bz{7S{|Bs|!O9b!O!PBs!P!Q7S!Q![Bs![!]7S!]!a9b!a!b7S!b!}Bs!}#Q7S#Q#R9b#R#oBs#o#p9b#p#qBs#q#r9b#r;'SBs;'S;=`HX<%lOBs~Dsld~OpBspq9bqrDnrsFkst9btuBsuw9bwx;exz9bz{7S{|Bs|!O9b!O!PBs!P!Q7S!Q![Bs![!]7S!]!a9b!a!b7S!b!}Bs!}#Q7S#Q#R9b#R#oBs#o#p9b#p#qBs#q#r9b#r;'SBs;'S;=`HX<%lOBs~Fpgh~Op+spq'Wqr-_rsBsst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!}+s#Q#R'W#R#o+s#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~H[P;=`<%lBs~HbP;=`<%l2f~Hj[!R~Ow%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!c%a!c!}I`#Q;'S%a;'S;=`(e<%lO%a~Ied!j~Oq%aqrI`rw%awx&Vxz%a{!P%a!P!QJs!Q![I`![!]&e!]!a%a!a!bJs!b!c%a!c!}I`#Q#R%a#R#SI`#S%r%a%r%sI`%s;'S%a;'S;=`(e<%lO%a~JxV!j~qrJs!P!QJs!Q![Js!a!bJs!c!}Js#R#SJs%r%sJs~KbjOp#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![MS![!]*[!]!a%a!b!c#r!c!}!%b#Q#R%a#R#T#r#T#o!%b#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~MVhOp#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![MS![!]Nq!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~NtfOp+spq'Wqs+sst'Wtu!!Yuw'Wwx(_xz'W{|+s|!O'W!O!P+s!Q![!#t!]!a'W!b!}+s#Q#R'W#R#o+s#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~!!]gOp+spq'Wqr-_rs+sst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![!#t!]!a'W!b!}+s#Q#R'W#R#o+s#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~!#ygZ~Op+spq'Wqr-_rs+sst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![!#t!]!a'W!b!}+s#Q#R'W#R#o+s#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~!%ejOp#rpq%aqr(krs#rst%atu!'Vuw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![!(t![!]!*e!]!a%a!b!c#r!c!}!2x#Q#R%a#R#T#r#T#o!2x#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~!'YhOp#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![!(t![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~!(yhW~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![!(t![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~!*hhOp+spq'Wqs+sst'Wtu!,Suw'Wwx(_xz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!c+s!c!}!-t#Q#R'W#R#T+s#T#o!-t#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~!,ViOp+spq'Wqr-_rs+sst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!c+s!c!}!-t#Q#R'W#R#T+s#T#o!-t#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~!-yiY~Op+spq'Wqr-_rs+sst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!c+s!c!}!/h#Q#R'W#R#T+s#T#o!/h#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~!/miY~Op+spq'Wqr-_rs+sst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!c+s!c!}!1[#Q#R'W#R#T+s#T#o!1[#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~!1agY~Op+spq'Wqr-_rs+sst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!}+s#Q#R'W#R#o+s#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~!2{jOp#rpq%aqr(krs#rst%atu!'Vuw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![!(t![!]!*e!]!a%a!b!c#r!c!}!4m#Q#R%a#R#T#r#T#o!4m#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~!4phOp#rpq%aqr(krs#rst%atu!'Vuw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![!(t![!]!*e!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#rR!6aZ!XPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!7XZ!^POw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!8PPbPwx%aR!8XZ^POw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!9PZ`POw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%a~!9wO![~~!9|h!U~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![#r![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~!;mZ!i~Ow%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!<eZ!VPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%a~!=]O!]~~!=bh!T~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![!=]![!]Nq!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~!?RO!Q~R!?WZ!fPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!@O]!`POw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!_%a!_!`!@w!`!a!Ao!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!@|Z!cPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!AtZ!aPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!BlZ}POw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!Cd]!_POw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!_%a!_!`!D]!`!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!DbZ!bPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%a~!EYh!W~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![#r![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~!FypX~Op#rpq%aqr(krs#rst%atu!'Vuw%awx&Vxy!H}yz%a{|#r|!O%a!O!P!Iu!Q![!Ns![!]!*e!]!a%a!a!b!LO!b!c#r!c!}##O#O#P!LO#Q#R%a#R#S!Iu#S#T#r#T#o##O#o#p%a#p#q#r#q#r%a#r$Lv#r$Lv$Lw!Lm$Lw;'S#r;'S;=`/R<%lO#r~!ISZj~Ow%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%a~!IzpX~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxy!H}yz%a{|#r|!O%a!O!P!Iu!Q![!Iu![!]*[!]!a%a!a!b!LO!b!c#r!c!}!Iu#O#P!LO#Q#R%a#R#S!Iu#S#T#r#T#o!Iu#o#p%a#p#q#r#q#r%a#r$Lv#r$Lv$Lw!Lm$Lw;'S#r;'S;=`/R<%lO#r~!LTWX~!O!P!LO!Q![!LO!a!b!LO!c!}!LO#O#P!LO#R#S!LO#T#o!LO$Lv$Lw!LO~!LroX~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P!Lm!Q![!Lm![!]*[!]!a%a!a!b!LO!b!c#r!c!}!Lm#O#P!LO#Q#R%a#R#S!Lm#S#T#r#T#o!Lm#o#p%a#p#q#r#q#r%a#r$Lv#r$Lv$Lw!Lm$Lw;'S#r;'S;=`/R<%lO#r~!NzpW~X~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxy!H}yz%a{|#r|!O%a!O!P!Iu!Q![!Ns![!]*[!]!a%a!a!b!LO!b!c#r!c!}!Iu#O#P!LO#Q#R%a#R#S!Iu#S#T#r#T#o!Iu#o#p%a#p#q#r#q#r%a#r$Lv#r$Lv$Lw!Lm$Lw;'S#r;'S;=`/R<%lO#r~##TpX~Op#rpq%aqr(krs#rst%atu!'Vuw%awx&Vxy!H}yz%a{|#r|!O%a!O!P!Iu!Q![!Ns![!]!*e!]!a%a!a!b!LO!b!c#r!c!}#%X#O#P!LO#Q#R%a#R#S!Iu#S#T#r#T#o#%X#o#p%a#p#q#r#q#r%a#r$Lv#r$Lv$Lw!Lm$Lw;'S#r;'S;=`/R<%lO#r~#%^pX~Op#rpq%aqr(krs#rst%atu!'Vuw%awx&Vxy!H}yz%a{|#r|!O%a!O!P!Iu!Q![!Ns![!]!*e!]!a%a!a!b!LO!b!c#r!c!}!Iu#O#P!LO#Q#R%a#R#S!Iu#S#T#r#T#o!Iu#o#p%a#p#q#r#q#r%a#r$Lv#r$Lv$Lw!Lm$Lw;'S#r;'S;=`/R<%lO#r~#'iW!i~X~!O!P!LO!Q![!LO!a!b!LO!c!}!LO#O#P!LO#R#S!LO#T#o!LO$Lv$Lw!LOR#(WZ!ZPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR#)OZ!dPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR#)vZ!gPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%a",
  tokenizers: [isIntersecop, Separator, decimalSeparator, 0, 1],
  topRules: {"Program":[0,5]},
  specialized: [{term: 71, get: (value, stack) => (isArrayRowSeparator(value) << 1), external: isArrayRowSeparator},{term: 72, get: (value, stack) => (isErrors(value) << 1), external: isErrors},{term: 9, get: (value, stack) => (desambiguateNameToken(value) << 1), external: desambiguateNameToken}],
  tokenPrec: 1047
});

const spreadsheetLanguage = LRLanguage.define({
    parser: parser.configure({
        props: [
            indentNodeProp.add({
                Application: delimitedIndent({ closing: ')', align: false })
            }),
            foldNodeProp.add({
                Application: foldInside
            }),
            styleTags({
                // References
                'Reference/...': tags.color,
                'RangeToken!': tags.tagName,
                CellToken: tags.tagName,
                VerticalRangeToken: tags.tagName,
                HorizontalRangeToken: tags.tagName,
                RefErrorToken: tags.invalid,
                // Constants
                BoolToken: tags.bool,
                ErrorToken: tags.invalid,
                NumberToken: tags.number,
                TextToken: tags.string,
                // Functions
                Function: tags.function(tags.name),
                // Symbols
                OpenParen: tags.name,
                CloseParen: tags.name,
                '[ ]': tags.squareBracket,
                '{ }': tags.brace
            })
        ]
    })
});
const changeIdiom = setLezerIdiom, changeDecimalSeparator = setDecimalSeparator;
function spreadsheet({ idiom = 'en-US', decimalSeparator = '.' } = {}) {
    setLezerIdiom(idiom);
    setDecimalSeparator(decimalSeparator);
    return new LanguageSupport(spreadsheetLanguage);
}

export { changeDecimalSeparator, changeIdiom, spreadsheet, spreadsheetLanguage };

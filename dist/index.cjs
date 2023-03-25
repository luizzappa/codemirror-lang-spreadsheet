'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lr = require('@lezer/lr');
var language = require('@codemirror/language');
var highlight = require('@lezer/highlight');

// This file was generated by lezer-generator. You probably shouldn't edit it.
const intersecop = 36,
  BoolToken = 1,
  RefErrorToken = 2,
  ErrorToken = 3;

/* Hand-written tokenizers for excel formula tokens that can't be
  expressed by lezer's built-in tokenizer (or are harder to express). */
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
const backSlash = 92, closeParen = 41, dot = 46, euroSign = 8364, openParen = 40, questionMark = 63, underscore = 95, isAsciiLeter = (charCode) => {
    return ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122));
}, isDigit = (charCode) => charCode >= 48 && charCode <= 57, isSpace = (charCode) => {
    return ([
        9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196,
        8197, 8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288
    ].indexOf(charCode) !== -1);
};
const isIntersecop = new lr.ExternalTokenizer((input, stack) => {
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
        before === backSlash ||
        before === underscore)
        return input.acceptToken(intersecop);
}, { contextual: true });
const isBoolean = (value, stack) => {
    return i18n.BoolToken[currIdiom].indexOf(value.toUpperCase()) !== -1
        ? BoolToken
        : -1;
};
const isRefErrorToken = (value, stack) => {
    if (i18n.RefErrorToken[currIdiom].indexOf(value.toUpperCase()) !== -1) {
        return RefErrorToken;
    }
    else if (i18n.ErrorToken[currIdiom].indexOf(value.toUpperCase()) !== -1) {
        return ErrorToken;
    }
    return -1;
};
const setLezerIdiom = (newIdiom) => (currIdiom = newIdiom);

// This file was generated by lezer-generator. You probably shouldn't edit it.
const parser = lr.LRParser.deserialize({
  version: 14,
  states: "+^O!^QQOOOOQP'#Cb'#CbO!hQRO'#CbO$XQRO'#DVO%fQQO'#CgO&qQRO'#DWOOQO'#D['#D[O'RQSO'#D[OOQP'#Ca'#CaO'ZQQO'#CaOOQO'#Cp'#CpO(gQQO'#DTO(nQQO'#CsO%fQQO'#CsOOQO'#Cs'#CsO)gQQO'#CwOOQO'#DV'#DVOOQO'#DT'#DTQOQQOOO%fQQO'#DTO)nQQO,59RO)nQQO,59RO*]QRO,59rO*gQQO,59RO*lQQO,59qO({QQO'#CwOOQP,59R,59ROOQO,59v,59vOOQP,58{,58{O%fQQO,59{O%fQQO,59{O%fQQO,59{O%fQQO,59{O%fQQO,59{OOQO,59_,59_O*sQQO'#CvO*}QQO'#CuO+VQQO,59_O+[QQO,59_OOQO'#Dl'#DlOOQO'#Cz'#CzO+lQQO'#CzO+qQQO'#CyO+|QQO'#CxO,UQQO,59cO%fQQO,5:ZO,ZQQO,59oOOQP1G.m1G.mO)nQQO'#CgO,bQRO1G.mO)nQQO'#C{O-rQQO,59TOOQP1G/^1G/^OOQO1G/]1G/]O/OQQO1G/gO/VQQO1G/gO0_QQO1G/gO0iQQO1G/gO1[QQO1G/gO(nQQO'#C|O2OQQO,59aOOQO1G.y1G.yOOQO,59f,59fO({QQO'#C}O2WQQO,59eO({QQO'#DOO2cQQO,59dOOQO1G.}1G.}O2kQQO1G/uO2rQRO'#CgO2zQRO,59gOOQO-E6y-E6yOOQO,59h,59hOOQO-E6z-E6zOOQO,59i,59iOOQO-E6{-E6{OOQO,59j,59jOOQO-E6|-E6|OOQO7+%a7+%a",
  stateData: "3o~OvOS~OPYOQQORYOVPOWPOXPOYPO[SO_UO`VObUOeYOfYOh[O!P]O!Q]O!R]O~OxcO!__O~PVOQ!OXV!OXW!OXX!OXY!OXsUXtUXxUX{UX}UX!PUX!QUX!SUX!UUX!VUX!WUX!XUX!YUX!ZUX![UX!]UX!^UX^UX|UX!bUX~OteO{dOsyXxyX!PyX!QyX!SyX!UyX!VyX!WyX!XyX!YyX!ZyX![yX!]yX!^yX^yX|yX!byX~O!_iO~PVO}jOtzXxzX{zX!PzX!QzX!SzX!UzX!VzX!WzX!XzX!YzX!ZzX![zX!]zX!^zX~OszX^zX|zX!bzX~P%mOakOckO~OQPOVPOWPOXPOYPO~OxqO!PoO!QoO!SrO!UmO!VnO!WnO!XpO!YqO!ZqO![qO!]qO!^qO~OswX~P'lO!_iO^jP|jP~PVOPYOQxORYOeYOfYO!PwO!QwO!RwO~Ox}O~P({OQQOVPOWPOXPOYPO[!QO_UO`VObUO~O^!UO|!SO~P%mO^!PO~O^!VO~P'lO^jX|jX~P'lO|!]O^iX~O^!_O~Osga^ga|ga!bga~P'lOe!`O~O|!aO!amX!bmX~O!a!cO!blX~O!b!eO~Oswa~P'lO{dOsZitZixZi}Zi!PZi!QZi!SZi!UZi!VZi!WZi!XZi!YZi!ZZi![Zi!]Zi!^Zi^Zi|Zi!bZi~O|!SO^]a~O!SrOs!Tix!Ti!P!Ti!Q!Ti!V!Ti!W!Ti!X!Ti!Y!Ti!Z!Ti![!Ti!]!Ti!^!Ti^!Ti|!Ti!b!Ti~O!U!Ti~P-zO!UmO~P-zO!SrO!UmO!VnO!WnOs!Tix!Ti!X!Ti!Y!Ti!Z!Ti![!Ti!]!Ti!^!Ti^!Ti|!Ti!b!Ti~O!P!Ti!Q!Ti~P/^O!PoO!QoO~P/^O!PoO!QoO!SrO!UmO!VnO!WnO!XpO~Os!Tix!Ti!Y!Ti!Z!Ti![!Ti!]!Ti!^!Ti^!Ti|!Ti!b!Ti~P0sO|!]O^ia~O|!aO!ama!bma~O!a!cO!bla~O!b!pO~P'lOteO{dO~O}jO^oatzX{zX|oa~OYcabf_ehXVW!d}!R!PvX~",
  goto: "'|!dPPPPP!e!{PPPP#bP#tPPPPPP#xPP$^P$l$o$^$u$y%Q%Y%`%f%lPPPP%rP%u&iPPP'RPPPP'ePPPPPPPPPP'sPP'yjTO[]cdemnopq}!]SfS!QR!h!SpWOS[]cdemnopq}!Q!S!]RlXqWOS[]cdemnopq}!Q!S!]TgS!Qh`OS[]cmnopq}!]Xx_i!a!ci`OS[]cmnopq}!]Ru[Qt[R!j!]T|_iS{_iR!n!cUz_i!cR!l!aQ!TfR!i!TQ!^tR!k!^Q!bzR!m!bQ!d{R!o!dRbOQZOQhSSs[!]Qv]Q!OcQ!WmQ!XnQ!YoQ!ZpQ![qR!f}hROS[]cmnopq}!]Q!PdQ!ReT!g!Q!SqXOS[]cdemnopq}!Q!S!]i^OS[]cmnopq}!]Xy_i!a!cRaO",
  nodeNames: "⚠ BoolToken RefErrorToken ErrorToken Program Reference ReferenceItem CellToken NameToken VerticalRangeToken HorizontalRangeToken ReferenceFunctionCall OpenParen Union CloseParen SheetToken QuoteS SheetQuotedToken MultipleSheetsToken MultipleSheetsQuotedToken Constant NumberToken TextToken FunctionCall Function Arguments Argument ConstantArray ArrayColumns ArrayRows ArrayConstant",
  maxTerm: 66,
  nodeProps: [
    ["closedBy", -2,12,24,"CloseParen"],
    ["openedBy", 14,"OpenParen | Function"]
  ],
  skippedNodes: [0],
  repeatNodeCount: 4,
  tokenData: "#-W~RyOX#rXY/XYZ/XZ]#r]^/X^p#rpq1Xqr#rrs2fstHetuK_uv!6[vw!7Swx!7zxy!8Syz!8zz{!9r{|!9w|}!;h}!O!<`!O!P!=W!P!Q!@f!Q![!@k![!]!B[!]!^!Ba!^!_!CX!_!`!Eu!`!a!Fm!b!c!Hc!c!}!JS#O#P# ^#Q#R#*p#R#S!MT#S#T#r#T#o!JS#o#p#+h#p#q#r#q#r#,`#r;'S#r;'S;=`/R<%lO#r~#uhOp#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![#r![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#rQ%dZOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aQ&YQqr&`wx%aQ&eOaQQ&hYOw'Wwx(_xz'W{!P'W!Q!['W!]!a'W!b!}'W#Q;'S'W;'S;=`(X<%lO'WQ'ZYOw'Wwx'yxz'W{!P'W!Q!['W!]!a'W!b!}'W#Q;'S'W;'S;=`(X<%lO'WQ'|Qqr(Swx'WQ(XOcQQ([P;=`<%l'WQ(bPwx'WQ(hP;=`<%l%a~(ph_~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![#r![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~*_fOp+spq'Wqs+sst'Wtu+suw'Wwx(_xz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!}+s#Q#R'W#R#o+s#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~+vgOp+spq'Wqr-_rs+sst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!}+s#Q#R'W#R#o+s#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~-dgb~Op+spq'Wqr-_rs+sst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!}+s#Q#R'W#R#o+s#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~/OP;=`<%l+s~/UP;=`<%l#r~/^mv~OX#rXY/XYZ/XZ]#r]^/X^p#rpq1Xqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![#r![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~1^bv~OX%aXY1XYZ1XZ]%a]^1X^p%apq1Xqw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%a~2ilOp2fpq4aqr=[rs?Xst4atu2fuw4awx6gxz4az{7S{|2f|!O4a!O!P2f!P!Q7S!Q![2f![!]@x!]!a4a!a!b7S!b!}2f!}#Q7S#Q#R4a#R#o2f#o#p4a#p#q2f#q#r4a#r;'S2f;'S;=`H_<%lO2f~4daOr4ars5isw4awx6gxz4az{7S{!P4a!P!Q7S!Q![4a![!]8Y!]!a4a!a!b7S!b!}4a!}#Q7S#Q;'S4a;'S;=`=U<%lO4a~5n]f~Or%ars4asw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%a~6jWOq7Sqr7trs7fsw7Swx4ax;'S7S;'S;=`7n<%lO7S~7VTOr7Srs7fs;'S7S;'S;=`7n<%lO7S~7kPf~rs7S~7qP;=`<%l7S~7yTaQOr7Srs7fs;'S7S;'S;=`7n<%lO7S~8]aOr9brs:jsw9bwx<lxz9bz{7S{!P9b!P!Q7S!Q![9b![!]7S!]!a9b!a!b7S!b!}9b!}#Q7S#Q;'S9b;'S;=`<f<%lO9b~9eaOr9brs:jsw9bwx;exz9bz{7S{!P9b!P!Q7S!Q![9b![!]7S!]!a9b!a!b7S!b!}9b!}#Q7S#Q;'S9b;'S;=`<f<%lO9b~:o[f~Or'Wrs9bsw'Wwx'yxz'W{!P'W!Q!['W!]!a'W!b!}'W#Q;'S'W;'S;=`(X<%lO'W~;hWOq7Sqr<Qrs7fsw7Swx9bx;'S7S;'S;=`7n<%lO7S~<VTcQOr7Srs7fs;'S7S;'S;=`7n<%lO7S~<iP;=`<%l9b~<oVOr7Srs7fsw7Swx9bx;'S7S;'S;=`7n<%lO7S~=XP;=`<%l4a~=al_~Op2fpq4aqr=[rs?Xst4atu2fuw4awx6gxz4az{7S{|2f|!O4a!O!P2f!P!Q7S!Q![2f![!]@x!]!a4a!a!b7S!b!}2f!}#Q7S#Q#R4a#R#o2f#o#p4a#p#q2f#q#r4a#r;'S2f;'S;=`H_<%lO2f~?^hf~Op#rpq%aqr(krs2fst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![#r![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~@{lOpBspq9bqrBsrsFkst9btuBsuw9bwx<lxz9bz{7S{|Bs|!O9b!O!PBs!P!Q7S!Q![Bs![!]7S!]!a9b!a!b7S!b!}Bs!}#Q7S#Q#R9b#R#oBs#o#p9b#p#qBs#q#r9b#r;'SBs;'S;=`HX<%lOBs~BvlOpBspq9bqrDnrsFkst9btuBsuw9bwx;exz9bz{7S{|Bs|!O9b!O!PBs!P!Q7S!Q![Bs![!]7S!]!a9b!a!b7S!b!}Bs!}#Q7S#Q#R9b#R#oBs#o#p9b#p#qBs#q#r9b#r;'SBs;'S;=`HX<%lOBs~Dslb~OpBspq9bqrDnrsFkst9btuBsuw9bwx;exz9bz{7S{|Bs|!O9b!O!PBs!P!Q7S!Q![Bs![!]7S!]!a9b!a!b7S!b!}Bs!}#Q7S#Q#R9b#R#oBs#o#p9b#p#qBs#q#r9b#r;'SBs;'S;=`HX<%lOBs~Fpgf~Op+spq'Wqr-_rsBsst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!}+s#Q#R'W#R#o+s#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~H[P;=`<%lBs~HbP;=`<%l2f~Hj[}~Ow%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!c%a!c!}I`#Q;'S%a;'S;=`(e<%lO%a~Ied!d~Oq%aqrI`rw%awx&Vxz%a{!P%a!P!QJs!Q![I`![!]&e!]!a%a!a!bJs!b!c%a!c!}I`#Q#R%a#R#SI`#S%r%a%r%sI`%s;'S%a;'S;=`(e<%lO%a~JxV!d~qrJs!P!QJs!Q![Js!a!bJs!c!}Js#R#SJs%r%sJs~KbjOp#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![MS![!]*[!]!a%a!b!c#r!c!}!%b#Q#R%a#R#T#r#T#o!%b#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~MVhOp#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![MS![!]Nq!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~NtfOp+spq'Wqs+sst'Wtu!!Yuw'Wwx(_xz'W{|+s|!O'W!O!P+s!Q![!#t!]!a'W!b!}+s#Q#R'W#R#o+s#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~!!]gOp+spq'Wqr-_rs+sst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![!#t!]!a'W!b!}+s#Q#R'W#R#o+s#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~!#ygY~Op+spq'Wqr-_rs+sst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![!#t!]!a'W!b!}+s#Q#R'W#R#o+s#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~!%ejOp#rpq%aqr(krs#rst%atu!'Vuw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![!(t![!]!*e!]!a%a!b!c#r!c!}!2x#Q#R%a#R#T#r#T#o!2x#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~!'YhOp#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![!(t![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~!(yhV~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![!(t![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~!*hhOp+spq'Wqs+sst'Wtu!,Suw'Wwx(_xz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!c+s!c!}!-t#Q#R'W#R#T+s#T#o!-t#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~!,ViOp+spq'Wqr-_rs+sst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!c+s!c!}!-t#Q#R'W#R#T+s#T#o!-t#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~!-yiX~Op+spq'Wqr-_rs+sst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!c+s!c!}!/h#Q#R'W#R#T+s#T#o!/h#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~!/miX~Op+spq'Wqr-_rs+sst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!c+s!c!}!1[#Q#R'W#R#T+s#T#o!1[#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~!1agX~Op+spq'Wqr-_rs+sst'Wtu+suw'Wwx'yxz'W{|+s|!O'W!O!P+s!Q![+s!]!a'W!b!}+s#Q#R'W#R#o+s#o#p'W#p#q+s#q#r'W#r;'S+s;'S;=`.{<%lO+s~!2{jOp#rpq%aqr(krs#rst%atu!'Vuw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![!(t![!]!*e!]!a%a!b!c#r!c!}!4m#Q#R%a#R#T#r#T#o!4m#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~!4phOp#rpq%aqr(krs#rst%atu!'Vuw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![!(t![!]!*e!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#rR!6aZ!SPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!7XZ!XPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!8PP`Pwx%aR!8XZ[POw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!9PZ^POw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%a~!9wO!V~~!9|h!P~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![#r![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#rR!;mZ|POw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!<eZ!QPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%a~!=ZhOp#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![!>u![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~!>zhe~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![!>u![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~!@kO!W~~!@phe~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P!>u!Q![!@k![!]Nq!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~!BaO{~R!BfZ!aPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!C^]!ZPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!_%a!_!`!DV!`!a!D}!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!D[Z!^POw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!ESZ![POw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!EzZxPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!Fr]!YPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!_%a!_!`!Gk!`!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR!GpZ!]POw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%a~!Hhh!R~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P#r!Q![#r![!]*[!]!a%a!b!}#r#Q#R%a#R#o#r#o#p%a#p#q#r#q#r%a#r;'S#r;'S;=`/R<%lO#r~!JXpW~Op#rpq%aqr(krs#rst%atu!'Vuw%awx&Vxy!L]yz%a{|#r|!O%a!O!P!MT!Q![#$R![!]!*e!]!a%a!a!b# ^!b!c#r!c!}#&^#O#P# ^#Q#R%a#R#S!MT#S#T#r#T#o#&^#o#p%a#p#q#r#q#r%a#r$Lv#r$Lv$Lw# {$Lw;'S#r;'S;=`/R<%lO#r~!LbZh~Ow%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%a~!MYpW~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxy!L]yz%a{|#r|!O%a!O!P!MT!Q![!MT![!]*[!]!a%a!a!b# ^!b!c#r!c!}!MT#O#P# ^#Q#R%a#R#S!MT#S#T#r#T#o!MT#o#p%a#p#q#r#q#r%a#r$Lv#r$Lv$Lw# {$Lw;'S#r;'S;=`/R<%lO#r~# cWW~!O!P# ^!Q![# ^!a!b# ^!c!}# ^#O#P# ^#R#S# ^#T#o# ^$Lv$Lw# ^~#!QoW~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxz%a{|#r|!O%a!O!P# {!Q![# {![!]*[!]!a%a!a!b# ^!b!c#r!c!}# {#O#P# ^#Q#R%a#R#S# {#S#T#r#T#o# {#o#p%a#p#q#r#q#r%a#r$Lv#r$Lv$Lw# {$Lw;'S#r;'S;=`/R<%lO#r~#$YpV~W~Op#rpq%aqr(krs#rst%atu#ruw%awx&Vxy!L]yz%a{|#r|!O%a!O!P!MT!Q![#$R![!]*[!]!a%a!a!b# ^!b!c#r!c!}!MT#O#P# ^#Q#R%a#R#S!MT#S#T#r#T#o!MT#o#p%a#p#q#r#q#r%a#r$Lv#r$Lv$Lw# {$Lw;'S#r;'S;=`/R<%lO#r~#&cpW~Op#rpq%aqr(krs#rst%atu!'Vuw%awx&Vxy!L]yz%a{|#r|!O%a!O!P!MT!Q![#$R![!]!*e!]!a%a!a!b# ^!b!c#r!c!}#(g#O#P# ^#Q#R%a#R#S!MT#S#T#r#T#o#(g#o#p%a#p#q#r#q#r%a#r$Lv#r$Lv$Lw# {$Lw;'S#r;'S;=`/R<%lO#r~#(lpW~Op#rpq%aqr(krs#rst%atu!'Vuw%awx&Vxy!L]yz%a{|#r|!O%a!O!P!MT!Q![#$R![!]!*e!]!a%a!a!b# ^!b!c#r!c!}!MT#O#P# ^#Q#R%a#R#S!MT#S#T#r#T#o!MT#o#p%a#p#q#r#q#r%a#r$Lv#r$Lv$Lw# {$Lw;'S#r;'S;=`/R<%lO#rR#*uZ!UPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR#+mZ!_POw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%aR#,eZ!bPOw%awx&Vxz%a{!P%a!Q![%a![!]&e!]!a%a!b!}%a#Q;'S%a;'S;=`(e<%lO%a",
  tokenizers: [isIntersecop, 0, 1],
  topRules: {"Program":[0,4]},
  specialized: [{term: 8, get: (value, stack) => (isBoolean(value) << 1), external: isBoolean},{term: 66, get: (value, stack) => (isRefErrorToken(value) << 1), external: isRefErrorToken}],
  tokenPrec: 841
});

const spreadsheetLanguage = language.LRLanguage.define({
    parser: parser.configure({
        props: [
            language.indentNodeProp.add({
                Application: language.delimitedIndent({ closing: ')', align: false })
            }),
            language.foldNodeProp.add({
                Application: language.foldInside
            }),
            highlight.styleTags({
                // References
                'Reference/...': highlight.tags.color,
                RefErrorToken: highlight.tags.invalid,
                // Constants
                BoolToken: highlight.tags.bool,
                ErrorToken: highlight.tags.invalid,
                NumberToken: highlight.tags.number,
                TextToken: highlight.tags.string,
                // Functions
                Function: highlight.tags.function(highlight.tags.name),
                // Symbols
                OpenParen: highlight.tags.name,
                CloseParen: highlight.tags.name,
                '[ ]': highlight.tags.squareBracket,
                '{ }': highlight.tags.brace
            })
        ]
    })
});
function spreadsheet() {
    return new language.LanguageSupport(spreadsheetLanguage);
}

exports.setLezerIdiom = setLezerIdiom;
exports.spreadsheet = spreadsheet;
exports.spreadsheetLanguage = spreadsheetLanguage;

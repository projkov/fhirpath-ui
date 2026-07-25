import type { Monaco } from '@monaco-editor/react';

export const FHIRPATH_LANGUAGE_ID = 'fhirpath';
export const FHIRPATH_THEME_ID = 'fhirpath-light';

const keywords = ['and', 'or', 'xor', 'implies', 'div', 'mod', 'as', 'is', 'in', 'contains', 'true', 'false'];

const functions = [
    'where', 'select', 'exists', 'empty', 'not', 'first', 'last', 'tail', 'skip', 'take',
    'union', 'combine', 'intersect', 'exclude', 'distinct', 'isDistinct', 'subsetOf', 'supersetOf',
    'count', 'single', 'iif', 'trace', 'toInteger', 'toDecimal', 'toString', 'toBoolean', 'toDateTime',
    'toTime', 'toQuantity', 'convertsToInteger', 'convertsToDecimal', 'convertsToString', 'convertsToBoolean',
    'convertsToDateTime', 'convertsToTime', 'convertsToQuantity', 'ofType', 'extension', 'hasValue',
    'children', 'descendants', 'memberOf', 'repeat', 'aggregate', 'now', 'today', 'sum', 'abs',
    'ceiling', 'floor', 'round', 'sqrt', 'truncate', 'exp', 'ln', 'log', 'power', 'substring', 'startsWith',
    'endsWith', 'matches', 'replaceMatches', 'replace', 'length', 'upper', 'lower', 'indexOf', 'split', 'join',
    'trim', 'allTrue', 'anyTrue', 'allFalse', 'anyFalse',
];

export const fhirpathMonarchLanguage = {
    defaultToken: '',
    tokenPostfix: '.fhirpath',
    keywords,
    functions,
    operators: ['=', '!=', '~', '!~', '>', '<', '>=', '<=', '+', '-', '*', '/', '%', '|', '&'],
    symbols: /[=><!~?:&|+\-*/%^]+/,
    tokenizer: {
        root: [
            [/\$(this|index|total)\b/, 'variable.predefined'],
            [/%[a-zA-Z][\w-]*/, 'variable.predefined'],
            [/`[^`]*`/, 'identifier'],
            [/[a-zA-Z_][\w]*(?=\s*\()/, {
                cases: {
                    '@functions': 'identifier.function',
                    '@default': 'identifier.function',
                },
            }],
            [/[a-zA-Z_][\w]*/, {
                cases: {
                    '@keywords': 'keyword',
                    '@default': 'identifier',
                },
            }],
            [/'([^'\\]|\\.)*'/, 'string'],
            [/\d+(\.\d+)?/, 'number'],
            [/[{}()[\]]/, '@brackets'],
            [/@symbols/, {
                cases: {
                    '@operators': 'operator',
                    '@default': '',
                },
            }],
            [/\/\/.*$/, 'comment'],
            [/\/\*/, 'comment', '@comment'],
            [/[ \t\r\n]+/, 'white'],
        ],
        comment: [
            [/[^/*]+/, 'comment'],
            [/\*\//, 'comment', '@pop'],
            [/[/*]/, 'comment'],
        ],
    },
};

export function registerFhirPathLanguage(monaco: Monaco) {
    if (monaco.languages.getLanguages().some((lang: { id: string }) => lang.id === FHIRPATH_LANGUAGE_ID)) {
        return;
    }

    monaco.languages.register({ id: FHIRPATH_LANGUAGE_ID });
    monaco.languages.setMonarchTokensProvider(FHIRPATH_LANGUAGE_ID, fhirpathMonarchLanguage as any);
    monaco.languages.setLanguageConfiguration(FHIRPATH_LANGUAGE_ID, {
        brackets: [['(', ')'], ['[', ']'], ['{', '}']],
        autoClosingPairs: [
            { open: '(', close: ')' },
            { open: '[', close: ']' },
            { open: '{', close: '}' },
            { open: "'", close: "'" },
        ],
    });
    monaco.editor.defineTheme(FHIRPATH_THEME_ID, {
        base: 'vs',
        inherit: true,
        rules: [
            { token: 'keyword.fhirpath', foreground: '0000FF' },
            { token: 'identifier.function.fhirpath', foreground: '795E26' },
            { token: 'variable.predefined.fhirpath', foreground: '001080' },
            { token: 'string.fhirpath', foreground: 'A31515' },
            { token: 'number.fhirpath', foreground: '098658' },
            { token: 'comment.fhirpath', foreground: '008000', fontStyle: 'italic' },
        ],
        colors: {},
    });
}

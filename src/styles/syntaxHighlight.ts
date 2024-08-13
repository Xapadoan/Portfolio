import { CSSProperties } from 'react';

// export const style: { [key: string]: CSSProperties } = {
//   'pre[class*=language-': {
//     color: '#fff',
//     backgroundColor: '#000',
//   },
// };

export const style: { [key: string]: CSSProperties } = {
  'pre[class*="language-"]': {
    // color: '#d4d4d4',
    color: 'var(--code-regular)',
    textShadow: 'none',
    fontFamily:
      'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    padding: '1em',
    overflow: 'auto',
    background: 'var(--background-highlight)',
    borderRadius: '12px',
    // background: '#1e1e1e',
  },
  'code[class*="language-"]': {
    // color: '#d4d4d4',
    color: 'var(--code-regular)',
    // fontSize: '13px',
    // textShadow: 'none',
    // fontFamily:
    //   'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]::selection': {
    textShadow: 'none',
    background: '#264F78',
  },
  'code[class*="language-"]::selection': {
    textShadow: 'none',
    background: '#264F78',
  },
  'pre[class*="language-"] *::selection': {
    textShadow: 'none',
    background: '#264F78',
  },
  'code[class*="language-"] *::selection': {
    textShadow: 'none',
    background: '#264F78',
  },
  ':not(pre) > code[class*="language-"]': {
    padding: '.1em .3em',
    borderRadius: '.3em',
    color: '#db4c69',
    background: 'var(--background-highlight)',
  },
  '.namespace': {
    opacity: '.7',
  },
  'doctype.doctype-tag': {
    color: '#569CD6',
  },
  'doctype.name': {
    color: '#9cdcfe',
  },
  comment: {
    color: '#6a9955',
  },
  prolog: {
    color: '#6a9955',
  },
  punctuation: {
    // color: '#d4d4d4',
    color: 'var(--code-regular)',
  },
  '.language-html .language-css .token.punctuation': {
    // color: '#d4d4d4',
    color: 'var(--code-regular)',
  },
  '.language-html .language-javascript .token.punctuation': {
    // color: '#d4d4d4',
    color: 'var(--code-regular)',
  },
  property: {
    color: '#9cdcfe',
  },
  tag: {
    // color: '#569cd6',
    color: 'var(--code-symbol-declaration)',
  },
  boolean: {
    // color: '#569cd6',
    color: 'var(--code-symbol-declaration)',
  },
  number: {
    // color: '#b5cea8',
    color: 'var(--code-value)',
  },
  constant: {
    color: '#9cdcfe',
  },
  symbol: {
    color: '#b5cea8',
  },
  inserted: {
    color: '#b5cea8',
  },
  unit: {
    color: '#b5cea8',
  },
  selector: {
    color: '#d7ba7d',
  },
  'attr-name': {
    color: '#9cdcfe',
  },
  string: {
    // color: '#ce9178',
    color: 'var(--code-value)',
  },
  char: {
    color: '#ce9178',
  },
  builtin: {
    // color: '#ce9178',
    color: 'var(--code-type-name)',
  },
  deleted: {
    color: '#ce9178',
  },
  '.language-css .token.string.url': {
    textDecoration: 'underline',
  },
  operator: {
    // color: '#d4d4d4',
    color: 'var(--code-regular)',
  },
  entity: {
    // color: '#569cd6',
    color: 'var(--code-symbol-declaration)',
  },
  'operator.arrow': {
    // color: '#569CD6',
    color: 'var(--code-symbol-declaration)',
  },
  atrule: {
    color: '#ce9178',
    // color: 'red',
  },
  'atrule.rule': {
    color: '#c586c0',
  },
  'atrule.url': {
    color: '#9cdcfe',
  },
  'atrule.url.function': {
    // color: '#dcdcaa',
    color: 'var(--code-function)',
  },
  'atrule.url.punctuation': {
    // color: '#d4d4d4',
    color: 'var(--code-regular)',
  },
  keyword: {
    // color: '#569CD6',
    color: 'var(--code-symbol-declaration)',
  },
  'keyword.module': {
    // color: '#c586c0',
    color: 'var(--code-control-flow)',
  },
  'keyword.control-flow': {
    // color: '#c586c0',
    color: 'var(--code-control-flow)',
  },
  function: {
    // color: '#dcdcaa',
    color: 'var(--code-function)',
  },
  'function.maybe-class-name': {
    // color: '#dcdcaa',
    color: 'var(--code-function)',
  },
  regex: {
    color: '#d16969',
  },
  important: {
    // color: '#569cd6',
    color: 'var(--code-symbol-declaration)',
  },
  italic: {
    fontStyle: 'italic',
  },
  'class-name': {
    // color: '#4ec9b0',
    color: 'var(--code-type-name)',
  },
  'maybe-class-name': {
    // color: '#4ec9b0',
    color: 'var(--code-type-name)',
  },
  console: {
    color: '#9cdcfe',
  },
  parameter: {
    color: '#9cdcfe',
  },
  interpolation: {
    color: '#9cdcfe',
  },
  'punctuation.interpolation-punctuation': {
    // color: '#569cd6',
    color: 'var(--code-symbol-declaration)',
  },
  variable: {
    color: '#9cdcfe',
  },
  'imports.maybe-class-name': {
    color: '#9cdcfe',
  },
  'exports.maybe-class-name': {
    color: '#9cdcfe',
  },
  escape: {
    color: '#d7ba7d',
  },
  'tag.punctuation': {
    color: '#808080',
  },
  cdata: {
    color: '#808080',
  },
  'attr-value': {
    color: '#ce9178',
  },
  'attr-value.punctuation': {
    color: '#ce9178',
  },
  'attr-value.punctuation.attr-equals': {
    // color: '#d4d4d4',
    color: 'var(--code-regular)',
  },
  namespace: {
    // color: '#4ec9b0',
    color: 'var(--code-type-name)',
  },
  'pre[class*="language-javascript"]': {
    color: '#9cdcfe',
  },
  'code[class*="language-javascript"]': {
    color: '#9cdcfe',
  },
  'pre[class*="language-jsx"]': {
    color: '#9cdcfe',
  },
  'code[class*="language-jsx"]': {
    color: '#9cdcfe',
  },
  'pre[class*="language-typescript"]': {
    // color: '#9cdcfe',
    color: 'var(--code-regular)',
  },
  'code[class*="language-typescript"]': {
    // color: '#9cdcfe',
    color: 'var(--code-regular)',
  },
  'pre[class*="language-tsx"]': {
    color: '#9cdcfe',
  },
  'code[class*="language-tsx"]': {
    color: '#9cdcfe',
  },
  'pre[class*="language-css"]': {
    color: '#ce9178',
  },
  'code[class*="language-css"]': {
    color: '#ce9178',
  },
  'pre[class*="language-html"]': {
    // color: '#d4d4d4',
    color: 'var(--code-regular)',
  },
  'code[class*="language-html"]': {
    // color: '#d4d4d4',
    color: 'var(--code-regular)',
  },
  '.language-regex .token.anchor': {
    // color: '#dcdcaa',
    color: 'var(--code-function)',
  },
  '.language-html .token.punctuation': {
    color: '#808080',
  },
  'pre[class*="language-"] > code[class*="language-"]': {
    position: 'relative',
    zIndex: '1',
  },
  '.line-highlight.line-highlight': {
    background: '#f7ebc6',
    boxShadow: 'inset 5px 0 0 #f7d87c',
    zIndex: '0',
  },
};

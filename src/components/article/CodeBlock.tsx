import { Prism } from 'react-syntax-highlighter';
import { style } from '@styles/syntaxHighlight';

// loadLanguages(['ts']);

export function CodeBlock({ children }: Readonly<{ children: string }>) {
  return (
    <Prism language="typescript" style={style}>
      {children}
    </Prism>
  );
}

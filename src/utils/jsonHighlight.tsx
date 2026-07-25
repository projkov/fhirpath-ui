import React from 'react';

const TOKEN_REGEX = /("(?:\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g;

function classify(token: string): string {
    if (token.startsWith('"')) {
        return /:\s*$/.test(token) ? 'json-key' : 'json-string';
    }
    if (token === 'true' || token === 'false') {
        return 'json-boolean';
    }
    if (token === 'null') {
        return 'json-null';
    }
    return 'json-number';
}

export function HighlightedJson({ value }: { value: string }) {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    TOKEN_REGEX.lastIndex = 0;

    while ((match = TOKEN_REGEX.exec(value)) !== null) {
        if (match.index > lastIndex) {
            parts.push(value.slice(lastIndex, match.index));
        }
        const token = match[0];
        parts.push(<span key={match.index} className={classify(token)}>{token}</span>);
        lastIndex = TOKEN_REGEX.lastIndex;
    }
    if (lastIndex < value.length) {
        parts.push(value.slice(lastIndex));
    }

    return <>{parts}</>;
}

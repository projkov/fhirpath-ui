import type { CSSProperties } from 'react';

const headerStyle: CSSProperties = {
    backgroundColor: '#f4f8fb',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '56px',
    lineHeight: '56px',
    borderBottom: '1px solid #e0e0e0',
    padding: '0 16px',
};

const headerBrand: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
};

const headerTitle: CSSProperties = {
    fontSize: '15px',
};

const headerVersion: CSSProperties = {
    fontSize: '12px',
};

const contentStyle: CSSProperties = {
    textAlign: 'left',
    height: '100%',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    margin: '0.5rem',
    borderRadius: '0.75rem',
    backgroundColor: '#FFF',
    overflowY: 'auto',
};

const siderStyle: CSSProperties = {
    backgroundColor: '#f4f8fb',
    height: '100%',
    overflowY: 'auto',
};

const appSplitter: CSSProperties = {
    flex: 1,
    minHeight: 0,
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#f4f8fb',
};

const footerStyle: CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#f4f8fb',
    borderTop: '1px solid #e0e0e0',
};

const layoutStyle: CSSProperties = {
    overflow: 'hidden',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f4f6f9',
};

const editorWrapper: CSSProperties = {
    height: '100%',
    minHeight: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
};

const compactBar: CSSProperties = {
    flexShrink: 0,
};

const expressionBarShell: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
    height: '32px',
    border: '1px solid #d9d9d9',
    borderRadius: '6px',
    overflow: 'hidden',
    backgroundColor: '#fff',
};

const expressionBarLabel: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '0 11px',
    backgroundColor: '#fafafa',
    borderRight: '1px solid #d9d9d9',
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.45)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
};

const expressionBarEditor: CSSProperties = {
    flex: 1,
    minWidth: 0,
    height: '100%',
    boxSizing: 'border-box',
    padding: '0 11px',
};

const expressionBarExecute: CSSProperties = {
    height: '100%',
    borderRadius: 0,
    border: 'none',
    flexShrink: 0,
};

const headersPopoverContent: CSSProperties = {
    width: '470px',
    maxHeight: '320px',
    overflowY: 'auto',
};

const statusTag: CSSProperties = {
    margin: 0,
    fontWeight: 600,
    flexShrink: 0,
};

const resultTabs: CSSProperties = {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
};

const tabPaneWrapper: CSSProperties = {
    height: '100%',
    overflow: 'auto',
};

const resultToolbar: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
};

const resultItem: CSSProperties = {
    backgroundColor: '#f6f8fa',
    border: '1px solid #e1e4e8',
    borderRadius: '0.5rem',
    padding: '8px 10px',
};

const resultItemHeader: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
};

const resultItemCode: CSSProperties = {
    margin: 0,
    fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
    fontSize: '13px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
};

const historyContainer: CSSProperties = {
    margin: '0.5rem',
    padding: '0.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
};

const historyItem: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    width: '100%',
    padding: '6px 8px',
    borderRadius: '0.5rem',
    cursor: 'pointer',
};

const historyItemSelected: CSSProperties = {
    backgroundColor: '#e6f4ff',
};

const historyItemHeader: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const historyItemExpression: CSSProperties = {
    display: 'block',
    maxWidth: '100%',
    fontSize: '13px',
    fontWeight: 500,
};

const historyItemUrl: CSSProperties = {
    display: 'block',
    maxWidth: '100%',
    fontSize: '12px',
};

const editor: CSSProperties = {
    backgroundColor: '#f4f8fb',
    padding: '1rem 0.75rem',
    display: 'flex',
    height: 'calc(100vh - 64px - 48px)',
    overflow: 'hidden',
};

const expressionAndResultContainer: CSSProperties = {
    height: '100%',
    overflowY: 'auto',
};

const logo: CSSProperties = {
    width: '30px',
    height: '30px',
    borderRadius: '0.5rem',
    objectFit: 'cover',
};

export const styles = {
    header: headerStyle,
    headerBrand,
    headerTitle,
    headerVersion,
    content: contentStyle,
    sider: siderStyle,
    appSplitter,
    footer: footerStyle,
    layout: layoutStyle,
    editorWrapper,
    compactBar,
    expressionBarShell,
    expressionBarLabel,
    expressionBarEditor,
    expressionBarExecute,
    headersPopoverContent,
    statusTag,
    historyContainer,
    historyItem,
    historyItemSelected,
    historyItemHeader,
    historyItemExpression,
    historyItemUrl,
    editor,
    expressionAndResultContainer,
    logo,
    resultTabs,
    tabPaneWrapper,
    resultToolbar,
    resultItem,
    resultItemHeader,
    resultItemCode,
};

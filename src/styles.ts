import type { CSSProperties } from 'react';

const headerStyle: CSSProperties = {
    backgroundColor: '#f4f8fb',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '8px',
    borderBottom: '1px solid #e0e0e0',
    paddingLeft: 8,
};

const contentStyle: CSSProperties = {
    textAlign: 'left',
    flex: 1,
    padding: '1rem',
    margin: '0.5rem',
    borderRadius: '0.75rem',
    backgroundColor: '#FFF',
    overflowY: 'auto',
};

const siderStyle: CSSProperties = {
    backgroundColor: '#f4f8fb',
    overflowY: 'auto',
    width: 300,
    boxShadow: 'inset -1px 0 0 #e0e0e0',
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
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
};

const expressionEditorWrapper: CSSProperties = {
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
};

const resourceBlockWrapper: CSSProperties = {
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingRight: '16px',
};

const contextActions: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: '8px',
};

const historyContainer: CSSProperties = {
    margin: '0.5rem',
    padding: '1rem',
    backgroundColor: '#ffffff',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
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
    width: '35px',
    height: '35px',
    borderRadius: '0.5rem',
    objectFit: 'cover',
};

export const styles = {
    header: headerStyle,
    content: contentStyle,
    sider: siderStyle,
    footer: footerStyle,
    layout: layoutStyle,
    editorWrapper,
    resourceBlockWrapper,
    contextActions,
    historyContainer,
    editor,
    expressionAndResultContainer,
    logo,
    expressionEditorWrapper,
};

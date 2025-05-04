const headerStyle: React.CSSProperties = {
    backgroundColor: '#f4f8fb',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '16px',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'left',
    minHeight: 120,
    padding: '16px',
    margin: '8px',
    borderRadius: '14px',
    backgroundColor: '#fff',
    overflowY: 'auto',
};

const siderStyle: React.CSSProperties = {
    backgroundColor: '#f4f8fb',
    textAlign: 'left',
    overflowY: 'auto',
    maxHeight: '100vh',
    width: 300,
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '12px',
    backgroundColor: '#f4f8fb',
};

const layoutStyle: React.CSSProperties = {
    overflow: 'hidden',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
};

const editorWrapper: React.CSSProperties = {
    height: '100vh',
};

const contextActions: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: '48px',
    padding: '12px',
};

const historyContainer: React.CSSProperties = {
    margin: '8px',
    padding: '16px',
    backgroundColor: '#FFF',
    borderRadius: '14px',
};

const editor: React.CSSProperties = {
    display: 'flex',
    height: '92vh',
}

const expressionAndResultContainer: React.CSSProperties = {
    height: '100vh'
}

const logo: React.CSSProperties = {
  width: '35px',
  height: '35px',
  borderRadius: '8px',
}

export const styles = {
    header: headerStyle,
    content: contentStyle,
    sider: siderStyle,
    footer: footerStyle,
    layout: layoutStyle,
    editorWrapper: editorWrapper,
    contextActions: contextActions,
    historyContainer: historyContainer,
    editor: editor,
    expressionAndResultContainer: expressionAndResultContainer,
    logo: logo,
};

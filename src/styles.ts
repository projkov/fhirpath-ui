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

export const styles = {
    header: headerStyle,
    content: contentStyle,
    sider: siderStyle,
    footer: footerStyle,
    layout: layoutStyle
};

import { useFHIRPathUI } from '../../components/Editor/hooks';
import 'react-toastify/dist/ReactToastify.css';
import { FHIRPathUIEditor } from '../../components/Editor/';
import { HistoryContainer } from '../../components/HistoryContainer';
import { Layout } from 'antd';
import { styles } from '../../styles';

const { Sider, Content } = Layout;

export function AppContent() {
    const FHIRPathUIData = useFHIRPathUI();

    return (
        <Layout style={{ backgroundColor: '#f4f8fb' }}>
            <Sider width="25%" style={styles.sider}>
                <HistoryContainer setResource={FHIRPathUIData.setResource} setUrl={FHIRPathUIData.setUrl} setExpression={FHIRPathUIData.setExpression} />
            </Sider>
            <Content style={styles.content}>
                <FHIRPathUIEditor
                    {...FHIRPathUIData}
                />
            </Content>
        </Layout>
    );
}

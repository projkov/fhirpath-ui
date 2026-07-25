import logo from '../../assets/logo.png';
import { DrawerButton } from '../../components/DrawerButton';
import { CredentialsContainer } from '../../containers/Credentials';
import { Button, Layout, Space, Tooltip, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { styles } from '../../styles';
import version from '../../version';

const { Header } = Layout;
const { Text } = Typography;

export function AppHeader() {
    return (
        <Header style={styles.header}>
            <div style={styles.headerBrand}>
                <img src={logo} alt="Logo" style={styles.logo} />
                <Text strong style={styles.headerTitle}>FHIRPath UI</Text>
                <Text type="secondary" style={styles.headerVersion}>v{version}</Text>
            </div>
            <Space size="small">
                <DrawerButton
                    content={<CredentialsContainer />}
                    title="About"
                    button={
                        <Tooltip title="About">
                            <Button type="text" icon={<InfoCircleOutlined />} />
                        </Tooltip>
                    }
                />
            </Space>
        </Header>
    );
}

import { Layout } from 'antd';
import { styles } from '../../styles';

const { Footer } = Layout;

export function AppFooter() {
    return (
        <Footer style={styles.footer}>
            Pavel Rozhkov, 2025
        </Footer>
    );
}

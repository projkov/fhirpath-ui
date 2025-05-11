import logo from '../../assets/logo.png';
import { DrawerButton } from '../../components/DrawerButton';
import { SettingsContainer } from '../../containers/Settings';
import { CredentialsContainer } from '../../containers/Credentials';
import { Button, Layout } from 'antd';
import { styles } from '../../styles';

const { Header } = Layout;

export function AppHeader() {
    return (
        <Header style={styles.header}>
            <img src={logo} alt="Logo" style={styles.logo} />
            <DrawerButton content={<SettingsContainer />} button={<Button type="text">Settings</Button>} title="Settings" size="large" />
            <DrawerButton content={<CredentialsContainer />} button={<Button type="text">About</Button>} title="About" />
        </Header>
    );
}

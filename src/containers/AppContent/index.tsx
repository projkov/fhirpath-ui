import 'react-toastify/dist/ReactToastify.css';
import { FHIRPathUIEditor } from '../../components/Editor/';
import { HistoryContainer } from '../../components/HistoryContainer';
import { Layout } from 'antd';
import { styles } from '../../styles';
import {useFHIRPathUI} from "../../hooks";

const { Sider, Content } = Layout;

export function AppContent() {
    const {
        entity,
        setEntity,
        shareLink,
        handleFetch,
        handleExecute,
        handleShare,
        handleUrlChange,
        isLoading,
        isExecuteActive,
        isGetResourceActive,
        isShareActive,
        isShareResultActive,
        handleShareResult,
        copyToClipboard,
        resourceFormat,
        testResource } = useFHIRPathUI();

    return (
        <Layout style={{ backgroundColor: '#f4f8fb' }}>
            <Sider width="25%" style={styles.sider}>
                <HistoryContainer
                    setEntity={setEntity}
                    entity={entity}
                />
            </Sider>
            <Content style={styles.content}>
                <FHIRPathUIEditor
                    entity={entity}
                    setEntity={setEntity}
                    shareLink={shareLink}
                    isLoading={isLoading}
                    handleExecute={handleExecute}
                    isExecuteActive={isExecuteActive}
                    isShareResultActive={isShareResultActive}
                    handleShare={handleShare}
                    handleFetch={handleFetch}
                    resourceFormat={resourceFormat}
                    handleUrlChange={handleUrlChange}
                    testResource={testResource}
                    handleShareResult={handleShareResult}
                    copyToClipboard={copyToClipboard}
                    isGetResourceActive={isGetResourceActive}
                    isShareActive={isShareActive}
                />
            </Content>
        </Layout>
    );
}

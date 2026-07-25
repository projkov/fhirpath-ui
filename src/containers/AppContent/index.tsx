import 'react-toastify/dist/ReactToastify.css';
import { FHIRPathUIEditor } from '../../components/Editor/';
import { HistoryContainer } from '../../components/HistoryContainer';
import { Splitter } from 'antd';
import { styles } from '../../styles';
import {useFHIRPathUI} from "../../hooks";

export function AppContent() {
    const {
        entity,
        setEntity,
        tabs,
        activeTabId,
        addTab,
        closeTab,
        switchTab,
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
        <Splitter style={styles.appSplitter}>
            <Splitter.Panel defaultSize="300px" min="220px" max="45%" collapsible style={styles.sider}>
                <HistoryContainer
                    setEntity={setEntity}
                    entity={entity}
                />
            </Splitter.Panel>
            <Splitter.Panel style={styles.content}>
                <FHIRPathUIEditor
                    entity={entity}
                    setEntity={setEntity}
                    tabs={tabs}
                    activeTabId={activeTabId}
                    onAddTab={addTab}
                    onCloseTab={closeTab}
                    onSwitchTab={switchTab}
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
            </Splitter.Panel>
        </Splitter>
    );
}

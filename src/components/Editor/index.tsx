import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { TabBar } from './TabBar';
import { RequestBar } from './RequestBar';
import { ExpressionContainer } from './ExpressionContainer';
import { ResourceContainer } from './ResourceContainer';
import { ResultContainer } from './ResultContainer';
import { ResponseStatus } from './ResponseStatus';
import { FHIRPathUIEditorProps } from './types';
import { styles } from '../../styles';

export function FHIRPathUIEditor(props: FHIRPathUIEditorProps) {
    const tabItems: TabsProps['items'] = [
        {
            key: 'resource',
            label: 'Resource',
            children: <ResourceContainer {...props} />,
        },
        {
            key: 'result',
            label: 'Result',
            children: <ResultContainer {...props} />,
        },
    ];

    return (
        <div style={styles.editorWrapper}>
            <TabBar
                tabs={props.tabs}
                activeTabId={props.activeTabId}
                onAddTab={props.onAddTab}
                onCloseTab={props.onCloseTab}
                onSwitchTab={props.onSwitchTab}
            />
            <RequestBar {...props} />
            <ExpressionContainer {...props} />
            <Tabs
                className="fhirpath-result-tabs"
                style={styles.resultTabs}
                items={tabItems}
                tabBarExtraContent={<ResponseStatus statusCode={props.entity.statusCode} isLoading={props.isLoading} />}
            />
        </div>
    );
}

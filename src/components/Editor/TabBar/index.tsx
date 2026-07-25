import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { ServiceEntity } from '../../../types';
import { styles } from '../../../styles';

function tabLabel(entity: ServiceEntity): string {
    if (entity.expression) {
        return entity.expression.length > 28 ? `${entity.expression.slice(0, 28)}…` : entity.expression;
    }
    if (entity.url) {
        try {
            const parsed = new URL(entity.url);
            return parsed.pathname !== '/' ? parsed.pathname : entity.url;
        } catch {
            return entity.url;
        }
    }
    return 'New Request';
}

interface TabBarProps {
    tabs: ServiceEntity[];
    activeTabId: string;
    onAddTab: () => void;
    onCloseTab: (id: string) => void;
    onSwitchTab: (id: string) => void;
}

export function TabBar(props: TabBarProps) {
    const { tabs, activeTabId, onAddTab, onCloseTab, onSwitchTab } = props;

    const items: TabsProps['items'] = tabs.map((tab) => ({
        key: tab.id,
        label: tabLabel(tab),
        closable: tabs.length > 1,
    }));

    const onEdit: TabsProps['onEdit'] = (targetKey, action) => {
        if (action === 'add') {
            onAddTab();
        } else {
            onCloseTab(targetKey as string);
        }
    };

    return (
        <div style={styles.compactBar}>
            <Tabs
                type="editable-card"
                size="small"
                hideAdd={false}
                activeKey={activeTabId}
                onChange={onSwitchTab}
                onEdit={onEdit}
                items={items}
                className="fhirpath-tab-bar"
            />
        </div>
    );
}

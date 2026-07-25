import { Badge, Button, Checkbox, Input, Popover, Space, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { HeaderItem, ServiceEntity } from '../../../types';
import { generateId } from '../../../utils/id';
import { styles } from '../../../styles';

const { Text } = Typography;

interface HeadersEditorProps {
    entity: ServiceEntity;
    setEntity: (v: ServiceEntity) => void;
}

export function HeadersEditor(props: HeadersEditorProps) {
    const { entity, setEntity } = props;
    const headers = entity.headers ?? [];
    const enabledCount = headers.filter((h) => h.enabled && h.key.trim() !== '').length;

    const updateHeaders = (next: HeaderItem[]) => setEntity({ ...entity, headers: next });

    const addRow = () => updateHeaders([...headers, { id: generateId(), key: '', value: '', enabled: true }]);
    const removeRow = (id: string) => updateHeaders(headers.filter((h) => h.id !== id));
    const updateRow = (id: string, patch: Partial<HeaderItem>) =>
        updateHeaders(headers.map((h) => (h.id === id ? { ...h, ...patch } : h)));

    const content = (
        <div style={styles.headersPopoverContent}>
            {headers.length === 0 && (
                <Text type="secondary" style={{ fontSize: '13px', display: 'block', marginBottom: '8px' }}>
                    No custom headers yet.
                </Text>
            )}
            {headers.map((header) => (
                <Space key={header.id} style={{ display: 'flex', marginBottom: '6px' }} align="center">
                    <Checkbox
                        checked={header.enabled}
                        onChange={(e) => updateRow(header.id, { enabled: e.target.checked })}
                    />
                    <Input
                        placeholder="Header name"
                        value={header.key}
                        onChange={(e) => updateRow(header.id, { key: e.target.value })}
                        style={{ width: '160px' }}
                    />
                    <Input
                        placeholder="Value"
                        value={header.value}
                        onChange={(e) => updateRow(header.id, { value: e.target.value })}
                        style={{ width: '220px' }}
                    />
                    <Button
                        type="text"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeRow(header.id)}
                    />
                </Space>
            ))}
            <Button type="dashed" size="small" icon={<PlusOutlined />} onClick={addRow}>
                Add header
            </Button>
        </div>
    );

    return (
        <Popover content={content} title="Headers" trigger="click" placement="bottomRight">
            <Badge count={enabledCount} size="small" offset={[-6, 4]}>
                <Button>Headers</Button>
            </Badge>
        </Popover>
    );
}

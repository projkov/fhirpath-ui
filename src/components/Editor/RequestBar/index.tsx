import { Space, Select, Input, Button } from 'antd';
import { FHIRPathUIEditorProps } from '../types';
import { styles } from '../../../styles';
import { HeadersEditor } from '../HeadersEditor';

const methodOptions = [{ value: 'GET', label: 'GET' }];

export function RequestBar(props: FHIRPathUIEditorProps) {
    const { handleUrlChange, handleFetch, entity, setEntity, isLoading } = props;
    const onSend = () => handleFetch(entity.url ?? "");

    return (
        <div style={{ ...styles.compactBar, display: 'flex', flexDirection: 'row', gap: '8px' }}>
            <Space.Compact style={{ width: '100%', flex: 1 }}>
                <Select value="GET" options={methodOptions} disabled style={{ width: 100 }} />
                <Input
                    placeholder="Paste the URL to fetch the FHIR resource"
                    allowClear
                    value={entity.url}
                    onChange={handleUrlChange}
                    onPressEnter={onSend}
                />
                <Button type="primary" onClick={onSend} loading={isLoading}>
                    Send
                </Button>
            </Space.Compact>
            <HeadersEditor entity={entity} setEntity={setEntity} />
        </div>
    );
}

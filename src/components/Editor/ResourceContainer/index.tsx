import Editor from '@monaco-editor/react';
import { Input } from 'antd';
import { FHIRPathUIEditorProps } from '../types';
import { styles } from '../../../styles';

export function ResourceContainer(props: FHIRPathUIEditorProps) {
    const { handleUrlChange, handleFetch, resourceFormat, entity, setEntity } = props;
    const onSearch = () => handleFetch(entity.url ?? "");
    const onChange = (
        value: string | undefined) => setEntity({ ...entity, ...{ response: value ?? "" } });
    const editorOptions = {
        formatOnPaste: true,
        formatOnType: true
    };

    return (
        <div style={styles.resourceBlockWrapper}>
            <Input.Search
                addonBefore="GET"
                placeholder="You can paste the URL to get the FHIR Resource"
                allowClear
                enterButton="Request"
                size="middle"
                value={entity.url}
                loading={props.isLoading}
                onChange={handleUrlChange}
                onSearch={onSearch}
            />
            <Editor
                height="85vh"
                key={resourceFormat}
                defaultLanguage={resourceFormat}
                value={entity.response}
                onChange={onChange}
                options={editorOptions}
            />
        </div>
    );
}

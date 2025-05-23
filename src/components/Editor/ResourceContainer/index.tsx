import Editor from '@monaco-editor/react';
import { Input } from 'antd';
import { FHIRPathUIEditorProps } from '../types';
import { styles } from '../../../styles';

export function ResourceContainer(props: FHIRPathUIEditorProps) {
    const { url, handleUrlChange, handleFetch, resourceFormat, setResource, resource } = props;
    const onSearch = () => handleFetch(url);
    const onChange = (value: string | undefined) => setResource(value ?? "");
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
                value={url}
                loading={props.isLoading}
                onChange={handleUrlChange}
                onSearch={onSearch}
            />
            <Editor
                height="85vh"
                key={resourceFormat}
                defaultLanguage={resourceFormat}
                value={resource}
                onChange={onChange}
                options={editorOptions}
            />
        </div>
    );
}

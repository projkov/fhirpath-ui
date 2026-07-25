import Editor, { BeforeMount } from '@monaco-editor/react';
import { FHIRPathUIEditorProps } from '../types';
import { styles } from '../../../styles';
import { registerFhirPathLanguage, FHIRPATH_THEME_ID } from '../../../monaco/fhirpathLanguage';

export function ResourceContainer(props: FHIRPathUIEditorProps) {
    const { resourceFormat, entity, setEntity } = props;
    const onChange = (
        value: string | undefined) => setEntity({ ...entity, ...{ response: value ?? "" } });
    const editorOptions = {
        formatOnPaste: true,
        formatOnType: true
    };

    const beforeMount: BeforeMount = (monaco) => registerFhirPathLanguage(monaco);

    return (
        <div style={styles.tabPaneWrapper}>
            <Editor
                height="100%"
                key={resourceFormat}
                defaultLanguage={resourceFormat}
                theme={FHIRPATH_THEME_ID}
                value={entity.response}
                onChange={onChange}
                beforeMount={beforeMount}
                options={editorOptions}
            />
        </div>
    );
}

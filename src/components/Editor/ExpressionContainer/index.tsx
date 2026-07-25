import { useRef } from 'react';
import Editor, { BeforeMount, OnMount } from '@monaco-editor/react';
import { Button } from 'antd';
import { FHIRPathUIEditorProps } from '../types';
import { styles } from '../../../styles';
import { registerFhirPathLanguage, FHIRPATH_LANGUAGE_ID, FHIRPATH_THEME_ID } from '../../../monaco/fhirpathLanguage';

const editorOptions = {
    lineNumbers: 'off' as const,
    glyphMargin: false,
    folding: false,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0,
    overviewRulerLanes: 0,
    scrollBeyondLastColumn: 0,
    scrollBeyondLastLine: false,
    scrollbar: { horizontal: 'hidden' as const, vertical: 'hidden' as const },
    minimap: { enabled: false },
    wordWrap: 'off' as const,
    renderLineHighlight: 'none' as const,
    contextmenu: false,
    quickSuggestions: false,
    suggestOnTriggerCharacters: false,
    parameterHints: { enabled: false },
    automaticLayout: true,
    fontSize: 13,
    padding: { top: 6, bottom: 6 },
};

export function ExpressionContainer(props: FHIRPathUIEditorProps) {
    const { handleExecute, isExecuteActive, entity, setEntity } = props;
    const onExecute = () => handleExecute(entity.response ?? '', entity.expression ?? '');
    const onExecuteRef = useRef(onExecute);
    onExecuteRef.current = onExecute;

    const onChange = (value: string | undefined) => setEntity({ ...entity, ...{ expression: value ?? '' } });

    const beforeMount: BeforeMount = (monaco) => registerFhirPathLanguage(monaco);

    const onMount: OnMount = (editorInstance, monaco) => {
        editorInstance.addCommand(monaco.KeyCode.Enter, () => onExecuteRef.current());
        editorInstance.onDidChangeModelContent(() => {
            const model = editorInstance.getModel();
            if (model && model.getLineCount() > 1) {
                model.setValue(model.getValue().replace(/\r?\n/g, ''));
            }
        });
    };

    return (
        <div style={styles.compactBar}>
            <div style={styles.expressionBarShell}>
                <div style={styles.expressionBarLabel}>FHIRPath</div>
                <div style={styles.expressionBarEditor}>
                    <Editor
                        language={FHIRPATH_LANGUAGE_ID}
                        theme={FHIRPATH_THEME_ID}
                        value={entity.expression}
                        onChange={onChange}
                        beforeMount={beforeMount}
                        onMount={onMount}
                        options={editorOptions}
                    />
                </div>
                <Button
                    type="primary"
                    onClick={onExecute}
                    disabled={!isExecuteActive}
                    style={styles.expressionBarExecute}
                >
                    Execute
                </Button>
            </div>
        </div>
    );
}

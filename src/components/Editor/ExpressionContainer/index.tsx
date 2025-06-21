import Editor from '@monaco-editor/react';
import "allotment/dist/style.css";
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'antd';
import { FHIRPathUIEditorProps } from '../types';
import { styles } from '../../../styles';

export function ExpressionContainer(props: FHIRPathUIEditorProps) {
    const { handleExecute, isExecuteActive, entity, setEntity } = props;
    const onClick = () => handleExecute(entity.response ?? '', entity.expression ?? '')
    const onChange = (
        value: string | undefined) => setEntity({ ...entity, ...{ expression: value ?? "" } });
    const editorOptions = {
        formatOnPaste: true,
        formatOnType: true,
        minimap: {
            enabled: false,
        },
    }

    return (
        <div style={styles.expressionEditorWrapper}>
            <div style={styles.contextActions}>
                <Button
                    type="primary"
                    onClick={onClick}
                    disabled={!isExecuteActive}
                >
                    Execute
                </Button>
            </div>
            <Editor
                defaultLanguage="ruby"
                value={entity.expression}
                onChange={onChange}
                options={editorOptions}
            />
        </div>
    )
}

import '../../../App.css';
import Editor from '@monaco-editor/react';
import "allotment/dist/style.css";
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'antd';
import { FHIRPathUIEditorProps } from '../types';

export function ExpressionContainer(props: FHIRPathUIEditorProps) {
    const { handleExecute, resource, expression, isExecuteActive, setExpression } = props;

    return (
        <div className='editorWrapper'>
            <div className="header">
                <Button
                    type="primary"
                    onClick={() => handleExecute(resource, expression)}
                    disabled={!isExecuteActive}
                >
                    Execute
                </Button>
            </div>
            <Editor
                defaultLanguage="ruby"
                value={expression}
                onChange={(value) => setExpression(value as string)}
                options={{
                    formatOnPaste: true,
                    formatOnType: true,
                    minimap: {
                        enabled: false,
                    },
                }}
            />
        </div>
    )
}

import '../../App.css';
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import 'react-toastify/dist/ReactToastify.css';
import { ResultContainer } from './ResultContainer';
import { ExpressionContainer } from './ExpressionContainer';
import { ResourceContainer } from './ResourceContainer';
import { FHIRPathUIEditorProps } from './types';

export function FHIRPathUIEditor(props: FHIRPathUIEditorProps) {
    return (
        <div className='editor'>
            <Allotment defaultSizes={[550, 250]}>
                <ResourceContainer {...props} />
                <div style={{ height: '100vh' }}>
                    <Allotment defaultSizes={[100, 300]} vertical>
                        <ExpressionContainer {...props} />
                        <ResultContainer {...props} />
                    </Allotment>
                </div>
            </Allotment>
        </div>
    );
}

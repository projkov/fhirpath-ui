import { Allotment } from "allotment";
import "allotment/dist/style.css";
import 'react-toastify/dist/ReactToastify.css';
import { ResultContainer } from './ResultContainer';
import { ExpressionContainer } from './ExpressionContainer';
import { ResourceContainer } from './ResourceContainer';
import { FHIRPathUIEditorProps } from './types';
import { styles } from '../../styles';

export function FHIRPathUIEditor(props: FHIRPathUIEditorProps) {
    return (
        <Allotment defaultSizes={[550, 250]}>
            <ResourceContainer {...props} />
            <div>
                <ExpressionContainer {...props} />
                <ResultContainer {...props} />
            </div>
        </Allotment>
    );
}

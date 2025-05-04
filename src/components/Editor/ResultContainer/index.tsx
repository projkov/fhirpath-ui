import "allotment/dist/style.css";
import 'react-toastify/dist/ReactToastify.css';
import { ResultOutput } from '../../ResultOutput/';
import { Button } from 'antd';
import { FHIRPathUIEditorProps } from '../types';
import { styles } from '../../../styles';

export function ResultContainer(props: FHIRPathUIEditorProps) {
    return (
        <>
            <div style={styles.contextActions}>
                <Button
                    type="primary"
                    onClick={props.handleShareResult}
                    disabled={!props.isShareResultActive}
                >
                    Copy
                </Button>
                <Button
                    type="primary"
                    onClick={props.handleShare}
                    disabled={!props.isShareActive}>
                    Share
                </Button>
            </div>
            <ResultOutput resultItems={props.result} />
        </>
    )
}

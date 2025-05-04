import '../../../App.css';
import "allotment/dist/style.css";
import 'react-toastify/dist/ReactToastify.css';
import { ResultOutput } from '../../ResultOutput/';
import { Button } from 'antd';
import { FHIRPathUIEditorProps } from '../types';

export function ResultContainer(props: FHIRPathUIEditorProps) {
    return (
        <div>
            <div className="header">
                <div className="buttonsBlock">
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
            </div>
            <ResultOutput resultItems={props.result} />
        </div>
    )
}

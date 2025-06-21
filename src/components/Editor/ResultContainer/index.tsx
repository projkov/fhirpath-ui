import "allotment/dist/style.css";
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'antd';
import { FHIRPathUIEditorProps } from '../types';
import { styles } from '../../../styles';
import { List } from "antd";

export function ResultContainer(props: FHIRPathUIEditorProps) {
    return (
        <div style={{ padding: '16px'}}>
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
            <List
                pagination={{
                    position: 'bottom',
                    align: 'center',
                }}
                size="small"
                dataSource={props.entity.result}
                renderItem={(item) => (
                    <List.Item>
                        <pre>{JSON.stringify(item, null, 2)}</pre>
                    </List.Item>
                )}
            />
        </div>
    )
}

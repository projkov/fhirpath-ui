import { Tag } from 'antd';
import { styles } from '../../../styles';
import { getStatusColor, getStatusText } from '../../../utils/http';

interface ResponseStatusProps {
    statusCode?: number;
    isLoading: boolean;
}

export function ResponseStatus(props: ResponseStatusProps) {
    const { statusCode, isLoading } = props;

    if (isLoading || statusCode === undefined) {
        return null;
    }

    return (
        <Tag color={getStatusColor(statusCode)} style={styles.statusTag}>
            {statusCode} {getStatusText(statusCode)}
        </Tag>
    );
}

import moment from 'moment';
import { List, Button, Space, Tag, Typography, Popover } from 'antd';
import { getExecutionsHistory } from '../../containers/HistoryContainer/utils';
import { ExecutionItem } from '../../containers/HistoryContainer/types';
import { styles } from '../../styles';
import { detectFormat, convertToFormat } from '../../utils/format';
import {
    MinusCircleOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

export interface HistoryContainerItemProps {
    item: ExecutionItem;
    setResource: (v: string) => void;
    setUrl: (v: string) => void;
    setExpression: (v: string) => void;
}

function HistoryContainerItem(props: HistoryContainerItemProps) {
    const { item, setResource, setUrl, setExpression } = props;
    const { response, url, expression, status, requestType } = item;
    const formattedDate = moment(item.dateTime).format('YYYY-MM-DD HH:mm')
    const onClick = () => {
        setResource(response);
        setUrl(url);
        setExpression(expression);
    }
    const truncateToPreview = (text: string, maxLength = 35): string => {
        return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
    }
    const content = (
        <div style={{ maxWidth: 500 }}>
            <p><code>{status === "not-asked" ? truncateToPreview(convertToFormat(response, 'json'), 1000) : url}</code></p>
            <p><code>{expression}</code></p>
        </div>
    );

    const itemContent = status === "not-asked" ?
        { tagColor: "default", tagIcon: <MinusCircleOutlined />, tagText: '', previewText: JSON.parse(convertToFormat(response, 'json'))?.['resourceType'] } :
        { tagColor: status, tagIcon: null, tagText: requestType.toUpperCase(), previewText: url }

    return (
        <Space>
            <Tag color={itemContent.tagColor} icon={itemContent.tagIcon}>{itemContent.tagText}</Tag>
            <Text type="secondary" style={{ fontSize: '12px' }}>{formattedDate}</Text>
            <Popover content={content}>
                <Button type="link" onClick={onClick}>{truncateToPreview(itemContent.previewText)}</Button>
            </Popover>
        </Space>
    );
}


export function HistoryContainer(props: Omit<HistoryContainerItemProps, "item">) {
    const renderItem = (item: ExecutionItem) => {
        return (
            <List.Item>
                <HistoryContainerItem
                    item={item}
                    setResource={props.setResource}
                    setUrl={props.setUrl}
                    setExpression={props.setExpression} />
            </List.Item>
        );
    }

    return (
        <List
            style={styles.historyContainer}
            size="small"
            dataSource={getExecutionsHistory()}
            renderItem={renderItem}
        />
    );
}

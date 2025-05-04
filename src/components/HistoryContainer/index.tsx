import moment from 'moment';
import { List, Button, Space, Tag, Typography } from 'antd';
import { getExecutionsHistory } from '../../containers/HistoryContainer/utils';
import { ExecutionItem } from '../../containers/HistoryContainer/types';

const { Text } = Typography;

export interface HistoryContainerItemProps {
    item: ExecutionItem;
    setResource: (v: string) => void;
    setUrl: (v: string) => void;
    setExpression: (v: string) => void;
}

function HistoryContainerItem(props: HistoryContainerItemProps) {
    const { item, setResource, setUrl, setExpression } = props;
    const formattedDate = moment(item.dateTime).format('YYYY-MM-DD HH:mm')
    const onClick = () => {
        setResource(item.response);
        setUrl(item.url);
        setExpression(item.expression);
    }
    
    return (
        <Space>
            <Tag color={item.status}>{item.requestType}</Tag>
            <Text type="secondary">{formattedDate}</Text>
            <Button type="link" onClick={onClick}>{item.url}</Button>
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
                    setExpression={props.setExpression}/>
            </List.Item>
        );
    }
    
    return (
        <List
            className="historyContainer"
            size="small"
            dataSource={getExecutionsHistory()}
            renderItem={renderItem}
        />
    );
}


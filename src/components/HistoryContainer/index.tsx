import moment from 'moment';
import { List, Button, Space, Tag, Typography, Popover } from 'antd';
import { getExecutionsHistory } from '../../containers/HistoryContainer/utils';
import { styles } from '../../styles';
import { convertToFormat } from '../../utils/format';
import {
    MinusCircleOutlined,
} from '@ant-design/icons';
import {ServiceEntity} from "../../types";

const { Text } = Typography;

export interface HistoryContainerItemProps {
    entity: ServiceEntity;
    setEntity: (v: ServiceEntity) => void;
}

function HistoryContainerItem(props: HistoryContainerItemProps) {
    const { entity, setEntity } = props;
    const { response, url, expression, status, requestType } = entity;
    const formattedDate = moment(entity.dateTime).format('YYYY-MM-DD HH:mm')
    const onClick = () => {
        setEntity({
            ...entity,
            ...{
                response: response,
                url: url,
                expression: expression,
            }
        })
    }
    const truncateToPreview = (text: string, maxLength = 35): string => {
        return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
    }
    const content = (
        <div style={{ maxWidth: 500 }}>
            <p><code>{status === "not-asked" ? truncateToPreview(convertToFormat(response ?? '', 'json'), 1000) : url}</code></p>
            <p><code>{expression}</code></p>
        </div>
    );

    const itemContent = status === "not-asked" ?
        { tagColor: "default", tagIcon: <MinusCircleOutlined />, tagText: '', previewText: JSON.parse(convertToFormat(response ?? '', 'json'))?.['resourceType'] } :
        { tagColor: status, tagIcon: null, tagText: requestType?.toUpperCase(), previewText: url }

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


export function HistoryContainer(props: HistoryContainerItemProps) {
    const renderItem = (entity: ServiceEntity) => {
        return (
            <List.Item>
                <HistoryContainerItem
                    entity={entity}
                    setEntity={props.setEntity}
                />
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

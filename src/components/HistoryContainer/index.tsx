import moment from 'moment';
import { useState } from 'react';
import { List, Button, Space, Tag, Typography, Popconfirm } from 'antd';
import { getExecutionsHistory, removeEntity } from '../../containers/HistoryContainer/utils';
import { styles } from '../../styles';
import {
    MinusCircleOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import {ServiceEntity} from "../../types";

const { Text } = Typography;

export interface HistoryContainerItemProps {
    entity: ServiceEntity;
    setEntity: (v: ServiceEntity) => void;
}

interface HistoryContainerRowProps {
    entity: ServiceEntity;
    setEntity: (v: ServiceEntity) => void;
    isSelected: boolean;
    onDelete: (dateTime: string) => void;
}

function HistoryContainerItem(props: HistoryContainerRowProps) {
    const { entity, setEntity, isSelected, onDelete } = props;
    const { url, expression, status, requestType, dateTime } = entity;
    const formattedDate = moment(dateTime).format('YYYY-MM-DD HH:mm')

    const onClick = () => {
        setEntity({
            ...entity,
            ...{
                url,
                expression,
                dateTime,
            }
        })
    }

    const tagColor = status === "not-asked" ? "default" : status;
    const tagIcon = status === "not-asked" ? <MinusCircleOutlined /> : null;
    const tagText = status === "not-asked" ? '' : requestType?.toUpperCase();

    return (
        <div
            className="history-item"
            onClick={onClick}
            style={{
                ...styles.historyItem,
                ...(isSelected ? styles.historyItemSelected : {}),
            }}
        >
            <div style={styles.historyItemHeader}>
                <Space size="small">
                    <Tag color={tagColor} icon={tagIcon}>{tagText}</Tag>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{formattedDate}</Text>
                </Space>
                <Popconfirm
                    title="Delete this history entry?"
                    onConfirm={() => onDelete(dateTime)}
                    onPopupClick={(e) => e.stopPropagation()}
                >
                    <Button
                        className="history-item-delete"
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={(e) => e.stopPropagation()}
                    />
                </Popconfirm>
            </div>
            <Text
                ellipsis={{ tooltip: expression || undefined }}
                style={{
                    ...styles.historyItemExpression,
                    ...(expression ? {} : { color: 'rgba(0, 0, 0, 0.45)', fontStyle: 'italic' }),
                }}
            >
                {expression || 'No expression yet'}
            </Text>
            <Text
                ellipsis={{ tooltip: url || undefined }}
                type="secondary"
                style={styles.historyItemUrl}
            >
                {url || 'No URL'}
            </Text>
        </div>
    );
}

export function HistoryContainer(props: HistoryContainerItemProps) {
    const [, setVersion] = useState(0);

    const handleDelete = (dateTime: string) => {
        removeEntity(dateTime);
        setVersion((v) => v + 1);
    };

    const renderItem = (entity: ServiceEntity) => {
        return (
            <List.Item>
                <HistoryContainerItem
                    entity={entity}
                    setEntity={props.setEntity}
                    isSelected={entity.dateTime === props.entity.dateTime}
                    onDelete={handleDelete}
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

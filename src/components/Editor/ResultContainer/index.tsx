import { useState } from 'react';
import { Button, List, Space, Tag, Tooltip, Typography } from 'antd';
import { CopyOutlined, CheckOutlined, ShareAltOutlined } from '@ant-design/icons';
import { FHIRPathUIEditorProps } from '../types';
import { styles } from '../../../styles';
import { HighlightedJson } from '../../../utils/jsonHighlight';

const { Text } = Typography;

function typeLabel(item: unknown): string {
    if (item === null) return 'null';
    if (Array.isArray(item)) return 'array';
    return typeof item;
}

function ResultItem({ item, index }: { item: unknown; index: number }) {
    const [copied, setCopied] = useState(false);
    const text = JSON.stringify(item, null, 2);

    const onCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        });
    };

    return (
        <div style={styles.resultItem}>
            <div style={styles.resultItemHeader}>
                <Space size="small">
                    <Text type="secondary" style={{ fontSize: '12px' }}>#{index + 1}</Text>
                    <Tag>{typeLabel(item)}</Tag>
                </Space>
                <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                    <Button
                        type="text"
                        size="small"
                        icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                        onClick={onCopy}
                    />
                </Tooltip>
            </div>
            <pre style={styles.resultItemCode}>
                <HighlightedJson value={text} />
            </pre>
        </div>
    );
}

export function ResultContainer(props: FHIRPathUIEditorProps) {
    const resultCount = props.entity.result?.length ?? 0;

    return (
        <div style={styles.tabPaneWrapper}>
            <div style={styles.resultToolbar}>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                    {resultCount} {resultCount === 1 ? 'result' : 'results'}
                </Text>
                <Space size="small">
                    <Button
                        icon={<CopyOutlined />}
                        onClick={props.handleShareResult}
                        disabled={!props.isShareResultActive}
                    >
                        Copy All
                    </Button>
                    <Button
                        icon={<ShareAltOutlined />}
                        onClick={props.handleShare}
                        disabled={!props.isShareActive}
                    >
                        Share
                    </Button>
                </Space>
            </div>
            <List
                pagination={{
                    position: 'bottom',
                    align: 'center',
                }}
                size="small"
                dataSource={props.entity.result}
                renderItem={(item, index) => (
                    <List.Item style={{ border: 'none', padding: '0 0 8px 0' }}>
                        <ResultItem item={item} index={index} />
                    </List.Item>
                )}
            />
        </div>
    )
}

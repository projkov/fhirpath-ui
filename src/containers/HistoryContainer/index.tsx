import React from 'react';
import moment from 'moment';
import { Tabs, Space, Table, Tag, Button, Popconfirm } from 'antd';
import type { TabsProps, TableProps } from 'antd';
import { RequestsHistoryItem, ExpressionsHistoryItem } from './types'
import { getFromLocalStorage, setToLocalStorage } from "../../utils/storage"
import { DrawerButton } from '../../components/DrawerButton';
import { Play, ShareFat, FileArrowDown, Gear, Copy, Info, ClockCounterClockwise } from "@phosphor-icons/react";
import Editor from '@monaco-editor/react';

function RequestsHistoryTable(props: RequestHistoryTableProps) {
    const { setUrl, copyToClickboard, setResource } = props;
    const requestsHistory = getFromLocalStorage<Array<RequestsHistoryItem>>("FHIRPathUIRequests")
    const sortedRequestsHistory = requestsHistory ? requestsHistory.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()) : [];

    const columns: TableProps<RequestsHistoryItem>['columns'] = [
        {
            title: 'Date&Time',
            dataIndex: 'dateTime',
            render: (value) => moment(value).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: 'URL',
            dataIndex: 'url',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            filters: [
                { text: 'Success', value: 'success' },
                { text: 'Failure', value: 'failure' },
            ],
            onFilter: (value, record) => record.status === value,
            render: (status) => <Tag color={status === 'success' ? 'green' : 'red'}>{status}</Tag>,
        }
    ];

    return (
        <Table<RequestsHistoryItem>
            columns={columns}
            dataSource={sortedRequestsHistory}
            locale={{ emptyText: "No request history yet." }}
            pagination={{ pageSize: 10 }}
            expandable={{
                rowExpandable: (record) => record.url !== '',
                expandedRowRender: (record) => <Space size="middle">
                    <DrawerButton
                        content={
                            <Editor
                                height="100vh"
                                defaultLanguage="json"
                                value={record.response}
                            />
                        }
                        button={<Button type="link">Show response</Button>}
                        title={`Response for the ${record.status} request: ${record.url}, made at ${record.dateTime}`}
                        size="large"
                    />
                    <Button type="link" onClick={() => setResource(record.response)}>Use response</Button>
                    <Popconfirm title="Use this URL?" onConfirm={() => setUrl(record.url)}>
                        <Button type="link">Use URL</Button>
                    </Popconfirm>
                    <Button type="link" onClick={() => copyToClickboard(record.url, "The URL has been copied", "Error while copying the URL")}>Copy URL</Button>
                </Space>,
            }}
        />
    );
}

function ExpressionsHistoryTable(props: ExpressionsHistoryTableProps) {
    const { setExpression, copyToClickboard } = props;
    const expressionsHistory = getFromLocalStorage<Array<ExpressionsHistoryItem>>("FHIRPathUIExpressions")
    const sortedExpressionsHistory = expressionsHistory ? expressionsHistory.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()) : [];


    const columns: TableProps<ExpressionsHistoryItem>['columns'] = [
        {
            title: 'Date&Time',
            dataIndex: 'dateTime',
        },
        {
            title: 'Expression',
            dataIndex: 'expression',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => setExpression(record.expression)}>Use</Button>
                    <Button type="link" onClick={() => copyToClickboard(record.expression, "The FHIRPath expression has been copied", "Error while copying the FHIRPath expression")}>Copy</Button>
                </Space>
            ),
        },
    ];

    return <Table<ExpressionsHistoryItem> columns={columns} dataSource={sortedExpressionsHistory} />;
}

interface HistoryContainerProps {
    setResource: (value: string) => void;
    setUrl: (value: string) => void;
    setExpression: (value: string) => void;
    copyToClickboard: (toCopy: string, successMessage: string, errorMessage: string) => void;
}

interface RequestHistoryTableProps {
    setResource: (value: string) => void;
    setUrl: (value: string) => void;
    copyToClickboard: (toCopy: string, successMessage: string, errorMessage: string) => void;
}

interface ExpressionsHistoryTableProps {
    setExpression: (value: string) => void;
    copyToClickboard: (toCopy: string, successMessage: string, errorMessage: string) => void;
}

export function HistoryContainer(props: HistoryContainerProps) {
    const { setResource, setUrl, setExpression, copyToClickboard } = props;

    return <Tabs items={[
        {
            key: 'requests',
            label: 'Requests',
            children: <RequestsHistoryTable setUrl={setUrl} setResource={setResource} copyToClickboard={copyToClickboard} />,
        },
        {
            key: 'expressions',
            label: 'Expressions',
            children: <ExpressionsHistoryTable setExpression={setExpression} copyToClickboard={copyToClickboard} />,
        }
    ]} />
}

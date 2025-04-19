import moment from 'moment';
import { Space, Table, Tag, Button, Popconfirm } from 'antd';
import { RequestsHistoryItem, RequestHistoryTableProps } from './types';
import { DrawerButton } from '../../components/DrawerButton';
import Editor from '@monaco-editor/react';
import { getRequestsHistory } from './utils';

export function RequestsHistoryTable(props: RequestHistoryTableProps) {
  return (
    <Table<RequestsHistoryItem>
      columns={[
        {
          title: 'Date&Time',
          dataIndex: 'dateTime',
          render: (value) => moment(value).format('YYYY-MM-DD HH:mm:ss'),
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
          render: (status) => (
            <Tag color={status === 'success' ? 'green' : 'red'}>{status}</Tag>
          ),
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          render: (_, record) => (
            <Space size="small">
              <DrawerButton
                content={
                  <Editor
                    height="100vh"
                    defaultLanguage="json"
                    value={record.response}
                  />
                }
                button={<Button type="link">Show</Button>}
                title={`Response for the ${record.status} request: ${record.url}, made at ${record.dateTime}`}
                size="large"
                footer={
                  <Space size="small">
                    <Button
                      type="link"
                      onClick={() => props.setResource(record.response)}
                    >
                      Use response
                    </Button>
                  </Space>
                }
              />
              <Popconfirm
                title="Use this URL?"
                onConfirm={() => props.setUrl(record.url)}
              >
                <Button type="link">Use</Button>
              </Popconfirm>
              <Button
                type="link"
                onClick={() =>
                  props.copyToClickboard(
                    record.url,
                    'The URL has been copied',
                    'Error while copying the URL'
                  )
                }
              >
                Copy
              </Button>
            </Space>
          ),
        },
      ]}
      dataSource={getRequestsHistory() as RequestsHistoryItem[]}
      locale={{ emptyText: 'No request history yet.' }}
      pagination={{ pageSize: 10 }}
    />
  );
}

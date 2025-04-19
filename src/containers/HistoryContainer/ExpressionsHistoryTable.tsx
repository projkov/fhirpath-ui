import { Space, Table, Button } from 'antd';
import { ExpressionsHistoryItem, ExpressionsHistoryTableProps } from './types';
import { getExpressionsHistory } from './utils';

export function ExpressionsHistoryTable(props: ExpressionsHistoryTableProps) {
  return (
    <Table<ExpressionsHistoryItem>
      columns={[
        {
          title: 'Date&Time',
          dataIndex: 'dateTime',
        },
        {
          title: 'Expression',
          dataIndex: 'expression',
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (_, record) => (
            <Space size="middle">
              <Button
                type="link"
                onClick={() => props.setExpression(record.expression)}
              >
                Use
              </Button>
              <Button
                type="link"
                onClick={() =>
                  props.copyToClickboard(
                    record.expression,
                    'The FHIRPath expression has been copied',
                    'Error while copying the FHIRPath expression'
                  )
                }
              >
                Copy
              </Button>
            </Space>
          ),
        },
      ]}
      dataSource={getExpressionsHistory() as ExpressionsHistoryItem[]}
      locale={{ emptyText: 'No expression history yet.' }}
    />
  );
}

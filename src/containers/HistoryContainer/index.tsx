import { Tabs } from 'antd';
import { HistoryContainerProps } from './types';
import { RequestsHistoryTable } from './RequestsHistoryTable';
import { ExpressionsHistoryTable } from './ExpressionsHistoryTable';

export function HistoryContainer(props: HistoryContainerProps) {
    const { setResource, setUrl, setExpression, copyToClickboard } = props;

    return (
        <Tabs
            items={[
                {
                    key: 'requests',
                    label: 'Requests',
                    children: (
                        <RequestsHistoryTable
                            setUrl={setUrl}
                            setResource={setResource}
                            copyToClickboard={copyToClickboard}
                        />
                    ),
                },
                {
                    key: 'expressions',
                    label: 'Expressions',
                    children: (
                        <ExpressionsHistoryTable
                            setExpression={setExpression}
                            copyToClickboard={copyToClickboard}
                        />
                    ),
                },
            ]}
        />
    );
}

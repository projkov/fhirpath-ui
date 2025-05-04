import React from 'react';
import { Layout, Flex } from 'antd';
import { styles } from '../../styles';

interface AppContainerProps {
    header: React.ReactElement;
    content: React.ReactElement;
    footer: React.ReactElement;
}

export function AppContainer(props: AppContainerProps) {
    return (
        <Flex gap="middle" wrap>
            <Layout style={styles.layout}>
                {props.header}
                {props.content}
                {props.footer}
            </Layout>
        </Flex>
    );
}

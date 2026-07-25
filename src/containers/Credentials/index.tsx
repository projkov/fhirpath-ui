import { Typography, Space, Divider } from 'antd';
import { GithubOutlined, BugOutlined, LinkOutlined } from '@ant-design/icons';

const { Paragraph, Text, Link } = Typography;

export function CredentialsContainer() {
    return (
        <div>
            <Paragraph>
                This project is <Text strong>open-source</Text>, so you can <Text strong>use it however you like</Text>.
            </Paragraph>
            <Paragraph>
                The <Text strong>inspiration</Text> for this project came from my <Text strong>work tasks</Text>, where I spent a lot of time retrieving data from FHIR implementation guides using FHIRPath expressions.
            </Paragraph>
            <Paragraph>
                The project has been <Text strong>developed</Text> (or will be developed) entirely in my <Text strong>free time</Text>.
            </Paragraph>

            <Divider style={{ margin: '16px 0' }} />

            <Space orientation="vertical" size="small">
                <Link href="https://github.com/projkov/fhirpath-ui" target="_blank" rel="noreferrer">
                    <GithubOutlined /> Source on GitHub
                </Link>
                <Link href="https://github.com/projkov/fhirpath-ui/issues" target="_blank" rel="noreferrer">
                    <BugOutlined /> Report an issue or suggest an idea
                </Link>
                <Link href="https://projkov.github.io" target="_blank" rel="noreferrer">
                    <LinkOutlined /> About me
                </Link>
            </Space>

            <Divider style={{ margin: '16px 0' }} />

            <Paragraph type="secondary">
                Best regards,<br />
                Pavel Rozhkov from beda.software
            </Paragraph>
        </div>
    )
}

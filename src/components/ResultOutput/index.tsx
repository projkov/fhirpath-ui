import { List } from 'antd';
import './styles.css';

interface ResultOutputProps {
  resultItems: any[];
}

export function ResultOutput(props: ResultOutputProps) {
  const { resultItems } = props;

  if (resultItems.length === 0) {
    return null;
  }

  return (
    <div className="resultOutputContainer">
      <List
        size="small"
        dataSource={resultItems}
        renderItem={(item) => (
          <List.Item>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </List.Item>
        )}
      />
    </div>
  );
}

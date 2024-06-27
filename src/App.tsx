import React from 'react';
import './App.css';
import { useFHIRPathUI } from './hooks';
import Editor from '@monaco-editor/react';
import { Allotment } from "allotment";
import "allotment/dist/style.css";

const App: React.FC = () => {
  const { url, handleUrlChange, handleFetch,
    resource, expression, setExpression, setResource,
    handleExecute, result, handleShare, shareLink } = useFHIRPathUI();

  return (
    <div className="App" style={{ height: '100vh' }}>
      <Allotment defaultSizes={[550, 250]}>
        <div>
          <div>
            <input type="text" value={url} onChange={handleUrlChange} />
            <button onClick={handleFetch}>Get</button>
          </div>
          <div>
            <Editor height="30vh" defaultLanguage="json" value={resource} onChange={(value) => setResource(value as string)} />
          </div>
        </div>
        <div style={{ height: '100vh' }}>
          <Allotment defaultSizes={[100,300]} vertical>
            <div>
              <div>
                <Editor height="30vh" defaultLanguage="ruby" value={expression} onChange={(value) => setExpression(value as string)} />
                <button onClick={handleExecute}>Execute</button>
              </div>
            </div>
            <div>
              <Editor height="30vh" defaultLanguage="json" value={result} />
              <button onClick={handleShare}>Share</button>
              {shareLink && <p>Shareable link: <a href={shareLink}>{shareLink}</a></p>}
            </div>
          </Allotment>
        </div>
      </Allotment>
    </div>
  );
};

export default App;

import React from 'react';
import './App.css';
import { useFHIRPathUI } from './hooks';
import Editor from '@monaco-editor/react';

const App: React.FC = () => {
  const { url, handleUrlChange, handleFetch, handleResourceChange,
    handleExpressionChange, resource, expression,
    handleExecute, result, handleShare, shareLink } = useFHIRPathUI();

  return (
    <div className="App">
      <div>
        <label>
          URL:
          <input type="text" value={url} onChange={handleUrlChange} />
        </label>
        <button onClick={handleFetch}>Get</button>
      </div>
      <div>
        <label>
          Resource:
          <Editor height="30vh" defaultLanguage="json" value={resource} onChange={() => handleResourceChange}/>
        </label>
      </div>
      <div>
        <label>
          Expression:
          <Editor height="30vh" defaultLanguage="ruby" value={expression} onChange={() => handleExpressionChange}/>
        </label>
        <button onClick={handleExecute}>Execute</button>
      </div>
      <div>
        <label>
          Result:
          <Editor height="30vh" defaultLanguage="json" value={result} />
        </label>
      </div>
      <div>
        <button onClick={handleShare}>Share</button>
        {shareLink && <p>Shareable link: <a href={shareLink}>{shareLink}</a></p>}
      </div>
    </div>
  );
};

export default App;

import React from 'react';
import './App.css';
import { useFHIRPathUI } from './hooks';

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
          <textarea value={resource} onChange={handleResourceChange} rows={10} cols={50} />
        </label>
      </div>
      <div>
        <label>
          Expression:
          <input type="text" value={expression} onChange={handleExpressionChange} />
        </label>
        <button onClick={handleExecute}>Execute</button>
      </div>
      <div>
        <label>
          Result:
          <textarea value={result} readOnly rows={10} cols={50} />
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

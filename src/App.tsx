import React from 'react';
import './App.css';
import { useFHIRPathUI } from './hooks';
import Editor from '@monaco-editor/react';
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faPlay, faDownload } from '@fortawesome/free-solid-svg-icons';

const App: React.FC = () => {
  const { url, handleUrlChange, handleFetch,
    resource, expression, setExpression, setResource,
    handleExecute, result, handleShare } = useFHIRPathUI();

  return (
    <div className="App">
      <Allotment defaultSizes={[550, 250]}>
        <>
          <div className="resourceBlock">
            <input className="input" type="url" value={url} onChange={handleUrlChange} />
            <button onClick={handleFetch}> <FontAwesomeIcon icon={faDownload} /></button>
          </div>
          <Editor height="100vh" defaultLanguage="json" value={resource} onChange={(value) => setResource(value as string)} />
        </>
        <div style={{ height: '100vh' }}>
          <Allotment defaultSizes={[100, 300]} vertical>
            <Editor defaultLanguage="javascript" value={expression} onChange={(value) => setExpression(value as string)} />
            <Editor defaultLanguage="json" value={result} />
          </Allotment>
        </div>
      </Allotment>
      <div className="buttonsBlock">
        <button onClick={handleExecute}><FontAwesomeIcon icon={faPlay} /></button>
        <button onClick={handleShare}><FontAwesomeIcon icon={faShare} /></button>
      </div>
    </div>
  );
};

export default App;

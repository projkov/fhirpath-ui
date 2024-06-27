import React from 'react';
import './App.css';
import { useFHIRPathUI } from './hooks';
import Editor from '@monaco-editor/react';
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { Play, ShareFat, FileArrowDown } from "@phosphor-icons/react";
import Loader from './components/loader';

const App: React.FC = () => {
  const { url, handleUrlChange, handleFetch,
    resource, expression, setExpression, setResource,
    handleExecute, result, handleShare, isLoading } = useFHIRPathUI();

  return (
    <div className="App">
      {isLoading ? <Loader /> : null}
      <Allotment defaultSizes={[550, 250]}>
        <>
          <div className="resourceBlock">
            <input className="input" type="url" value={url} onChange={handleUrlChange} />
            <button onClick={handleFetch}><FileArrowDown fontSize={24}/></button>
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
        <button onClick={handleExecute}><Play fontSize={24} /></button>
        <button onClick={handleShare}><ShareFat fontSize={24} /></button>
      </div>
    </div>
  );
};

export default App;

import React from 'react';
import './App.css';
import { useFHIRPathUI } from './hooks';
import Editor from '@monaco-editor/react';
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { Play, ShareFat, FileArrowDown } from "@phosphor-icons/react";
import Loader from './components/loader';
import logo from './assets/logo.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ResultOutput } from './components/ResultOutput';
import { WeeklyPopup } from './components/WeeklyPopup';

const App: React.FC = () => {
  const { url, handleUrlChange, handleFetch,
    resource, expression, setExpression, setResource,
    handleExecute, result, handleShare, isLoading, isExecuteActive, isGetResourceActive, isShareActive } = useFHIRPathUI();

  return (
    <div className="App">
      {isLoading ? <Loader /> : null}
      <WeeklyPopup />
      <div className='header'>
        <img src={logo} alt="Logo" className='logo' />
        <div className='searchBlock'>
          <input className="input" type="url" value={url} onChange={handleUrlChange} placeholder='You can paste the URL to get the FHIR Resource' />
        </div>
        <div className="buttonsBlock">
          <button onClick={() => handleFetch(url)} disabled={!isGetResourceActive}><FileArrowDown fontSize={24} /></button>
          <button onClick={() => handleExecute(resource, expression)} disabled={!isExecuteActive}><Play fontSize={24} /></button>
          <button onClick={handleShare} disabled={!isShareActive}><ShareFat fontSize={24} /></button>
        </div>
      </div>
      <div className='editor'>
        <Allotment defaultSizes={[550, 250]}>
          <div className='editorWrapper'>
            <Editor height="100vh" defaultLanguage="json" value={resource} onChange={(value) => setResource(value as string)} options={{ formatOnPaste: true, formatOnType: true }} />
          </div>
          <div style={{ height: '100vh' }}>
            <Allotment defaultSizes={[100, 300]} vertical>
              <div className='editorWrapper'>
                <Editor defaultLanguage="ruby" value={expression} onChange={(value) => setExpression(value as string)} options={{
                  formatOnPaste: true, formatOnType: true, minimap: {
                    enabled: false,
                  },
                }} />
              </div>
              <ResultOutput resultItems={result} />
            </Allotment>
          </div>
        </Allotment>
      </div>
      <div className='footer'>
        <p><a href="https://github.com/projkov/fhirpath-ui" target="_blank" rel="noopener noreferrer">Source Code</a></p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;

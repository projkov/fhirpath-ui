import React, { useState } from 'react';
import './App.css';
import { useFHIRPathUI } from './hooks';
import Editor from '@monaco-editor/react';
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { Play, ShareFat, FileArrowDown, Info } from "@phosphor-icons/react";
import Loader from './components/loader';
import { Modal } from './components/Modal';
import logo from './assets/logo.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ResultOutput } from './components/ResultOutput';

const App: React.FC = () => {
  const { url, handleUrlChange, handleFetch,
    resource, expression, setExpression, setResource,
    handleExecute, result, handleShare, isLoading, isExecuteActive, isGetResourceActive, isShareActive } = useFHIRPathUI();
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);

  return (
    <div className="App">
      <div className='infoButton'>
        <button onClick={() => setInfoModalOpen(true)}><Info fontSize={24} /></button>
      </div>
      {isLoading ? <Loader /> : null}
      <Modal show={infoModalOpen} onClose={() => setInfoModalOpen(false)}>
        <div className='infoContent'>
          <h1>Open source UI for the FHIRPath expression</h1>
          <p><a href="https://github.com/projkov/fhirpath-ui" target="_blank" rel="noreferrer">GitHub Repo</a></p>
          <p>Developed by <a href="https://github.com/projkov" target="_blank" rel="noreferrer">Pavel Rozhkov</a></p>
          <p><a href="https://github.com/beda-software/fhirpath-py" target="_blank" rel="noreferrer">FHIRPath</a> engine developed by <a href="https://beda.software" target="_blank" rel="noreferrer">Beda Software</a></p>
        </div>
      </Modal>
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
                <Editor defaultLanguage="ruby" value={expression} onChange={(value) => setExpression(value as string)} options={{ formatOnPaste: true, formatOnType: true }} />
              </div>
              <ResultOutput resultItems={result} />
            </Allotment>
          </div>
        </Allotment>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;

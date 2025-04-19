import React, { useState, useEffect } from 'react';
import './App.css';
import { useFHIRPathUI } from './hooks';
import Editor from '@monaco-editor/react';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import {
    Play,
    ShareFat,
    FileArrowDown,
    Gear,
    Copy,
    Info,
    ClockCounterClockwise,
} from '@phosphor-icons/react';
import Loader from './components/loader';
import logo from './assets/logo.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ResultOutput } from './components/ResultOutput';
import { DrawerButton } from './components/DrawerButton';
import { SettingsContainer } from './containers/Settings';
import { CredentialsContainer } from './containers/Credentials';
import { HistoryContainer } from './containers/HistoryContainer';

const App: React.FC = () => {
    const {
        url,
        setUrl,
        handleUrlChange,
        handleFetch,
        resource,
        expression,
        setExpression,
        setResource,
        handleExecute,
        result,
        handleShare,
        isLoading,
        isExecuteActive,
        isGetResourceActive,
        isShareActive,
        handleShareResult,
        isShareResultActive,
        copyToClipboard,
    } = useFHIRPathUI();

    return (
        <div className="App">
            {isLoading ? <Loader /> : null}
            <div className="header">
                <img src={logo} alt="Logo" className="logo" />
                <div className="searchBlock">
                    <input
                        className="input"
                        type="url"
                        value={url}
                        onChange={handleUrlChange}
                        placeholder="You can paste the URL to get the FHIR Resource"
                    />
                </div>
                <div className="buttonsBlock">
                    <button
                        onClick={() => handleFetch(url)}
                        disabled={!isGetResourceActive}
                    >
                        <FileArrowDown fontSize={24} />
                    </button>
                    <button
                        onClick={() => handleExecute(resource, expression)}
                        disabled={!isExecuteActive}
                    >
                        <Play fontSize={24} />
                    </button>
                    <DrawerButton
                        content={
                            <HistoryContainer
                                setResource={setResource}
                                setUrl={setUrl}
                                setExpression={setExpression}
                                copyToClickboard={copyToClipboard}
                            />
                        }
                        button={
                            <button>
                                <ClockCounterClockwise fontSize={24} />
                            </button>
                        }
                        title="History"
                        size="large"
                    />
                    <button onClick={handleShare} disabled={!isShareActive}>
                        <ShareFat fontSize={24} />
                    </button>
                    <button
                        onClick={handleShareResult}
                        disabled={!isShareResultActive}
                    >
                        <Copy fontSize={24} />
                    </button>
                    <DrawerButton
                        content={<SettingsContainer />}
                        button={
                            <button>
                                <Gear fontSize={24} />
                            </button>
                        }
                        title="Settings"
                        size="large"
                    />
                    <DrawerButton
                        content={<CredentialsContainer />}
                        button={
                            <button>
                                <Info fontSize={24} />
                            </button>
                        }
                        title="Credentials"
                    />
                </div>
            </div>
            <div className="editor">
                <Allotment defaultSizes={[550, 250]}>
                    <div className="editorWrapper">
                        <Editor
                            height="100vh"
                            defaultLanguage="json"
                            value={resource}
                            onChange={(value) => setResource(value as string)}
                            options={{
                                formatOnPaste: true,
                                formatOnType: true,
                            }}
                        />
                    </div>
                    <div style={{ height: '100vh' }}>
                        <Allotment defaultSizes={[100, 300]} vertical>
                            <div className="editorWrapper">
                                <Editor
                                    defaultLanguage="ruby"
                                    value={expression}
                                    onChange={(value) =>
                                        setExpression(value as string)
                                    }
                                    options={{
                                        formatOnPaste: true,
                                        formatOnType: true,
                                        minimap: {
                                            enabled: false,
                                        },
                                    }}
                                />
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

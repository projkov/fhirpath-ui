import React from 'react';
import { AppHeader } from './containers/AppHeader';
import { AppContainer } from './containers/AppContainer';
import { AppContent } from './containers/AppContent';

const App: React.FC = () => {
    return (
        <AppContainer
            header={<AppHeader />}
            content={<AppContent />}
        />
    );
};

export default App;

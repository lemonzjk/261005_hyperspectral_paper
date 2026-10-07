import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import HyperspectralLibrary from './HyperspectralLibrary';
import './styles.css';
import './atlas-overview.css';
import './design-system.css';
import './hyperspectral-library.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode>{new URLSearchParams(window.location.search).get('collection') === 'hyperspectral' ? <HyperspectralLibrary/> : <App/>}</React.StrictMode>);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App language={"en"} apiBase={"http://192.168.1.144:61975/api/episerver/v1.0"} />, document.getElementById('container'));
registerServiceWorker();

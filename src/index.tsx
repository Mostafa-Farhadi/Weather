import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './pages/Weather';
import store from './redux/store';
import { Provider } from 'react-redux';
import './style/global.scss';

export default function App() {
    return (
        <Provider store={store}>
            <Weather />
        </Provider>
    );
};


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

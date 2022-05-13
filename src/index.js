import React from 'react';
import ReactDOM from 'react-dom';
import {
    QueryClient,
    QueryClientProvider,
} from "react-query";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AccountContextProvider from './shared/AccountContextProvider';
import OptionroomThemeContextProvider from './shared/OptionroomThemeContextProvider';
import SmartContractsContext from './shared/SmartContractsContextProvider';

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <OptionroomThemeContextProvider>
                <AccountContextProvider>
                    <SmartContractsContext>
                        <App/>
                    </SmartContractsContext>
                </AccountContextProvider>
            </OptionroomThemeContextProvider>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

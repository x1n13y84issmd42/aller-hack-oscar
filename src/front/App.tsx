import './index.html';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'

import Router from './routes/Router';
import Store, { history } from './stores/Main';
import Layout from './components/layout/Main';

class Main extends React.Component {
    render(): JSX.Element {
        return (
            <Provider store={Store}>
                <ConnectedRouter history={history}>
                    <Layout>
                        <Router />
                    </Layout>
                </ConnectedRouter>
            </Provider>
        );
    }
}

const rootContainer: HTMLElement = document.getElementById('app');
ReactDOM.render(
    <Main />,
    rootContainer
);
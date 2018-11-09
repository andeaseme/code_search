import * as React from 'react';
import { render } from 'react-dom';

import { Provider } from 'mobx-react';

import 'material-design-icons/iconfont/material-icons.css';
import 'typeface-roboto/index.css';

import { ElasticSearch } from './apps/elasticsearch';
import AppState from './appState';

import './styles.scss';

window.addEventListener('error', (event: ErrorEvent) => {
    console.log('window error', event);
});

class App extends React.Component<any, any> {
    appState: AppState;

    constructor(props: any) {
        super(props);

        this.appState = new AppState();
    }

    render() {
        console.log({ history });
        return (
            <Provider
                appState={this.appState}
            >
                <ElasticSearch />
            </Provider>
        );
    }
}

render(<App />, document.getElementById('root'));

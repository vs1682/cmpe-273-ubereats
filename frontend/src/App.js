import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';

import store from './store';
import AppRouter from './Routes/index';

const engine = new Styletron();

export default function Hello() {
  return (
    <Provider store={store}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <Router>
            <AppRouter />
          </Router>
        </BaseProvider>
      </StyletronProvider>
    </Provider>
  );
}

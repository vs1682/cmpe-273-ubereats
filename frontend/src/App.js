import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';

import AppRouter from './Routes/index';

import SignIn from './Organisms/SignIn';

const engine = new Styletron();

export default function Hello() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <AppRouter />
      </BaseProvider>
    </StyletronProvider>
  );
}

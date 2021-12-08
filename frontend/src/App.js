import React from "react";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { CartProvider } from "react-use-cart";
import { SnackbarProvider } from "baseui/snackbar";

import store from "./store";
import AppRouter from "./Routes/index";
import { API_URL } from "./utils/constants";

const engine = new Styletron();

const apolloClient = new ApolloClient({
  uri: `${API_URL}/api/graphql`,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <StyletronProvider value={engine}>
          <BaseProvider theme={LightTheme}>
            <SnackbarProvider>
              <CartProvider>
                <Router>
                  <AppRouter />
                </Router>
              </CartProvider>
            </SnackbarProvider>
          </BaseProvider>
        </StyletronProvider>
      </Provider>
    </ApolloProvider>
  );
}

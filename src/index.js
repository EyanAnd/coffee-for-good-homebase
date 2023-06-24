import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import store from './redux/store';
import theme from './components/ChakraStyles/Themes';
import { extendTheme } from "@chakra-ui/react"
import App from './components/App';

ReactDOM.render(
  <ChakraProvider theme={theme}>
  <Provider store={store}>
    <App />
  </Provider>
  </ChakraProvider>,
  document.getElementById('react-root'),
);

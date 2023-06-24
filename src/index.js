import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './components/App';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.render(
  <ChakraProvider>
  <Provider store={store}>
    <App />
  </Provider>
  </ChakraProvider>,
  document.getElementById('react-root'),
);

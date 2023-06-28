import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './components/App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/montserrat'

// create color theme
const colors = {
  brand: {
    100: '#DDC6A6',
    200: '#E9DCCF',
    300: '#9e6b42',
    400: '#858a7a',
    500: 'rgb(43, 60, 87)',
  },
}

const fonts = {
  heading: 'Archivo-Black',
  body: `'Montserrat', sans-serif`,
}
// initalize theme
const theme = extendTheme({ 
  colors,
  fonts 
})


ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>,
  document.getElementById('react-root'),
);

import React from 'react';
import { Provider } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment-timezone';
import styled from '@emotion/styled';
import { ThemeProvider } from 'styled-components';
import store from './redux/store';
import AppLayout from './components/layout/AppLayout';
import { GlobalStyle } from './GlobalStyle';
import theme from './styles/theme';

moment.tz.setDefault('Europe/Paris');

const Wrapper = styled.div`
  width: 1440px;
  margin: 0 auto;
`;
function App() {
  return (
    <Wrapper>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AppLayout />
        </ThemeProvider>
      </Provider>
    </Wrapper>
  );
}

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment-timezone';
import { ConfigProvider, theme } from 'antd';
import styled from '@emotion/styled';
import store from './redux/store';
import AppLayout from './components/layout/AppLayout';
// moment.locale('fr');
moment.tz.setDefault('Europe/Paris');

const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#19252a',
        },
        components: {
          Button: {
            colorPrimary: 'transparent',
            borderRadius: 4,
          },
        },
        hashed: false,
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Wrapper>
        <Provider store={store}>
          <AppLayout />
        </Provider>
      </Wrapper>
    </ConfigProvider>
  );
}

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment-timezone';
import { ConfigProvider } from 'antd';
import store from './redux/store';
import AppLayout from './components/AppLayout';
// moment.locale('fr');
moment.tz.setDefault('Europe/Paris');

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
        hashed: false,
      }}
    >
      <div className="App">
        <Provider store={store}>
          <AppLayout />
        </Provider>
      </div>
    </ConfigProvider>
  );
}

export default App;

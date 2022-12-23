import React from 'react';
import { Provider } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment-timezone';
import store from './redux/store';
import AppLayout1 from './components/AppLayout1';

// moment.locale('fr');
moment.tz.setDefault('Europe/Paris');

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppLayout1 />
        {/* <Router>
          <Route path="/">
            <AnalyticsComponent>
              <AppLayout />
            </AnalyticsComponent>
          </Route>
        </Router> */}
      </Provider>
    </div>
  );
}

export default App;

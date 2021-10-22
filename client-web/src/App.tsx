import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { AppRouter } from './routers/AppRouter';
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistedStore} from './store/store';
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <AppRouter />
      </PersistGate> 
    </Provider>
  );
}

export default App;

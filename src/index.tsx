import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { ConsumerContext } from './router/context-provider'

import { persistor, store } from '@Store/storeConfig';
import { PersistGate } from 'redux-persist/integration/react';


const envisionContainer = document.getElementById('root')
const root = ReactDOM.createRoot(envisionContainer)
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConsumerContext>
        <App />
      </ConsumerContext>
    </PersistGate>
  </Provider>
)

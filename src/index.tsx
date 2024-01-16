import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { ConsumerContext } from './router/context-provider'

import { persistor, store } from '@Store/storeConfig';
import { PersistGate } from 'redux-persist/integration/react';


const benchWickContainer = document.getElementById('root')
const root = ReactDOM.createRoot(benchWickContainer)
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConsumerContext>
        <App />
      </ConsumerContext>
    </PersistGate>
  </Provider>
)

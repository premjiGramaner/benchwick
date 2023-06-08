import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from '@Store/storeConfig'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'

const eagleContainer = document.getElementById('root')
const root = ReactDOM.createRoot(eagleContainer)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

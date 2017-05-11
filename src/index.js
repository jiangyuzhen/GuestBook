import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import reducer from './reducers'
import 'antd/dist/antd.css'
import 'todomvc-app-css/index.css'
import './lib/index.css'

const store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

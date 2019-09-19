import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

// Routes app index
import App from '_routes'
import reducers from '_reducers'

let store
if (process.env.NODE_ENV === 'development') {
  // Including redux tools only in dev mode
  store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(reduxThunk)),
  )
} else {
  store = createStore(reducers, applyMiddleware(reduxThunk))
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('REACT_APP_ROOT_FOR_RENDER'),
)

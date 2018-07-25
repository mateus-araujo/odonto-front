import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { persistStore } from 'redux-persist'
import ReduxThunk from 'redux-thunk'

import persistedReducer from './reducers'

const history = createBrowserHistory()

const store = createStore(connectRouter(history)(persistedReducer), 
  {},
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      ReduxThunk // ... other middlewares ...
    ),
  ),
)

const persistor = persistStore(store)

export { store, persistor, history }

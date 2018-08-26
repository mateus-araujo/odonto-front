import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import AuthReducer from './AuthReducer'
import MainReducer from './MainReducer'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
}

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['email', 'user', 'userName', 'token', 'isAuthenticated']
}

const mainPersistConfig = {
  key: 'main',
  storage: storage
}

const rootReducer =  combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  main: persistReducer(mainPersistConfig, MainReducer),
})

export default persistReducer(rootPersistConfig, rootReducer)

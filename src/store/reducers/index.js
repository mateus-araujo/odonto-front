import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import AuthReducer from './AuthReducer'
import HomeReducer from './HomeReducer'

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

const homePersistConfig = {
  key: 'auth',
  storage: storage
}

const rootReducer =  combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  home: persistReducer(homePersistConfig, HomeReducer),
})

export default persistReducer(rootPersistConfig, rootReducer)

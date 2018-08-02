import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import AuthReducer from './AuthReducer'
import HomeReducer from './HomeReducer'
// import EmployeeFormReducer from './EmployeeFormReducer'
// import EmployeeReducer from './EmployeeReducer'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
}

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['email', 'user', 'token', 'isAuthenticated']
}

const rootReducer =  combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  home: HomeReducer
  // employeeForm: EmployeeFormReducer,
  // employees: EmployeeReducer
})

export default persistReducer(rootPersistConfig, rootReducer)

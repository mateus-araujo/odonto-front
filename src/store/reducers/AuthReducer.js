import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_TOKEN_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD
} from '../actions/types'

export const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  token: null,
  error: null,
  loading: false,
  isAuthenticated: false
}

const AuthReducer = (state = INITIAL_STATE, action) => {
  console.log(action)

  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload }
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload }
    case LOGIN_USER:
      return { ...state, loading: true, error: '' }
    case FORGOT_PASSWORD:
      return { ...state, loading: false, error: '' }
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, isAuthenticated: true }
    case LOGIN_TOKEN_SUCCESS:
      return { ...state, ...INITIAL_STATE, token: action.payload, isAuthenticated: true }
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload, password: '', loading: false, isAuthenticated: false }
    case LOGOUT_USER:
      return { ...state, ...INITIAL_STATE }
    default:
      return state
  }
}

export default AuthReducer

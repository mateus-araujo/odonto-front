import { push } from 'connected-react-router'
import axios from 'axios'
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  FORGOT_PASSWORD,
  LOGIN_TOKEN_SUCCESS,
  LOGOUT_USER
} from './types'

const api = axios.create({
  baseURL: 'http://localhost:3333',
})

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })

    api.post('/auth/login', {
      email,
      password,
    })
      .then(response => {
        const { token, user } = response.data

        loginUserSucess(dispatch, user)
        loginTokenSucess(dispatch, token)

        dispatch(push('/home'))
      })
      .catch(({ response }) => {
        let { error } = response.data

        if (error === 'User not found')
          error = 'Usuário não encontrado'
        if (error === 'Invalid password')
          error = 'Senha inválida'

        loginUserFail(dispatch, error)
      })
  }
}

export const forgotPassword = ({ email }) => {
  return (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD })

    console.log(email)
  }
}

const loginUserFail = (dispatch, error) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: error
  })
}

const loginUserSucess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  })
}

const loginTokenSucess = (dispatch, token) => {
  dispatch({
    type: LOGIN_TOKEN_SUCCESS,
    payload: token
  })
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER })

    dispatch(push('/'))
  }
}

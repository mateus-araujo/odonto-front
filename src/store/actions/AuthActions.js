import { push } from 'connected-react-router'
import axios from 'axios'
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_TOKEN_SUCCESS,
  LOGIN_USER_FAIL,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  USER_CLEAN,
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

        loginUserSuccess(dispatch, user)
        loginTokenSuccess(dispatch, token)

        dispatch(push('/'))
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

    api.post('/auth/forgot_password', {
      email
    })
      .then(() => {
        const message = 'Um email será enviado com um link para recuperação de senha'

        forgotPasswordSuccess(dispatch, message)
      })
      .catch(({ response }) => {
        let { error } = response.data

        if (error === 'User not found')
          error = 'Usuário não encontrado'
        else if (error === 'Cannot send forgot password email')
          error = 'Não foi possível enviar o email, tente novamente mais tarde'
        else
          error = 'Erro no servidor'

        forgotPasswordFail(dispatch, error)
      })
  }
}

export const resetPassword = ({ email, password, r_password, token }) => {
  return (dispatch) => {
    dispatch({ type: RESET_PASSWORD })

    if (password !== r_password) {
      const error = 'Senhas diferentes'

      resetPasswordFail(dispatch, error)

      return
    }

    api.post('/auth/reset_password', {
      email,
      password,
      token
    })
      .then(() => {
        const message = 'Sua nova senha foi salva'

        resetPasswordSuccess(dispatch, message)
      })
      .catch(({ response }) => {
        let { error } = response.data

        if (error === 'User not found')
          error = 'Endereço inválido'
        else if (error === 'Token invalid')
          error = 'Endereço inválido'
        else if (error === 'Token expired, generate a new one')
          error = 'Sessão expirada, favor requisitar a repuração de senha novamente'
        else
          error = 'Erro no servidor'

        forgotPasswordFail(dispatch, error)
      })

  }
}

const loginUserFail = (dispatch, error) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: error
  })
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  })
}

const loginTokenSuccess = (dispatch, token) => {
  dispatch({
    type: LOGIN_TOKEN_SUCCESS,
    payload: token
  })
}

const forgotPasswordSuccess = (dispatch, message) => {
  dispatch({
    type: FORGOT_PASSWORD_SUCCESS,
    payload: message
  })
}

const forgotPasswordFail = (dispatch, error) => {
  dispatch({
    type: FORGOT_PASSWORD_FAIL,
    payload: error
  })
}

const resetPasswordSuccess = (dispatch, message) => {
  dispatch({
    type: RESET_PASSWORD_SUCCESS,
    payload: message
  })
}

const resetPasswordFail = (dispatch, error) => {
  dispatch({
    type: RESET_PASSWORD_FAIL,
    payload: error
  })
}

export const userClean = () => {
  return (dispatch) => {
    dispatch({ type: USER_CLEAN })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER })

    dispatch(push('/login'))
  }
}

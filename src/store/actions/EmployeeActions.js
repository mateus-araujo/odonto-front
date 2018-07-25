import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_CLEAN
} from './types'

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  }
}

export const employeeClean = () => {
  return {
    type: EMPLOYEE_CLEAN
  }
}

export const employeeCreate = ({ name, phone, shift }) => {
  // const { currentUser } = firebase.auth()

  return (dispatch) => { }
}

export const employeesFetch = () => {
  // const { currentUser } = firebase.auth()

  return (dispatch) => { }
}

export const employeeSave = ({ name, phone, shift, uid }) => {
  // const { currentUser } = firebase.auth()

  return (dispatch) => { }
}

export const employeeDelete = ({ uid }) => {
  // const { currentUser } = firebase.auth()

  return () => { }
}

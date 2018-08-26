import { push } from 'connected-react-router'
import {
  OPEN_MESSAGES_INBOX,
  OPEN_MESSAGES_SENT,
  OPEN_MESSAGES_ARCHIVED,
  OPEN_TASKS_INBOX,
  OPEN_TASKS_SENT,
  OPEN_TASKS_ARCHIVED,
  OPEN_TRAININGS,

  OPEN_MANAGE_TRAININGS,
  OPEN_MANAGE_GROUPS,
  OPEN_MANAGE_EMPLOYEES,
  OPEN_MANAGE_ROLES
} from './types'

export const openMessagesInbox = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_MESSAGES_INBOX })

    dispatch(push('/'))
  }
}

export const openMessagesSent = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_MESSAGES_SENT })

    dispatch(push('/messages/sent'))
  }
}

export const openMessagesArchived = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_MESSAGES_ARCHIVED })

    dispatch(push('/messages/archived'))
  }
}

export const openTasksInbox = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_TASKS_INBOX })

    dispatch(push('/tasks'))
  }
}

export const openTasksSent = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_TASKS_SENT })

    dispatch(push('/tasks/sent'))
  }
}

export const openTasksArchived = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_TASKS_ARCHIVED })

    dispatch(push('/tasks/archived'))
  }
}

export const openTrainings = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_TRAININGS })

    dispatch(push('/trainings'))
  }
}

/* MANAGEMENT  */

export const openManageTranings = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_MANAGE_TRAININGS })

    dispatch(push('/management/trainings'))
  }
}

export const openManageGroups = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_MANAGE_GROUPS })

    dispatch(push('/management/groups'))
  }
}

export const openManageEmployees = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_MANAGE_EMPLOYEES })

    dispatch(push('/management/employees'))
  }
}

export const openManageRoles = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_MANAGE_ROLES })

    dispatch(push('/management/roles'))
  }
}
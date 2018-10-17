import { push } from 'connected-react-router'
import {
  OPEN_CREATE_MESSAGE,
  OPEN_SHOW_MESSAGE,
  OPEN_MESSAGES_INBOX,
  OPEN_MESSAGES_SENT,
  OPEN_MESSAGES_ARCHIVED,
  
  OPEN_CREATE_TASK,
  OPEN_SHOW_TASK,
  OPEN_TASKS_INBOX,
  OPEN_TASKS_SENT,
  OPEN_TASKS_ARCHIVED,

  OPEN_TRAININGS,
  OPEN_SHOW_TRAINING_VIDEO,

  OPEN_MANAGE_TRAININGS,
  OPEN_MANAGE_GROUPS,
  OPEN_MANAGE_EMPLOYEES,
  OPEN_MANAGE_ROLES,

  OPEN_CREATE_ROLE,
  OPEN_CREATE_EMPLOYEE,
  OPEN_CREATE_GROUP,
  OPEN_CREATE_TRAINING
} from './types'

export const openCreateMessage = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_CREATE_MESSAGE })

    dispatch(push('/messages/create'))
  }
}

export const openShowMessage = ({ message_id }) => {
  return (dispatch) => {
    dispatch({ type: OPEN_SHOW_MESSAGE })

    dispatch(push(`/message/${message_id}`))
  }
}

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

/* TASKS */

export const openCreateTask = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_CREATE_TASK })

    dispatch(push('/tasks/create'))
  }
}

export const openShowTask = ({ task_id }) => {
  return (dispatch) => {
    dispatch({ type: OPEN_SHOW_TASK })

    dispatch(push(`/task/${task_id}`))
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

/* TRAININGS  */

export const openTrainings = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_TRAININGS })

    dispatch(push('/trainings'))
  }
}

export const openShowTrainingVideo = ({ training_id }) => {
  return (dispatch) => {
    dispatch({ type: OPEN_SHOW_TRAINING_VIDEO })

    dispatch(push(`/training/${training_id}`))
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

/* MANAGEMENT */

export const openCreateRole = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_CREATE_ROLE })

    dispatch(push('/management/roles/create'))
  }
}

export const openCreateEmployee = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_CREATE_EMPLOYEE })

    dispatch(push('/management/employees/create'))
  }
}

export const openCreateGroup = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_CREATE_GROUP })

    dispatch(push('/management/groups/create'))
  }
}

export const openCreateTraining = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_CREATE_TRAINING })

    dispatch(push('/management/trainings/create'))
  }
}


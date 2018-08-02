import { push } from 'connected-react-router'
import {
  OPEN_MESSAGES_INBOX,
  OPEN_MESSAGES_SENT,
  OPEN_MESSAGES_ARCHIVED,
  OPEN_TASKS_INBOX,
  OPEN_TASKS_ARCHIVED,
  OPEN_TRAININGS
} from './types'

export const openMessagesInbox = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_MESSAGES_INBOX })

    dispatch(push('/home/messages'))
  }
}

export const openMessagesSent = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_MESSAGES_SENT })

    dispatch(push('/'))
  }
}

export const openMessagesArchived = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_MESSAGES_ARCHIVED })

    dispatch(push('/home'))
  }
}

export const openTasksInbox = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_TASKS_INBOX })

    dispatch(push('/home/tasks'))
  }
}

export const openTasksArchived = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_TASKS_ARCHIVED })

    dispatch(push('/home'))
  }
}

export const openTrainings = () => {
  return (dispatch) => {
    dispatch({ type: OPEN_TRAININGS })

    dispatch(push('/home'))
  }
}

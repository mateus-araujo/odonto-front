import {
  OPEN_MESSAGES_INBOX,
  OPEN_MESSAGES_SENT,
  OPEN_MESSAGES_ARCHIVED,
  OPEN_TASKS_INBOX,
  OPEN_TASKS_ARCHIVED,
  OPEN_TRAININGS
} from '../actions/types'

export const INITIAL_STATE = {
  title: '',
  messagesInbox: false,
  messagesSent: false,
  messagesArchived: false,
  tasksInbox: false,
  tasksArchived: false,
  trainings: false
}

const HomeReducer = (state = INITIAL_STATE, action) => {
  console.log(action)

  switch (action.type) {
    case OPEN_MESSAGES_INBOX:
      return { ...state, ...INITIAL_STATE, messagesInbox: true, title: 'Caixa de entrada' }
    case OPEN_MESSAGES_SENT:
      return { ...state, ...INITIAL_STATE, messagesSent: true, title: 'Mensagens enviadas' }
    case OPEN_MESSAGES_ARCHIVED:
      return { ...state, ...INITIAL_STATE, messagesArchived: true, title: 'Mensagens arquivadas' }
    case OPEN_TASKS_INBOX:
      return { ...state, ...INITIAL_STATE, tasksInbox: true, title: 'Tarefas - Caixa de entrada' }
    case OPEN_TASKS_ARCHIVED:
      return { ...state, ...INITIAL_STATE, tasksArchived: true, title: 'Tarefas - Arquivadas' }
    case OPEN_TRAININGS:
      return { ...state, ...INITIAL_STATE, trainings: true, title: 'Treinamentos' }
    default:
      return state
  }
}

export default HomeReducer

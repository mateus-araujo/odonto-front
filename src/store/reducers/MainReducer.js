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
  OPEN_MANAGE_ROLES,

  OPEN_CREATE_ROLE,
  OPEN_CREATE_EMPLOYEE,
  OPEN_CREATE_GROUP
} from '../actions/types'

const INITIAL_STATE = {
  title: '',
  messagesInbox: false,
  messagesSent: false,
  messagesArchived: false,
  tasksInbox: false,
  tasksSent: false,
  tasksArchived: false,
  trainings: false
}

const MainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_MESSAGES_INBOX:
      return { ...INITIAL_STATE, messagesInbox: true, title: 'Caixa de entrada' }
    case OPEN_MESSAGES_SENT:
      return { ...INITIAL_STATE, messagesSent: true, title: 'Mensagens enviadas' }
    case OPEN_MESSAGES_ARCHIVED:
      return { ...INITIAL_STATE, messagesArchived: true, title: 'Mensagens arquivadas' }

    case OPEN_TASKS_INBOX:
      return { ...INITIAL_STATE, tasksInbox: true, title: 'Tarefas - Caixa de entrada' }
    case OPEN_TASKS_SENT:
      return { ...INITIAL_STATE, tasksSent: true, title: 'Tarefas - Enviadas' }
    case OPEN_TASKS_ARCHIVED:
      return { ...INITIAL_STATE, tasksArchived: true, title: 'Tarefas - Arquivadas' }
    case OPEN_TRAININGS:
      return { ...INITIAL_STATE, trainings: true, title: 'Treinamentos' }

    case OPEN_MANAGE_TRAININGS:
      return { ...INITIAL_STATE, title: 'Gerenciar treinamentos' }
    case OPEN_MANAGE_GROUPS:
      return { ...INITIAL_STATE, title: 'Gerenciar grupos' }
    case OPEN_MANAGE_EMPLOYEES:
      return { ...INITIAL_STATE, title: 'Gerenciar funcionários' }
    case OPEN_MANAGE_ROLES:
      return { ...INITIAL_STATE, title: 'Gerenciar cargos' }

    case OPEN_CREATE_ROLE:
      return { ...INITIAL_STATE, title: 'Adicionar cargo' }
    case OPEN_CREATE_EMPLOYEE:
      return { ...INITIAL_STATE, title: 'Adicionar funcionário' }
    case OPEN_CREATE_GROUP:
      return { ...INITIAL_STATE, title: 'Adicionar grupo' }
    default:
      return state
  }
}

export default MainReducer

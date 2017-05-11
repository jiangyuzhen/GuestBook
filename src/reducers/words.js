import {  DELETE_WORDS, SAVETEXT, TOGGLEVISIBLE, ALL_WORDS, LOGIN } from '../constants/ActionTypes'

const initialState = {
  visibleModel: false,
  email: '',
  text: '',
  editStuts: 'add',
  currentWord: {},
  list: []
}

export default function words(state = initialState, action) {
  switch (action.type) {
    case DELETE_WORDS:
      return state

    case SAVETEXT:
      return Object.assign({}, state, {
        text: action.text
      })

    case TOGGLEVISIBLE:
       return Object.assign({}, state, {
          visibleModel: action.visible,
          editStuts: action.editStuts,
          currentWord: action.word ? action.word : {}
        })

    case ALL_WORDS:
      return Object.assign({}, state, {
        list: action.list.rows
      })

    case LOGIN:
      return Object.assign({}, state, {
        email: action.email,
        visibleModel: false
      })

    default:
      return state
  }
}

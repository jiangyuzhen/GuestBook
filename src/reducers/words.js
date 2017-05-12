import {  SAVETEXT, TOGGLEVISIBLE, ALL_WORDS, LOGIN } from '../constants/ActionTypes'

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

    case SAVETEXT:
      return {...state, text: action.text}

    case TOGGLEVISIBLE:
       return {
          ...state,
          visibleModel: action.visible,
          editStuts: action.editStuts,
           currentWord: action.word ? action.word : {}
        } 

    case ALL_WORDS:
      return {...state, list: action.list.rows}

    case LOGIN:
      return {...state, email: action.email, visibleModel: false}

    default:
      return state
  }
}

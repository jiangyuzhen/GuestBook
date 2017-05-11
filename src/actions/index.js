import * as types from '../constants/ActionTypes'
import * as tool from './tool'

export const addWord = ( email, text, action ) => {
    tool.addBook( email, text, action )
    return { type: 'REQUEST_POSTS' }
}

export const addReply = ( doc, email, text, action ) => {
    tool.addReply( doc, email, text, action )
    return { type: 'REQUEST_POSTS' }
}

export const getAllWords = ( action ) => {
    tool.getAllBook( action )
    return { type: 'REQUEST_POSTS' }
}

export const login = ( email ) => ({ type:types.LOGIN, email })
export const onSaveText = ( text ) => ({ type:types.SAVETEXT, text })
export const toggleVisibleModel = ( visible, editStuts, word ) => ({ type: types.TOGGLEVISIBLE, visible, editStuts, word})
export const allWords = (list) => ({type: types.ALL_WORDS, list})
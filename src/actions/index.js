import * as types from '../constants/ActionTypes'
import * as tool from './tool'



export const login = ( email ) => ({ type:types.LOGIN, email })
export const onSaveText = ( text ) => ({ type:types.SAVETEXT, text })
export const toggleVisibleModel = ( visible, editStuts, word ) => ({ type: types.TOGGLEVISIBLE, visible, editStuts, word})
export const allWords = (list) => ({type: types.ALL_WORDS, list})

export const addWord = ( email, text, action ) => {
    tool.addBook( email, text )
        .then( response => {
            if(response.ok){
                tool.getAllBook()
                    .then( data => action(data) )
                    .catch( err => console.error(err))
            }
        })
       .catch( err => console.error(err))
    
    return { type: 'REQUEST_POSTS' }
}

export const addReply = ( doc, email, text, action ) => {
    tool.addReply( doc, email, text )
        .then( response => {
            if(response.ok){
                tool.getAllBook()
                    .then( data => action(data) )
                    .catch( err => console.error(err))
            }
        })
       .catch( err => console.error(err))
    return { type: 'REQUEST_POSTS' }
}

export const getAllWords = ( action ) => {
    tool.getAllBook()
        .then( data => action(data) )
        .catch( err => console.error(err))
    return { type: 'REQUEST_POSTS' }
}

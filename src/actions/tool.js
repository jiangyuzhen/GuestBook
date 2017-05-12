import md5 from 'md5'
import PouchDB from 'pouchdb'

const db =  new PouchDB('guestBooks');
// db.destroy().then(function (response) {
//   // success
// }).catch(function (err) {
//   console.log(err);
// });

export const getGravatar = (email) => {
    return md5( email.trim().toLowerCase() )
}

export const getAllBook = () => {
   return db.allDocs({
      include_docs: true,
      attachments: true
    })
}

export const addBook = ( email, text ) => {
  
    let word = {
        _id: new Date().getTime().toString(),
        text: text,
        time: new Date(),
        email: email,
        gravatar: getGravatar(email),
        replyList: []
    }
    
    return db.put(word);
}

export const addReply = ( doc, email, text ) => {
  let reply = {
        _id: new Date().getTime().toString(),
        text: text,
        time: new Date(),
        email: email,
        gravatar: getGravatar(email)
  }

  return db.get(doc._id).then(function(doc) {
    return db.put({
      _id: doc._id,
      _rev: doc._rev,
      text: doc.text,
      time: doc.time,
      email: doc.email,
      gravatar: doc.gravatar,
      replyList: [
        reply,
        ...doc.replyList
      ]
    });
  })
}
import md5 from 'md5'
import PouchDB from 'pouchdb'
import { message } from 'antd'

const db =  new PouchDB('guestBooks');
// db.destroy().then(function (response) {
//   // success
// }).catch(function (err) {
//   console.log(err);
// });

export const getGravatar = (email) => {
    return md5( email.trim().toLowerCase() )
}

export const getAllBook = (action) => {
    db.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      // handle result
      action(result) 
    }).catch(function (err) {
       message.error(err);
    });
}

export const addBook = (email, text, action) => {
    let word = {
        _id: new Date().getTime().toString(),
        text: text,
        time: new Date(),
        email: email,
        gravatar: getGravatar(email),
        replyList: []
    }
    db.put(word).then(function (response) {
      // handle response
      getAllBook(action)
    }).catch(function (err) {
      message.error(err);
    });
}

export const addReply = (doc, email, text, action) => {
  let reply = {
        _id: new Date().getTime().toString(),
        text: text,
        time: new Date(),
        email: email,
        gravatar: getGravatar(email)
  }

  db.get(doc._id).then(function(doc) {
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
  }).then(function(response) {
    // handle response
    getAllBook(action)
  }).catch(function (err) {
    message.error(err);
  });
}
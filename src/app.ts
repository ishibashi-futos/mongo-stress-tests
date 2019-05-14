import * as mongodb from 'mongodb'
import * as uuid from 'node-uuid'

const DB_PORT = 27017 
const DB_NAME = 'db'
const DB_URL = `mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`

// mongodb.MongoClient.connect(DB_URL, (err, db) => {
//   if(err != null) {
//     console.log(err)
//     return
//   }
//   db.close()
// })

class Document {
  private taskId: string
  private startTime: string
  private endTime: string
  private pointData: {}

  constructor() {
    this.taskId = uuid.v4()
    this.startTime = ''
    this.endTime = ''
    this.pointData = ''
  }
}

let insert = (db: mongodb.Db | null) => {
  let documents = new Array<Document>()
  for (let i = 0; i < 1000000; i++) {
    documents.push(new Document())
    console.log(documents[i])
  }
}

insert(null)
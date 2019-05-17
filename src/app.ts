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

interface Runnable {
  Run(): void
}

let dbInsert = (db: mongodb.Db): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.collection('Documents').insertOne(new Document(), (err) => {
      setTimeout(() => {
        if(err != null) {
          reject(err)
        }
      }, 10)
    })
    resolve()
  })
}

let insert = (db: mongodb.Db) => {
  let documents = new Array<Document>()
  for (let i = 0; i < 10; i++) {
    dbInsert(db).then((err) => {
      if (err != null) console.log(err)
    })
    new Document()
  }
}

/**
 * functionの実行時間を計測するユーティリティ。引数は一つだけ。
 * @param f 
 * @param args 
 */
let stopWatch = (f: Function, args: any): string => {
  let startTime = Date.now()
  f(args)
  let endTime = Date.now()
  return (endTime - startTime).toLocaleString()
}

console.log(`${stopWatch(insert, null)} ms`)
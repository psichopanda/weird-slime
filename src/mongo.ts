import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI ?? '';

export default class Database{
    static instance: MongoClient;
    dbName: string
    constructor(dbName='test'){
        if(!Database.instance) {
            Database.instance = new MongoClient(uri)
            Database.instance.connect()
                .then(() => console.log("Connected to the database!"))
                .catch(e => console.error(e))
        }
        this.dbName = dbName
    }
    getInstance(){
        return Database.instance.db(this.dbName)
    }
}

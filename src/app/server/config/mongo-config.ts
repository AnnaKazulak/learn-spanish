import * as mongoose from "mongoose";
import  mongo from "connect-mongo"; // (session)
class MongoConfig {
    //#region Private Member
    // private readonly mongoStore: mongo;
    //#endregion

    //#region Constructor
    constructor(uri: string, onerror: () => void, session: (options?: any) => any) {
        // this.mongoStore = mongo.create(options: ConnectMongoOptions);
        mongoose.connect((process.env.MONGODB_URI || process.env.MONGOLAB_URI) as string);
        mongoose.connection.on("error", onerror);
        // this.mongoStore = mongo(session);
    }
    //#endregion

    public getMongoStore(config: any) {
        // return (new this.mongoStore(config));
    }
}
export { MongoConfig };
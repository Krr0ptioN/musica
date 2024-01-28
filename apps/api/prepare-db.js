const { MongoMemoryServer }  = require('mongodb-memory-server');
const mongoose  = require('mongoose');

module.exports = async () => { 
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();
    global.__MONGOINSTANCE = instance;
    process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
    await mongoose.connect(`${process.env.MONGO_URI}/musica`);
    await mongoose.connection.db.dropDatabase();
}





 
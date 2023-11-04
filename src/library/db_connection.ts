import mongoose from "mongoose";

(async () => {
    try {
        const mongodb = `mongodb://mongo:27017/library`;
        await mongoose.connect(mongodb);

        const mongod = mongoose.connection;

        mongod.once('open', function () {
            mongod.db.createCollection("book");
        })
    } catch (e) {
        console.log(e);
    }
})();
import { Collection, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

let temperatureCollection: Collection;

(async () => {
    try {
        const client = new MongoClient(uri);
        const connectedClient = await client.connect();
        const db = connectedClient.db("TemperatureControlApp");

        temperatureCollection = db.collection("temperatures");

        await Promise.all([temperatureCollection.createIndex({ id: 1 }, { unique: true })]);

        console.log("MongoDB initialized!");
    } catch (e) {
        console.error("Failed to initialize MongoDB:", e);
        throw e;
    }
})();

export { temperatureCollection };

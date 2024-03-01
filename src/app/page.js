import {MongoClient} from 'mongodb'
import Report from "@/app/components/Report";

const {
    MONGO_USER,
    MONGO_PASS,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DATABASE,
    MONGO_COLLECTION,
} = process.env;
async function connectToMongo() {
    const url = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
    const client = new MongoClient(url);
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    return await client.db(MONGO_DATABASE).collection(MONGO_COLLECTION).find({
        timestamp: {
            $gte: new Date("2024-02-29T10:00:00Z"),
            $lt: new Date("2024-02-29T11:00:00Z")
        }
    }).toArray();
}
export default async function Home() {
    const data = await connectToMongo();

    return (
        <>
            <Report data={data}/>
        </>
    )
};

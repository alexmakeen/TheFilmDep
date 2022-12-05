const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const { v4: uuidv4 } = require("uuid");


const currentlyOwned = async (req, res) => {
const client = new MongoClient(MONGO_URI, options);
const id = uuidv4();
await client.connect();

try {
    const dbName = ("TFD")
    const db = client.db(dbName);
    const addItem = req.body
    addItem.id = id

    const addCurrentlyOwned = await db.collection("filmOwned").insertOne(addItem)
    addCurrentlyOwned
    ? res.status(200).json({status: 200, data: addCurrentlyOwned})
    : res.status(404).json({status: 404, message: "error"})

}
catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
} 
client.close();
}


const getCO = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    try {
        const dbName = ("TFD")
        const db = client.db(dbName);
        
        const CO = await db.collection("filmOwned").find().toArray();
            CO
                ? res.status(200).json({ status: 200, data: CO, message: "data retrieved successfully" })
                : res.status(404).json({status: 404, data: CO, message: "error" });      
    } 
    catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    } 
    client.close();
};


const deleteCO = async (req, res) => {
    const id = req.params.id
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    try {
        const dbName = ("TNWS")
        const db = client.db(dbName);
        //----- delete the collection  "watches" -----//
        const coDelete = await db.collection("cart").findOneAndDelete({id:id})
        !coDelete
        ? res.status(404).json({status: 404, data: coDelete, message: "invalid" })    
        : res.status(201).json({ status: 201, data: coDelete, message: "deleted successfully" })
    } 
    catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    } 
    client.close();
}


const postPhoto = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    
    try {
        const dbName = ("TFD")
        const db = client.db(dbName);
        const addItem = req.body
    
        const addPhoto = await db.collection("photos").insertOne(addItem)
        addPhoto
        ? res.status(200).json({status: 200, data: addPhoto})
        : res.status(404).json({status: 404, message: "error"})
    
    }
    catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    } 
    client.close();
}

const getPhoto = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    try {
        const dbName = ("TFD")
        const db = client.db(dbName);
        
        const photo = await db.collection("photos").find().toArray();
            photo
                ? res.status(200).json({ status: 200, data: photo, message: "data retrieved successfully" })
                : res.status(404).json({status: 404, data: photo, message: "error" });      
    } 
    catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    } 
    client.close();
};

module.exports = {
    currentlyOwned,
    getCO,
    deleteCO,
    postPhoto,
    getPhoto,
}



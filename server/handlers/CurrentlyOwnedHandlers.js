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


const updateCONotes = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    await client.connect();

try {
    const dbName = ("TFD")
    const db = client.db(dbName);
    
    const _id = req.body._id
    const fieldNotes = req.body.fieldNotes;

    const result = await db.collection("filmOwned").findOneAndUpdate({ _id: _id },{ $set: { fieldNotes: fieldNotes } })
    
        result 
        ? res.status(200).json({status: 200, data: result})
        : res.status(400).json({status: 400, message: "item not found"})

}


catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
} 

finally {
client.close();

}


}



module.exports = {
    currentlyOwned,
    getCO,
    updateCONotes
}



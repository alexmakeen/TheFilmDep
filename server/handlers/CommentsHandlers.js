const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


const addComments = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    
    try {
        const dbName = ("TFD")
        const db = client.db(dbName);
        const addItem = req.body
    
        const addComments = await db.collection("comments").insertOne(addItem)
        addComments
        ? res.status(200).json({status: 200, data: addComments})
        : res.status(404).json({status: 404, message: "error"})
    
    }
    catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    } 
    client.close();
    }
    
    const getComments = async (req, res) => {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        try {
            const dbName = ("TFD")
            const db = client.db(dbName);
            
            const CO = await db.collection("comments").find().toArray();
                CO
                    ? res.status(200).json({ status: 200, data: CO, message: "data retrieved successfully" })
                    : res.status(404).json({status: 404, data: CO, message: "error" });      
        } 
        catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        } 
        client.close();
    };

    module.exports = {
        addComments,
        getComments,
    }
    
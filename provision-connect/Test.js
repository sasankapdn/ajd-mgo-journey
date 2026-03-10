const MongoClient = require('mongodb').MongoClient;

// Replace the following with your MongoDB connection string
const url = 'mongodb://[mongo_user:AlphaOffice12!@]IJEGQEYUI1CWVRQ-AJDMONGOTODO.adb.us-ashburn-1.oraclecloudapps.com:27017/[user]?authMechanism=PLAIN&authSource=$external&ssl=true&retryWrites=false&loadBalanced=true';
const dbName = 'ajdmongotodo'; // Replace with your database name

async function testConnection() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected successfully to MongoDB server');

        // Access the database
        const db = client.db(dbName);
        console.log(`Database: ${db.databaseName}`);

        // Perform a simple operation (e.g., list collections)
        const collections = await db.listCollections().toArray();
        console.log('Collections:', collections);
    } catch (error) {
        console.error('Connection failed:', error);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Run the test connection function
testConnection();
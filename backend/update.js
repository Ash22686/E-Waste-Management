const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://Prathamesh:Prathamesh%4085@cluster0.6gdob.mongodb.net/ewaste-marketplace?retryWrites=true&w=majority"; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

async function migrate() {
  try {
    await client.connect();
    const db = client.db("ewaste-marketplace"); // Replace with your database name
    const usersCollection = db.collection("users");

    // Update all user addresses with new details
    await usersCollection.updateMany(
      {},
      {
        $set: {
          address: {
            city: "Pune",
            area: "Bibwewadi",
            colony: "Mansi Apartment",
            coordinates: {
              lat: 18.4659962,
              lng: 73.8642726
            }
          }
        }
      }
    );

    console.log("Migration completed successfully: User addresses updated.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await client.close();
  }
}

migrate();

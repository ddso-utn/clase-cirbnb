import mongoose from 'mongoose';

//-----------------editar en vivo 0


export class MongoDBClient {
    static async connect() {
        try {
            //connect es asincrono por eso lo awaiteo
            const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_DB_NAME}?authSource=admin`);


//            await mongoose.connect((process.env.MONGODB_URI + "/" + process.env.MONGODB_DB_NAME) || 'mongodb://localhost:27017/alojamientos');
            console.log(`MongoDB is connected: ${conn.connection.host}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    }
}
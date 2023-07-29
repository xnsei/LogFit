const mongoose = require("mongoose");

export default function database() {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(
      "mongodb+srv://xnsei:TxAOPOcU87HoUchE@cluster0.9syuixn.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Database connection successfully established!!");
  } catch (error) {
    console.log("Database connection failed : ", error);
  }
}

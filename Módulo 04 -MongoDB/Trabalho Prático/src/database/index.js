import db  from "../config/database.js";

const connetMongoDB = async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log("Conectado com o mongodb com sucesso");
  } catch (error) {
    console.log("Erro ao conectar no mongodb " + error);
  }
}


export default connetMongoDB
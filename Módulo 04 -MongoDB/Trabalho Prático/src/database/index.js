import db  from "../config/database.js";

export default (async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log("Conectado com o mongodb com sucesso");
  } catch (error) {
    console.log(`Erro ao conectar no mongodb: ${error}` );
  }
})()

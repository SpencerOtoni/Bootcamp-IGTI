import db  from "../config/database.js";

export default (async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    global.logger.info("Conectado com o mongodb com sucesso!");
  } catch (error) {
    global.logger.error(`Erro ao conectar no mongodb: ${error.message}!` );
  }
})()

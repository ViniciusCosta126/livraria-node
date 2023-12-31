import express from "express";
import connectaDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorErros from "./middlewares/manipuladorErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await connectaDataBase();

conexao.on("error", (erro) => {
  console.error("Erro de conexao", erro);
});

conexao.once("open", () => {
  console.log("Conexao com o banco feita com sucesso");
});

const app = express();
routes(app);

app.use(manipulador404);
app.use(manipuladorErros);

export default app;

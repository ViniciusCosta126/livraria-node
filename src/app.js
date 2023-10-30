import express from "express";
import connectaDataBase from "./config/dbConnect.js";

const conexao = await connectaDataBase();
conexao.on("error", (erro) => {
  console.error("Erro de conexao", erro);
});

conexao.once("open", () => {
  console.log("Conexao com o banco feita com sucesso");
});

const app = express();
app.use(express.json());

const livros = [
  {
    id: 1,
    titulo: "o senhor dos aneis",
  },
  {
    id: 2,
    titulo: "O Hobbit",
  },
];

const buscaLivros = (id) => {
  return livros.findIndex((livro) => livro.id === Number(id));
};
app.get("/", (req, res) => {
  res.status(200).send("Curso de nodeJS");
});

app.get("/livros", (req, res) => {
  res.status(200).json(livros);
});

app.get("/livros/:id", (req, res) => {
  const { id } = req.params;
  const index = buscaLivros(id);
  res.status(200).json(livros[index]);
});

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("Livro cadastrado com sucesso!");
});

app.put("/livros/:id", (req, res) => {
  const { id } = req.params;
  const index = buscaLivros(id);
  livros[index].titulo = req.body.titulo;
  res.status(200).json(livros);
});

app.delete("/livros/:id", (req, res) => {
  const { id } = req.params;
  const index = buscaLivros(id);
  livros.splice(index, 1);
  res.status(204).send("Livro removido com sucesso");
});

export default app;

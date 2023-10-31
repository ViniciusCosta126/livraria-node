import mongoose from "mongoose";
const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: {
    type: String,
    required: [true, "O campo titulo deve ser obrigatorio"],
  },
  editora: { type: String, required: [true, "A editora é obrigatorio"] },
  preco: {
    type: Number,
    min: [
      1,
      "O valor do livro nao pode ser inferior a 1. Valor fornecido: {VALUE}",
    ],
  },
  paginas: {
    type: Number,
    validate: {
      validator:(valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message:"O numero de pagina deve estar entre 10 e 5.000. Valor fornecido: {VALUE}"
    },
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O autor é obrigatiorio"],
  },
});

const livro = mongoose.model("livros", livroSchema);

export default livro;

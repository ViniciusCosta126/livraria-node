import mongoose from "mongoose";
const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: { type: String, required: [true, "O campo titulo deve ser obrigatorio"] },
    editora: { type: String, required:[true, "A editora é obrigatorio"] },
    preco: { type: Number },
    paginas: { type: Number },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O autor é obrigatiorio"],
    },
  }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;

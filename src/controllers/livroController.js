import Erro404 from "../erros/Erro404.js";
import { livro } from "../models/index.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livro.find({}).populate("autor").exec();
      res.status(200).json(listaLivros);
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarLivro(req, res, next) {
    try {
      let livros = new livro(req.body);
      const livroResultado = await livros.save();
      res.status(201).send(livroResultado.toJSON());
    } catch (error) {
      next(error);
    }
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const { id } = req.params;
      const livroEncontrado = await livro.findById(id);

      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        next(new Erro404("Id do livro nao localizado!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const { id } = req.params;
      const livroResultado = await livro.findByIdAndUpdate(id, req.body);

      if (livroResultado !== null) {
        res.status(200).json({ message: "Livro atualizado!" });
      } else {
        next(new Erro404("Id do livro nao localizado!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async deletarLivro(req, res, next) {
    try {
      const { id } = req.params;
      const livroAtualizado = await livro.findByIdAndDelete(id);
      if (livroAtualizado !== null) {
        res.status(204).json({ message: "Livro deletado com sucesso!!" });
      } else {
        next(new Erro404("Id do livro nao localizado!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async listarLivrosPorEditora(req, res, next) {
    const { editora } = req.query;
    try {
      const livrosPorEditora = await livro.find({ editora });
      res.status(200).json(livrosPorEditora);
    } catch (error) {
      next(error);
    }
  }
}

export default LivroController;

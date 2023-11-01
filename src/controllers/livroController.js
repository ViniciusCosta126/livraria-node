import Erro404 from "../erros/Erro404.js";
import { autor, livro } from "../models/index.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livro.find();
      req.resultado = buscaLivros;
      next();
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

  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);
      if (busca !== null) {
        const livrosResultado = livro
          .find(busca);
        req.resultado = livrosResultado;
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }
  }
}
async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;
  let busca = {};

  if (editora) busca.editora = { $regex: editora, $options: "i" };
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.paginas = {};

  if (minPaginas) busca.paginas.$gte = minPaginas;
  if (maxPaginas) busca.paginas.$lte = maxPaginas;

  if (nomeAutor) {
    const buscaAutor = {};
    buscaAutor.nome = { $regex: nomeAutor, $options: "i" };
    const autores = await autor.findOne(buscaAutor);

    if (autores !== null) {
      busca.autor = autores._id;
    } else {
      busca = null;
    }
  }
  return busca;
}
export default LivroController;

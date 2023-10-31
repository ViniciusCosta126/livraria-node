import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";
class LivroController {
	static async listarLivros(req, res) {
		try {
			const listaLivros = await livro.find({});
			res.status(200).json(listaLivros);
		} catch (error) {
			res
				.status(500)
				.json({ message: `${error.message} - Falha ao trazer livros` });
		}
	}

	static async cadastrarLivro(req, res) {
		const novoLivro = req.body;
		try {
			const autorEncontrado = await autor.findById(novoLivro.autor);
			const livroCompleto = {
				...novoLivro,
				autor: { ...autorEncontrado._doc },
			};
			const livroCriado = await livro.create(livroCompleto);
			res
				.status(201)
				.json({ message: "Criado com sucesso!", livro: livroCriado });
		} catch (erro) {
			res
				.status(500)
				.json({ message: `${erro.message} - Falha ao cadastrar livro` });
		}
	}

	static async listarLivroPorId(req, res) {
		try {
			const { id } = req.params;
			const livroEncontrado = await livro.findById(id);
			res.status(200).json(livroEncontrado);
		} catch (error) {
			res
				.status(500)
				.json({ message: `${error.message} - Falha ao trazer livro` });
		}
	}

	static async atualizarLivro(req, res) {
		try {
			const { id } = req.params;
			await livro.findByIdAndUpdate(id, req.body);
			res.status(200).json({ message: "Livro atualizado!" });
		} catch (error) {
			res
				.status(500)
				.json({ message: `${error.message} - Falha na atualização do livro` });
		}
	}

	static async deletarLivro(req, res) {
		try {
			const { id } = req.params;
			await livro.findByIdAndDelete(id);
			res.status(204).json({ message: "Livro deletado com sucesso!!" });
		} catch (error) {
			res
				.status(500)
				.json({ message: `${error.message} - Falha ao deletar livro` });
		}
	}

	static async listarLivrosPorEditora(req, res) {
		const { editora } = req.query;

		try {
			const livrosPorEditora = await livro.find({ editora });
			res.status(200).json(livrosPorEditora);
		} catch (error) {
			res
				.status(500)
				.json({ message: `${error.message} - Falha ao trazer livros` });
		}
	}
}

export default LivroController;

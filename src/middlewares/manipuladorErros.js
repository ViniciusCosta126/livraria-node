import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
const manipuladorErros = (erro, req, res, next) => {
  if (erro instanceof mongoose.Error.CastError) {
    res
      .status(400)
      .json({ message: "Um ou mais dados fornecidos estao incorretos" });
  } else {
    res.status(500).json({ message: "Erro interno de servidor" });
  }
};
export default manipuladorErros;

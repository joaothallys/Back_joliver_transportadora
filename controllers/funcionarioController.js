const Funcionario = require('../models/funcionario');

exports.getAllFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFuncionarioById = async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id);
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionario não encontrado!' });
    }
    res.json(funcionario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.create(req.body);
    res.status(201).json(funcionario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.update(req.params.id, req.body);
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionario não encontrado!' });
    }
    res.json(funcionario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFuncionario = async (req, res) => {
  try {
    const result = await Funcionario.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const PessoaFisica = require('../models/pessoaFisica');

exports.getAllPessoasFisicas = async (req, res) => {
  try {
    const pessoasFisicas = await PessoaFisica.findAll();
    res.json(pessoasFisicas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPessoaFisicaById = async (req, res) => {
  try {
    const pessoaFisica = await PessoaFisica.findById(req.params.id);
    if (!pessoaFisica) {
      return res.status(404).json({ error: 'Pessoa Física não encontrada!' });
    }
    res.json(pessoaFisica);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPessoaFisica = async (req, res) => {
  try {
    const pessoaFisica = await PessoaFisica.create(req.body);
    res.status(201).json(pessoaFisica);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePessoaFisica = async (req, res) => {
  try {
    const pessoaFisica = await PessoaFisica.update(req.params.id, req.body);
    if (!pessoaFisica) {
      return res.status(404).json({ error: 'Pessoa Física não encontrada!' });
    }
    res.json(pessoaFisica);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePessoaFisica = async (req, res) => {
  try {
    const result = await PessoaFisica.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

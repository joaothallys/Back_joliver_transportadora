const PessoaJuridica = require('../models/pessoaJuridica');

exports.getAllPessoasJuridicas = async (req, res) => {
  try {
    const pessoasJuridicas = await PessoaJuridica.findAll();
    res.json(pessoasJuridicas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPessoaJuridicaById = async (req, res) => {
  try {
    const pessoaJuridica = await PessoaJuridica.findById(req.params.id);
    if (!pessoaJuridica) {
      return res.status(404).json({ error: 'Pessoa Jurídica não encontrada!' });
    }
    res.json(pessoaJuridica);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPessoaJuridica = async (req, res) => {
  try {
    const pessoaJuridica = await PessoaJuridica.create(req.body);
    res.status(201).json(pessoaJuridica);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePessoaJuridica = async (req, res) => {
  try {
    const pessoaJuridica = await PessoaJuridica.update(req.params.id, req.body);
    if (!pessoaJuridica) {
      return res.status(404).json({ error: 'Pessoa Jurídica não encontrada!' });
    }
    res.json(pessoaJuridica);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePessoaJuridica = async (req, res) => {
  try {
    const result = await PessoaJuridica.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

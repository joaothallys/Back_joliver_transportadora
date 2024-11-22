const Estado = require('../models/estado');

exports.getAllEstados = async (req, res) => {
  try {
    const estados = await Estado.findAll();
    res.json(estados);
  } catch (error) {
    console.error('Erro ao buscar estados:', error.message);
    res.status(500).json({ error: 'Erro ao buscar estados.' });
  }
};

exports.getEstadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const estado = await Estado.findById(id);
    res.json(estado);
  } catch (error) {
    console.error(`Erro ao buscar estado com ID ${req.params.id}:`, error.message);
    res.status(404).json({ error: error.message });
  }
};

exports.getEstadoByName = async (req, res) => {
  try {
    const { nome } = req.params;
    const estado = await Estado.findByName(nome);
    res.json(estado);
  } catch (error) {
    console.error(`Erro ao buscar estado com nome "${req.params.nome}":`, error.message);
    res.status(404).json({ error: error.message });
  }
};

exports.createEstado = async (req, res) => {
  try {
    const { nome_estado, icms_local, uf, icms_outro_uf } = req.body;
    const novoEstado = await Estado.create({ nome_estado, icms_local, uf, icms_outro_uf });
    res.status(201).json(novoEstado);
  } catch (error) {
    console.error('Erro ao criar estado:', error.message);
    res.status(500).json({ error: 'Erro ao criar estado.' });
  }
};

exports.deleteEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Estado.delete(id);
    res.json({ message: 'Estado excluído com sucesso!' });
  } catch (error) {
    console.error(`Erro ao excluir estado com ID ${req.params.id}:`, error.message);
    res.status(500).json({ error: error.message });
  }
};

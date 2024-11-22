const Cidade = require('../models/cidade');

exports.getAllCidades = async (req, res) => {
  try {
    const cidades = await Cidade.findAll();
    res.json(cidades);
  } catch (error) {
    console.error('Erro ao buscar cidades:', error.message);
    res.status(500).json({ error: 'Erro ao buscar cidades' });
  }
};

exports.createCidade = async (req, res) => {
  try {
    const { nome_cidade, id_estado, preco_unit_valor, preco_unit_peso } = req.body;

    if (!nome_cidade || !id_estado || !preco_unit_valor || !preco_unit_peso) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    const novaCidade = await Cidade.create(req.body);
    res.status(201).json(novaCidade);
  } catch (error) {
    console.error('Erro ao criar cidade:', error.message);
    res.status(500).json({ error: 'Erro ao criar cidade' });
  }
};

exports.updateCidade = async (req, res) => {
  try {
    const { nome_cidade, id_estado, preco_unit_valor, preco_unit_peso } = req.body;
    const { id } = req.params;

    if (!nome_cidade || !id_estado || !preco_unit_valor || !preco_unit_peso) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    const cidadeAtualizada = await Cidade.update(id, req.body);
    res.json(cidadeAtualizada);
  } catch (error) {
    console.error(`Erro ao atualizar cidade com ID ${req.params.id}:`, error.message);
    res.status(500).json({ error: 'Erro ao atualizar cidade' });
  }
};

exports.deleteCidade = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await Cidade.delete(id);
    res.json({ message: 'Cidade excluída com sucesso!' });
  } catch (error) {
    console.error(`Erro ao excluir cidade com ID ${req.params.id}:`, error.message);
    res.status(500).json({ error: 'Erro ao excluir cidade.' });
  }
};

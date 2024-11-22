const ConhecimentoTransporte = require('../models/conhecimentoTransporte');

exports.getAllConhecimentos = async (req, res) => {
  try {
    const conhecimentos = await ConhecimentoTransporte.findAll();
    res.json(conhecimentos);
  } catch (error) {
    console.error('Erro ao buscar Conhecimentos de Transporte:', error.message);
    res.status(500).json({ error: 'Erro ao buscar Conhecimentos de Transporte' });
  }
};

exports.getConhecimentoById = async (req, res) => {
  try {
    const conhecimento = await ConhecimentoTransporte.findById(req.params.id);
    if (!conhecimento) {
      return res.status(404).json({ error: 'Conhecimento de Transporte não encontrado!' });
    }
    res.json(conhecimento);
  } catch (error) {
    console.error(`Erro ao buscar Conhecimento de Transporte com ID ${req.params.id}:`, error.message);
    res.status(500).json({ error: 'Erro ao buscar Conhecimento de Transporte' });
  }
};

exports.createConhecimento = async (req, res) => {
  try {
    const { numero_conhecimento, id_frete, id_funcionario, valor_total_frete } = req.body;

    if (!numero_conhecimento || !id_frete || !id_funcionario || !valor_total_frete) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    const novoConhecimento = await ConhecimentoTransporte.create(req.body);
    res.status(201).json(novoConhecimento);
  } catch (error) {
    console.error('Erro ao criar Conhecimento de Transporte:', error.message);
    res.status(500).json({ error: 'Erro ao criar Conhecimento de Transporte' });
  }
};

exports.updateConhecimento = async (req, res) => {
  try {
    const conhecimentoAtualizado = await ConhecimentoTransporte.update(req.params.id, req.body);
    res.json(conhecimentoAtualizado);
  } catch (error) {
    console.error(`Erro ao atualizar Conhecimento de Transporte com ID ${req.params.id}:`, error.message);
    res.status(500).json({ error: 'Erro ao atualizar Conhecimento de Transporte' });
  }
};

exports.deleteConhecimento = async (req, res) => {
  try {
    const resultado = await ConhecimentoTransporte.delete(req.params.id);
    res.json(resultado);
  } catch (error) {
    console.error(`Erro ao excluir Conhecimento de Transporte com ID ${req.params.id}:`, error.message);
    res.status(500).json({ error: 'Erro ao excluir Conhecimento de Transporte' });
  }
};

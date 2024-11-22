const Frete = require('../models/frete');

exports.getAllFretes = async (req, res) => {
  try {
    const fretes = await Frete.findAll();
    res.json(fretes);
  } catch (error) {
    console.error('Erro ao buscar fretes:', error.message);
    res.status(500).json({ error: 'Erro ao buscar fretes' });
  }
};

exports.getFreteById = async (req, res) => {
  try {
    const frete = await Frete.findById(req.params.id);
    if (!frete) {
      return res.status(404).json({ error: 'Frete não encontrado!' });
    }
    res.json(frete);
  } catch (error) {
    console.error(`Erro ao buscar frete com ID ${req.params.id}:`, error.message);
    res.status(500).json({ error: 'Erro ao buscar frete' });
  }
};

exports.createFrete = async (req, res) => {
  try {
    const {
      data_frete,
      valor_mercadoria,
      frete_tipo,
      peso,
      frete_valor,
      valor_icms,
      valor_pedagio,
      quem_paga_frete,
      id_remetente,
      id_destinatario,
    } = req.body;

    if (
      !data_frete ||
      !valor_mercadoria ||
      !frete_tipo ||
      !peso ||
      !frete_valor ||
      !valor_icms ||
      !valor_pedagio ||
      !quem_paga_frete ||
      !id_remetente ||
      !id_destinatario
    ) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    const novoFrete = await Frete.create(req.body);
    res.status(201).json(novoFrete);
  } catch (error) {
    console.error('Erro ao criar frete:', error.message);
    res.status(500).json({ error: 'Erro ao criar frete' });
  }
};

exports.updateFrete = async (req, res) => {
  try {
    const freteAtualizado = await Frete.update(req.params.id, req.body);
    res.json(freteAtualizado);
  } catch (error) {
    console.error(`Erro ao atualizar frete com ID ${req.params.id}:`, error.message);
    res.status(500).json({ error: 'Erro ao atualizar frete' });
  }
};

exports.deleteFrete = async (req, res) => {
  try {
    const resultado = await Frete.delete(req.params.id);
    res.json(resultado);
  } catch (error) {
    console.error(`Erro ao excluir frete com ID ${req.params.id}:`, error.message);
    res.status(500).json({ error: 'Erro ao excluir frete' });
  }
};

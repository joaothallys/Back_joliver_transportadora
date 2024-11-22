const Cliente = require('../models/cliente');

// Lista todos os clientes
exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error.message);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
};

// Busca um cliente por ID
exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado!' });
    }
    res.json(cliente);
  } catch (error) {
    console.error(`Erro ao buscar cliente com ID ${req.params.id}:`, error.message);
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
};

// Cria um novo cliente
exports.createCliente = async (req, res) => {
  try {
    const { endereco, telefone, id_cidade, data_insc, tipo_cliente } = req.body;

    // Validações básicas
    if (!endereco || !telefone || !id_cidade || !data_insc || !tipo_cliente) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    const novoCliente = await Cliente.create(req.body);
    res.status(201).json(novoCliente);
  } catch (error) {
    console.error('Erro ao criar cliente:', error.message);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
};

// Atualiza um cliente existente
exports.updateCliente = async (req, res) => {
  try {
    const clienteAtualizado = await Cliente.update(req.params.id, req.body);
    res.json(clienteAtualizado);
  } catch (error) {
    console.error(`Erro ao atualizar cliente com ID ${req.params.id}:`, error.message);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
};

// Exclui um cliente
exports.deleteCliente = async (req, res) => {
  try {
    const resultado = await Cliente.delete(req.params.id);
    res.json(resultado);
  } catch (error) {
    console.error(`Erro ao excluir cliente com ID ${req.params.id}:`, error.message);
    res.status(500).json({ error: 'Erro ao excluir cliente' });
  }
};

exports.getCidadeById = async (req, res) => {
  try {
    const { id } = req.params;
    const cidade = await Cidade.findById(id);
    res.json(cidade);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ error: error.message });
    } else {
      console.error(`Erro ao buscar cidade com ID ${req.params.id}:`, error.message);
      res.status(500).json({ error: 'Erro ao buscar cidade.' });
    }
  }
};


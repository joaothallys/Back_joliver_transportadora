const pool = require('./db');

class Cliente {
  // Método para listar todos os clientes
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM Cliente');
      return rows; // MySQL retorna os resultados diretamente como "rows"
    } catch (error) {
      console.error('Erro ao buscar clientes:', error.message);
      throw error;
    }
  }

  // Método para buscar um cliente por ID
  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM Cliente WHERE id_cliente = ?', [id]);
      return rows[0]; // Retorna apenas a primeira linha
    } catch (error) {
      console.error(`Erro ao buscar cliente com ID ${id}:`, error.message);
      throw error;
    }
  }

  // Método para criar um novo cliente
  static async create(data) {
    const { endereco, telefone, id_cidade, data_insc, tipo_cliente } = data;
    try {
      const [result] = await pool.query(
        'INSERT INTO Cliente (endereco, telefone, id_cidade, data_insc, tipo_cliente) VALUES (?, ?, ?, ?, ?)',
        [endereco, telefone, id_cidade, data_insc, tipo_cliente]
      );
      return { id_cliente: result.insertId, ...data }; // Retorna o ID do cliente criado
    } catch (error) {
      console.error('Erro ao criar cliente:', error.message);
      throw error;
    }
  }

  // Método para atualizar um cliente existente
  static async update(id, data) {
    const { endereco, telefone, id_cidade, data_insc, tipo_cliente } = data;
    try {
      const [result] = await pool.query(
        `UPDATE Cliente SET endereco = ?, telefone = ?, id_cidade = ?, data_insc = ?, tipo_cliente = ? 
         WHERE id_cliente = ?`,
        [endereco, telefone, id_cidade, data_insc, tipo_cliente, id]
      );

      if (result.affectedRows === 0) {
        throw new Error(`Cliente com ID ${id} não encontrado.`);
      }

      return { id_cliente: id, ...data }; // Retorna os dados atualizados
    } catch (error) {
      console.error(`Erro ao atualizar cliente com ID ${id}:`, error.message);
      throw error;
    }
  }

  // Método para excluir um cliente
  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM Cliente WHERE id_cliente = ?', [id]);
      if (result.affectedRows === 0) {
        throw new Error(`Cliente com ID ${id} não encontrado.`);
      }
      return { message: 'Cliente excluído com sucesso!' };
    } catch (error) {
      console.error(`Erro ao excluir cliente com ID ${id}:`, error.message);
      throw error;
    }
  }
}

module.exports = Cliente;

const pool = require('./db');

class PessoaFisica {
  // Método para listar todas as pessoas físicas
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM PessoaFisica');
      return rows;
    } catch (error) {
      console.error('Erro ao buscar pessoas físicas:', error.message);
      throw error;
    }
  }

  // Método para buscar uma pessoa física por ID
  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM PessoaFisica WHERE id_cliente = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar pessoa física com ID ${id}:`, error.message);
      throw error;
    }
  }

  // Método para criar uma nova pessoa física
  static async create(data) {
    const { id_cliente, nome, CPF } = data;
    try {
      const [result] = await pool.query(
        'INSERT INTO PessoaFisica (id_cliente, nome, CPF) VALUES (?, ?, ?)',
        [id_cliente, nome, CPF]
      );
      return { id_cliente: result.insertId, ...data };
    } catch (error) {
      console.error('Erro ao criar pessoa física:', error.message);
      throw error;
    }
  }

  // Método para atualizar uma pessoa física existente
  static async update(id, data) {
    const { nome, CPF } = data;
    try {
      const [result] = await pool.query(
        'UPDATE PessoaFisica SET nome = ?, CPF = ? WHERE id_cliente = ?',
        [nome, CPF, id]
      );

      if (result.affectedRows === 0) {
        throw new Error(`Pessoa física com ID ${id} não encontrada.`);
      }

      return { id_cliente: id, nome, CPF };
    } catch (error) {
      console.error(`Erro ao atualizar pessoa física com ID ${id}:`, error.message);
      throw error;
    }
  }

  // Método para excluir uma pessoa física
  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM PessoaFisica WHERE id_cliente = ?', [id]);
      if (result.affectedRows === 0) {
        throw new Error(`Pessoa física com ID ${id} não encontrada.`);
      }
      return { message: 'Pessoa Física excluída com sucesso!' };
    } catch (error) {
      console.error(`Erro ao excluir pessoa física com ID ${id}:`, error.message);
      throw error;
    }
  }
}

module.exports = PessoaFisica;

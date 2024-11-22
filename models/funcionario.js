const pool = require('./db');

class Funcionario {
  // Método para listar todos os funcionários
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM Funcionario');
      return rows;
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error.message);
      throw error;
    }
  }

  // Método para buscar um funcionário por ID
  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM Funcionario WHERE id_funcionario = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar funcionário com ID ${id}:`, error.message);
      throw error;
    }
  }

  // Método para criar um novo funcionário
  static async create(data) {
    const { nome_funcionario, numero_registro } = data;
    try {
      const [result] = await pool.query(
        'INSERT INTO Funcionario (nome_funcionario, numero_registro) VALUES (?, ?)',
        [nome_funcionario, numero_registro]
      );
      return { id_funcionario: result.insertId, ...data };
    } catch (error) {
      console.error('Erro ao criar funcionário:', error.message);
      throw error;
    }
  }

  // Método para atualizar um funcionário existente
  static async update(id, data) {
    const { nome_funcionario, numero_registro } = data;
    try {
      const [result] = await pool.query(
        'UPDATE Funcionario SET nome_funcionario = ?, numero_registro = ? WHERE id_funcionario = ?',
        [nome_funcionario, numero_registro, id]
      );

      if (result.affectedRows === 0) {
        throw new Error(`Funcionário com ID ${id} não encontrado.`);
      }

      return { id_funcionario: id, ...data };
    } catch (error) {
      console.error(`Erro ao atualizar funcionário com ID ${id}:`, error.message);
      throw error;
    }
  }

  // Método para excluir um funcionário
  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM Funcionario WHERE id_funcionario = ?', [id]);
      if (result.affectedRows === 0) {
        throw new Error(`Funcionário com ID ${id} não encontrado.`);
      }
      return { message: 'Funcionário excluído com sucesso!' };
    } catch (error) {
      console.error(`Erro ao excluir funcionário com ID ${id}:`, error.message);
      throw error;
    }
  }
}

module.exports = Funcionario;

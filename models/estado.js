const pool = require('./db'); // Importa a configuração do pool de conexões

class Estado {
  // Método para listar todos os estados
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM Estado'); // Query para buscar todos os estados
      return rows; // Retorna os resultados diretamente
    } catch (error) {
      console.error('Erro ao buscar estados:', error.message); // Log de erro
      throw error;
    }
  }

  // Método para criar um novo estado
  static async create(data) {
    const { nome_estado, icms_local, uf, icms_outro_uf } = data;
    try {
      const [result] = await pool.query(
        'INSERT INTO Estado (nome_estado, icms_local, uf, icms_outro_uf) VALUES (?, ?, ?, ?)',
        [nome_estado, icms_local, uf, icms_outro_uf]
      );
      return { id_estado: result.insertId, ...data };
    } catch (error) {
      console.error('Erro ao criar estado:', error.message); // Log de erro
      throw error;
    }
  }

  // Método para buscar estado por ID
  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM Estado WHERE id_estado = ?', [id]);
      if (rows.length === 0) {
        throw new Error(`Estado com ID ${id} não encontrado.`);
      }
      return rows[0]; // Retorna apenas o primeiro resultado
    } catch (error) {
      console.error(`Erro ao buscar estado com ID ${id}:`, error.message);
      throw error;
    }
  }

  // Método para buscar estado por nome
  static async findByName(nome) {
    try {
      const [rows] = await pool.query('SELECT * FROM Estado WHERE nome_estado = ?', [nome]);
      if (rows.length === 0) {
        throw new Error(`Estado com nome "${nome}" não encontrado.`);
      }
      return rows[0]; // Retorna apenas o primeiro resultado
    } catch (error) {
      console.error(`Erro ao buscar estado com nome "${nome}":`, error.message);
      throw error;
    }
  }

  // Método para excluir estado
  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM Estado WHERE id_estado = ?', [id]);
      if (result.affectedRows === 0) {
        throw new Error(`Estado com ID ${id} não encontrado.`);
      }
      return { message: 'Estado excluído com sucesso!' };
    } catch (error) {
      if (error.code === 'ER_ROW_IS_REFERENCED') {
        throw new Error('Estado está vinculado a uma ou mais cidades e não pode ser excluído.');
      }
      console.error(`Erro ao excluir estado com ID ${id}:`, error.message);
      throw error;
    }
  }

  static async update(id, data) {
    try {
      const [result] = await pool.query(
        'UPDATE Estado SET nome_estado = ?, icms_local = ?, uf = ?, icms_outro_uf = ? WHERE id_estado = ?',
        [data.nome_estado, data.icms_local, data.uf, data.icms_outro_uf, id]
      );
      if (result.affectedRows === 0) {
        throw new Error(`Estado com ID ${id} não encontrado.`);
      }
      return { id_estado: id, ...data };
    } catch (error) {
      console.error(`Erro ao atualizar estado com ID ${id}:`, error.message);
      throw error;
    }
  }
}
module.exports = Estado;

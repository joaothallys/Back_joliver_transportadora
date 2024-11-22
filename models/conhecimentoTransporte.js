const pool = require('./db');

class ConhecimentoTransporte {
  // Listar todos os Conhecimentos de Transporte
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM ConhecimentoTransporte');
      return rows;
    } catch (error) {
      console.error('Erro ao buscar Conhecimentos de Transporte:', error.message);
      throw error;
    }
  }

  // Buscar um Conhecimento de Transporte por ID
  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM ConhecimentoTransporte WHERE id_conhecimento = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar Conhecimento de Transporte com ID ${id}:`, error.message);
      throw error;
    }
  }

  // Criar um novo Conhecimento de Transporte
  static async create(data) {
    const { numero_conhecimento, id_frete, id_funcionario, valor_total_frete } = data;
    try {
      const [result] = await pool.query(
        'INSERT INTO ConhecimentoTransporte (numero_conhecimento, id_frete, id_funcionario, valor_total_frete) VALUES (?, ?, ?, ?)',
        [numero_conhecimento, id_frete, id_funcionario, valor_total_frete]
      );
      return { id_conhecimento: result.insertId, ...data };
    } catch (error) {
      console.error('Erro ao criar Conhecimento de Transporte:', error.message);
      throw error;
    }
  }

  // Atualizar um Conhecimento de Transporte existente
  static async update(id, data) {
    const { numero_conhecimento, id_frete, id_funcionario, valor_total_frete } = data;
    try {
      const [result] = await pool.query(
        `UPDATE ConhecimentoTransporte 
         SET numero_conhecimento = ?, id_frete = ?, id_funcionario = ?, valor_total_frete = ? 
         WHERE id_conhecimento = ?`,
        [numero_conhecimento, id_frete, id_funcionario, valor_total_frete, id]
      );
      if (result.affectedRows === 0) {
        throw new Error(`Conhecimento de Transporte com ID ${id} não encontrado.`);
      }
      return { id_conhecimento: id, ...data };
    } catch (error) {
      console.error(`Erro ao atualizar Conhecimento de Transporte com ID ${id}:`, error.message);
      throw error;
    }
  }

  // Excluir um Conhecimento de Transporte
  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM ConhecimentoTransporte WHERE id_conhecimento = ?', [id]);
      if (result.affectedRows === 0) {
        throw new Error(`Conhecimento de Transporte com ID ${id} não encontrado.`);
      }
      return { message: 'Registro excluído com sucesso!' };
    } catch (error) {
      console.error(`Erro ao excluir Conhecimento de Transporte com ID ${id}:`, error.message);
      throw error;
    }
  }
}

module.exports = ConhecimentoTransporte;

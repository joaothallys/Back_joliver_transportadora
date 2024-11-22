const pool = require('./db');

class Frete {
  // Método para listar todos os fretes
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM Frete');
      return rows;
    } catch (error) {
      console.error('Erro ao buscar fretes:', error.message);
      throw error;
    }
  }

  // Método para buscar um frete por ID
  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM Frete WHERE id_frete = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar frete com ID ${id}:`, error.message);
      throw error;
    }
  }

  // Método para criar um novo frete
  static async create(data) {
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
    } = data;

    try {
      const [result] = await pool.query(
        `INSERT INTO Frete 
        (data_frete, valor_mercadoria, frete_tipo, peso, frete_valor, valor_icms, valor_pedagio, quem_paga_frete, id_remetente, id_destinatario) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ]
      );
      return { id_frete: result.insertId, ...data };
    } catch (error) {
      console.error('Erro ao criar frete:', error.message);
      throw error;
    }
  }

  // Método para atualizar um frete existente
  static async update(id, data) {
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
    } = data;

    try {
      const [result] = await pool.query(
        `UPDATE Frete SET 
        data_frete = ?, valor_mercadoria = ?, frete_tipo = ?, peso = ?, 
        frete_valor = ?, valor_icms = ?, valor_pedagio = ?, quem_paga_frete = ?, 
        id_remetente = ?, id_destinatario = ? WHERE id_frete = ?`,
        [
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
          id,
        ]
      );

      if (result.affectedRows === 0) {
        throw new Error(`Frete com ID ${id} não encontrado.`);
      }
      return { id_frete: id, ...data };
    } catch (error) {
      console.error(`Erro ao atualizar frete com ID ${id}:`, error.message);
      throw error;
    }
  }

  // Método para excluir um frete
  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM Frete WHERE id_frete = ?', [id]);
      if (result.affectedRows === 0) {
        throw new Error(`Frete com ID ${id} não encontrado.`);
      }
      return { message: 'Frete excluído com sucesso!' };
    } catch (error) {
      console.error(`Erro ao excluir frete com ID ${id}:`, error.message);
      throw error;
    }
  }
}

module.exports = Frete;

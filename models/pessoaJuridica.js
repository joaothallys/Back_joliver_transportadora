const pool = require('./db');

class PessoaJuridica {
  // Método para listar todas as pessoas jurídicas
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM PessoaJuridica');
      return rows;
    } catch (error) {
      console.error('Erro ao buscar pessoas jurídicas:', error.message);
      throw error;
    }
  }

  // Método para buscar uma pessoa jurídica por ID
  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM PessoaJuridica WHERE id_cliente = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar pessoa jurídica com ID ${id}:`, error.message);
      throw error;
    }
  }

  // Método para criar uma nova pessoa jurídica
  static async create(data) {
    const {
      id_cliente,
      razao_social,
      CNPJ,
      inscricao_estadual,
      id_representante,
      nome_representante,
      telefone_representante,
    } = data;
    try {
      const [result] = await pool.query(
        `INSERT INTO PessoaJuridica 
        (id_cliente, razao_social, CNPJ, inscricao_estadual, id_representante, nome_representante, telefone_representante) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id_cliente, razao_social, CNPJ, inscricao_estadual, id_representante, nome_representante, telefone_representante]
      );
      return { id_cliente: result.insertId, ...data };
    } catch (error) {
      console.error('Erro ao criar pessoa jurídica:', error.message);
      throw error;
    }
  }

  // Método para atualizar uma pessoa jurídica existente
  static async update(id, data) {
    const {
      razao_social,
      CNPJ,
      inscricao_estadual,
      id_representante,
      nome_representante,
      telefone_representante,
    } = data;
    try {
      const [result] = await pool.query(
        `UPDATE PessoaJuridica SET 
        razao_social = ?, CNPJ = ?, inscricao_estadual = ?, 
        id_representante = ?, nome_representante = ?, telefone_representante = ? 
        WHERE id_cliente = ?`,
        [razao_social, CNPJ, inscricao_estadual, id_representante, nome_representante, telefone_representante, id]
      );

      if (result.affectedRows === 0) {
        throw new Error(`Pessoa jurídica com ID ${id} não encontrada.`);
      }

      return { id_cliente: id, ...data };
    } catch (error) {
      console.error(`Erro ao atualizar pessoa jurídica com ID ${id}:`, error.message);
      throw error;
    }
  }

  // Método para excluir uma pessoa jurídica
  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM PessoaJuridica WHERE id_cliente = ?', [id]);
      if (result.affectedRows === 0) {
        throw new Error(`Pessoa jurídica com ID ${id} não encontrada.`);
      }
      return { message: 'Pessoa Jurídica excluída com sucesso!' };
    } catch (error) {
      console.error(`Erro ao excluir pessoa jurídica com ID ${id}:`, error.message);
      throw error;
    }
  }
}

module.exports = PessoaJuridica;

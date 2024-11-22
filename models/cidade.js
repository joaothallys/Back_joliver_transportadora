const pool = require('./db');

class Cidade {
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM Cidade');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM Cidade WHERE id_cidade = ?', [id]);
    if (rows.length === 0) {
      throw { status: 404, message: `Cidade com ID ${id} não encontrada.` };
    }
    return rows[0];
  }

  static async create(data) {
    const { nome_cidade, id_estado, preco_unit_valor, preco_unit_peso } = data;
    const [result] = await pool.query(
      'INSERT INTO Cidade (nome_cidade, id_estado, preco_unit_valor, preco_unit_peso) VALUES (?, ?, ?, ?)',
      [nome_cidade, id_estado, preco_unit_valor, preco_unit_peso]
    );
    return { id_cidade: result.insertId, ...data };
  }

  static async update(id, data) {
    const { nome_cidade, id_estado, preco_unit_valor, preco_unit_peso } = data;
    const [result] = await pool.query(
      'UPDATE Cidade SET nome_cidade = ?, id_estado = ?, preco_unit_valor = ?, preco_unit_peso = ? WHERE id_cidade = ?',
      [nome_cidade, id_estado, preco_unit_valor, preco_unit_peso, id]
    );

    if (result.affectedRows === 0) {
      throw new Error(`Cidade com ID ${id} não encontrada.`);
    }

    return { id_cidade: id, ...data };
  }

  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM Cidade WHERE id_cidade = ?', [id]);
      if (result.affectedRows === 0) {
        throw new Error(`Cidade com ID ${id} não encontrada.`);
      }
      return { message: 'Cidade excluída com sucesso!' };
    } catch (error) {
      if (error.code === 'ER_ROW_IS_REFERENCED') {
        throw new Error('Cidade vinculada a um estado existente.');
      }
      throw error;
    }
  }
}

module.exports = Cidade;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const pool = require('./models/db');

const app = express();
// Configuração do CORS
const corsOptions = {
    origin: '*', // Ou especifique domínios permitidos, ex: ['https://meu-front.com']
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  };
// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Rota para testar a conexão com o banco de dados
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        res.json(rows); // Deve retornar [{"result": 2}]
    } catch (error) {
        console.error('Erro ao conectar ao banco:', error.message);
        res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
    }
});

// Rotas do sistema
const estadoRoutes = require('./routes/estadoRoutes');
const cidadeRoutes = require('./routes/cidadeRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const conhecimentoTransporteRoutes = require('./routes/conhecimentoTransporteRoutes');
const freteRoutes = require('./routes/freteRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const pessoaFisicaRoutes = require('./routes/pessoaFisicaRoutes');
const pessoaJuridicaRoutes = require('./routes/pessoaJuridicaRoutes');
const arrecadacaoFretesRoutes = require('./routes/arrecadacaoFretes');
const mediaFretesRoutes = require('./routes/mediaFretes');
const fretesFuncionariosRoutes = require('./routes/fretesFuncionarios');

// Registrar as rotas
app.use('/api/estados', estadoRoutes);
app.use('/api/cidades', cidadeRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/conhecimentos', conhecimentoTransporteRoutes);
app.use('/api/fretes', freteRoutes);
app.use('/api/funcionarios', funcionarioRoutes);
app.use('/api/pessoas-fisicas', pessoaFisicaRoutes);
app.use('/api/pessoas-juridicas', pessoaJuridicaRoutes);
app.use('/arrecadacao-fretes', arrecadacaoFretesRoutes);
app.use('/media-fretes', mediaFretesRoutes);
app.use('/fretes-funcionarios', fretesFuncionariosRoutes);

// Inicializar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

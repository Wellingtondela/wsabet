const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Libera CORS para todas as origens
app.use(cors());

// Endpoint que busca as partidas da Série A
app.get('/api/partidas', async (req, res) => {
  try {
    const response = await fetch('https://api.api-futebol.com.br/v1/campeonatos/46/partidas', {
      headers: {
        'Authorization': 'Bearer live_09bb6629160038527d05e70d0759ed' // Seu token da API-Futebol
      }
    });

    if (!response.ok) {
      const erro = await response.text();
      return res.status(response.status).send({ erro });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Erro ao buscar partidas:', err);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

app.get('/', (req, res) => {
  res.send('API Proxy do BicosBr está funcionando.');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

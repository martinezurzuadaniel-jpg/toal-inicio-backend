const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a Supabase usando variables de entorno en Render
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Ruta principal
app.get('/', (req, res) => {
  res.send('🚀 Servidor backend funcionando correctamente!');
});

// Ruta para listar usuarios
app.get('/usuarios', async (req, res) => {
  const { data, error } = await supabase.from('usuarios').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Ruta para agregar un usuario
app.post('/usuarios', async (req, res) => {
  const { usuario } = req.body;
  const { data, error } = await supabase.from('usuarios').insert([{ usuario }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Puerto dinámico de Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

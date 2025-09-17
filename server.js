import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// 🔹 Conexión a Supabase
const supabaseUrl = "https://xletgqmflssdgbbcvxqx.supabase.co";       // reemplaza con tu URL de Supabase
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsZXRncW1mbHNzZGdiYmN2eHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5NjY4NTksImV4cCI6MjA3MzU0Mjg1OX0.9MQqBUJXVHAdwAilFtWC3ZiQNBQARf5W1Gt9h0cap7o";  // reemplaza con tu API Key
const supabase = createClient(supabaseUrl, supabaseKey);

// 🔹 Ruta para obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
  const { data, error } = await supabase.from("usuarios").select("*");
  if (error) return res.status(400).json(error);
  res.json(data);
});

// 🔹 Ruta para agregar un usuario
app.post("/usuarios", async (req, res) => {
  const { usuario } = req.body;

  const { data, error } = await supabase.from("usuarios").insert([
    { usuario }
  ]);

  if (error) return res.status(400).json(error);
  res.json(data);
});

// 🔹 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});

import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Rota para criar um usuário
app.post('/usuarios', async (req, res) => {
  try {
    const { email, name, age } = req.body;
    const user = await prisma.user.create({
      data: { email, name, age },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar usuário' });
  }
});

// Rota para atualizar um usuário
app.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, age } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { email, name, age },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Rota para deletar um usuário
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Deletado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao deletar usuário' });
  }
});

// Rota para listar usuários
app.get('/usuarios', async (req, res) => {
  try {
    const { name, email, age } = req.query;

    // Filtro condicional baseado nos parâmetros da query string
    const users = await prisma.user.findMany({
      where: {
        ...(name && { name: String(name) }),
        ...(email && { email: String(email) }),
        ...(age && { age: Number(age) }),
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Inicialização do servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

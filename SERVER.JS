import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

const users = []

app.post('/usuarios', async (req, res) => {
  try {

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age, 
      },
    })

    // Adiciona o usuário no array local (opcional, mas mantém sua lógica original)
    users.push(req.body)

    res.status(201).json(user)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: 'Erro ao criar usuário' })
  }
})

app.get('/usuarios', async (req, res) => {
  try {
    // Obtém todos os usuários do banco de dados
    const allUsers = await prisma.user.findMany()
    res.status(200).json(allUsers)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar usuários' })
  }
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})

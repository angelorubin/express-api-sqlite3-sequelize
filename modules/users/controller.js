// modules/users/controller.js
const User = require('./model'); // Importe o modelo User DENTRO do módulo

// Função para obter todos os usuários
async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Não foi possível buscar os usuários.' });
  }
}

// Função para obter um usuário por ID
async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Não foi possível buscar o usuário.' });
  }
}

// Função para criar um novo usuário
async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Não foi possível criar o usuário.' });
  }
}

// Função para atualizar um usuário por ID
async function updateUser(req, res) {
  const { id } = req.params;
  try {
    const [updated] = await User.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      return res.json(updatedUser);
    }
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Não foi possível atualizar o usuário.' });
  }
}

// Função para deletar um usuário por ID
async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).send(); // Resposta 204 para sucesso sem conteúdo
    }
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Não foi possível deletar o usuário.' });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

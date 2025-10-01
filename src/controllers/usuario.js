const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Middlewares = require('../middlewares/auth');

const create = async (req, res) => {
    try {
        req.body.senha = await Middlewares.createHash(req.body.senha);
        const usuario = await prisma.usuario.create({
            data: req.body
        });
        return res.status(201).json(usuario);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    const usuarios = await prisma.usuario.findMany();
    return res.json(usuarios);
}

const readOne = async (req, res) => {
    try {
        const usuario = await prisma.usuario.findUnique({
            select: {
                id: true,
                nome: true,
                cpf: true,
                email: true,
                senha: true,
                telefone: true,
                reservas: true
            },
            where: {
                id: Number(req.params.id)
            }
        });
        return res.json(usuario);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const usuario = await prisma.usuario.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        return res.status(202).json(usuario);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const reset = async (req, res) => {
    if (!req.body.email) {
        res.status(400).json({ error: 'Necessário o envio do email' }).end();
    }
    const senha = await Middlewares.createHash("senha000");
    try {
        const usuarios = await prisma.usuario.findMany({
            where: { email: req.body.email }
        });
        if (!usuarios || usuarios.length === 0) {
            return res.status(400).json({ erro: "Email não encontrado" }).end();
        }
        const usuario = await prisma.usuario.update({
            where: { email: req.body.email },
            data: { senha: senha }
        });
        // await Email.enviarEmail(req.body.email, "senha000");
        res.status(202).json({ usuario: usuario, senhaProvisoria: "senha000" }).end();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuario' });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.usuario.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports = { create, read, readOne, update, reset, remove };
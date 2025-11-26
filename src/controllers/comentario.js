const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const comentario = await prisma.comentario.create({
            data: req.body
        });
        return res.status(201).json(comentario);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    const comentarios = await prisma.comentario.findMany();
    return res.json(comentarios);
}

const readOne = async (req, res) => {
        const comentario = await prisma.comentario.findUnique({
            select: {
                id: true,
                usuario: true,
                texto: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                id: Number(req.params.id)
            }
        });
        return res.json(comentario);
}

const update = async (req, res) => {
    try {
        const comentario = await prisma.comentario.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        return res.status(202).json(comentario);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.comentario.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports = { create, read, readOne, update, remove };
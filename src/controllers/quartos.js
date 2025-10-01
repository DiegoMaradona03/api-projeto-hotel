const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const quarto = await prisma.quarto.create({
            data: req.body
        });
        return res.status(201).json(quarto);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    const quartos = await prisma.quarto.findMany();
    return res.json(quartos);
}

const readOne = async (req, res) => {
    try {
        const quarto = await prisma.quarto.findUnique({
            select: {
                id: true,
                numero: true,
                descricao: true,
                foto: true,
                totalOspedes: true,
                reservas: true
            },
            where: {
                id: Number(req.params.id)
            }
        });
        return res.json(quarto);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const quarto = await prisma.quarto.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        return res.status(202).json(quarto);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.quarto.delete({
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
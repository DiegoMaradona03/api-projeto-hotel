const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const reserva = await prisma.reserva.create({
            data: req.body
        });
        return res.status(201).json(reserva);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    const reservas = await prisma.reserva.findMany();
    return res.json(reservas);
}

const readOne = async (req, res) => {
    try {
        const reserva = await prisma.reserva.findUnique({
            select: {
                id: true,
                numero: true,
                usuario: true,
                quarto: true,
                dataReserva: true,
                dataEntradaPrevista: true,
                dataSaidaPrevista: true,
                dataEntrada: true,
                dataSaida: true,
                quantidadeOspedes: true
            },
            where: {
                id: Number(req.params.id)
            }
        });
        return res.json(reserva);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const reserva = await prisma.reserva.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        return res.status(202).json(reserva);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.reserva.delete({
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
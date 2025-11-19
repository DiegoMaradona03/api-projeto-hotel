const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const {
            quartoId,
            dataEntradaPrevista,
            dataSaidaPrevista
        } = req.body;

        const entrada = new Date(dataEntradaPrevista);
        const saida = new Date(dataSaidaPrevista);
        const agora = new Date();
        agora.setHours(0, 0, 0, 0);

        if (entrada < agora || saida < agora) {
            return res.status(400).json({
                error: "Data Inválida."
            });
        }
        if (saida <= entrada) {
            return res.status(400).json({
                error: "Data Inválida."
            });
        }
        const duplicata = await prisma.reserva.findFirst({
            where: {
                usuarioId: req.body.usuarioId,
                quartoId: quartoId,
                dataEntradaPrevista: entrada,
                dataSaidaPrevista: saida,
                dataSaida: null,
                dataEntrada: null,
                dataReserva: {
                    gte: new Date(Date.now() - 3000)
                }
            }
        });

        if (duplicata) {
            return res.status(200).json(duplicata);
        }


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
    const reserva = await prisma.reserva.findUnique({
        select: {
            id: true,
            usuario: true,
            quarto: true,
            dataReserva: true,
            dataEntradaPrevista: true,
            dataSaidaPrevista: true,
            dataEntrada: true,
            dataSaida: true,
            quantidadeOspedes: true,
            avaliacao: true
        },
        where: {
            id: Number(req.params.id)
        }
    });
    return res.json(reserva);
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
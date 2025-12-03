const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { numero, usuarioId } = req.body;

        if (!numero || !usuarioId) {
            return res.status(400).json({ error: "Telefone e usuário são obrigatórios" });
        }

        const telefoneExistente = await prisma.telefone.findFirst({
            where: {
                numero: numero.trim(),
                usuarioId: Number(usuarioId)
            }
        });

        if (telefoneExistente) {
            return res.status(400).json({ error: "Este telefone já está cadastrado na sua conta" });
        }

        const telefone = await prisma.telefone.create({
            data: req.body
        });
        return res.status(201).json(telefone);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    const telefones = await prisma.telefone.findMany();
    return res.json(telefones);
}

const readOne = async (req, res) => {
        const telefone = await prisma.telefone.findUnique({
            select: {
                id: true,
                numero: true,
                usuario: true
            },
            where: {
                id: Number(req.params.id)
            }
        });
        return res.json(telefone);
}

const update = async (req, res) => {
    try {
        const novoNumero = req.body.numero?.trim();

        if (!novoNumero || novoNumero === "") {
            return res.status(400).json({ error: "Número de telefone não pode ser vazio" });
        }

        const telefoneAtual = await prisma.telefone.findUnique({
            where: { id: Number(req.params.id) }
        });

        if (!telefoneAtual) {
            return res.status(404).json({ error: "Telefone não encontrado" });
        }

        const telefoneExistente = await prisma.telefone.findFirst({
            where: {
                usuarioId: telefoneAtual.usuarioId,
                numero: novoNumero,
                NOT: { id: Number(req.params.id) }
            }
        });

        if (telefoneExistente) {
            return res.status(400).json({ error: "Este número já está cadastrado na sua conta" });
        }

        const telefone = await prisma.telefone.update({
            where: { id: Number(req.params.id) },
            data: { numero: novoNumero }
        });
        return res.status(202).json(telefone);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.telefone.delete({
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
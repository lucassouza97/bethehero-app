const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(req, res)  {
        const ongs = await connection('ongs').select('*');

        return res.json(ongs);
    },

    async create(req, res)  {
        const {name, email, whatsapp, city, uf} = req.body;
        
        const id = crypto.randomBytes(4).toString('HEX');
            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf,
        })

        return res.json({ id });
    },
    //adição de rota para remover a ong, será criada uma permissão para somente um perfil específico realizar a operação
    async delete(req, res){
        const { id } = req.params;
        const ongs = await connection('ongs')
        .where('id', id)
        .select('id')
        .first();
        await connection('ongs').where('id', id).delete();
        return res.status(204).send();
    }
};
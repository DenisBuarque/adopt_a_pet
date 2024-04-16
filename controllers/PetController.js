const Pet = require('../models/Pet');
// helpers
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');

module.exports = class PetController {

    static async store (req, res) {

        const { name, age, weigth, color } = req.body;

        const available = true;

        if(!name) {
            res.status(422).json({ message: "Digite o nome do pet!" });
            return;
        }

        if(!age) {
            res.status(422).json({ message: "Digite a idade do pet!"});
            return;
        }

        if(!weigth) {
            res.status(422).json({ message: "Digite o peso do pet!"});
            return;
        }

        if(!color) {
            res.status(422).json({ message: "Digite a cor do pet!"});
            return;
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        const data = Pet({
            name,
            age,
            weigth,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                image: user.image,
            }
        });

        try {
            const newPet = await data.save(data);
            res.status(201).json({ message: "Pet cadastrado com sucesso!", newPet, user});
        } catch (error) {
            res.status(500).json({ message: error});
        }
    }
}
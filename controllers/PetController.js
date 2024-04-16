const Pet = require("../models/Pet");
// helpers
const getToken = require("../helpers/getToken");
const getUserByToken = require("../helpers/getUserByToken");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class PetController {
  static async getAll(req, res) {
    const pets = await Pet.find().sort("-createdAt");
    res.status(200).json({ pets: pets });
  }

  static async getMyPets(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");
    res.status(200).json({ pets });
  }

  static async getMyAdoptions(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");
    res.status(200).json({ pets });
  }

  static async getPetById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "Id Inválido!" });
      return;
    }

    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    res.status(200).json({ pet: pet });
  }

  static async store(req, res) {
    const { name, age, weigth, color } = req.body;

    const available = true;

    const images = req.files;

    if (!name) {
      res.status(422).json({ message: "Digite o nome do pet!" });
      return;
    }

    if (!age) {
      res.status(422).json({ message: "Digite a idade do pet!" });
      return;
    }

    if (!weigth) {
      res.status(422).json({ message: "Digite o peso do pet!" });
      return;
    }

    if (!color) {
      res.status(422).json({ message: "Digite a cor do pet!" });
      return;
    }

    if (images.lenght === 0) {
      res.status(422).json({ message: "Adicione pelo menos uma imagem!" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    const pet = Pet({
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
      },
    });

    images.map((image) => {
      pet.images.push(image.filename);
    });

    try {
      const newPet = await pet.save(pet);
      res
        .status(201)
        .json({ message: "Pet cadastrado com sucesso!", newPet, user });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async delete(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "Id inválido!" });
      return;
    }

    const pet = await Pet.findById({ _id: id });
    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: "Houve um problema em processar sua solicitação!" });
      return;
    }

    await Pet.findByIdAndDelete(id);

    res.status(200).json({ message: "registro excluído com sucesso!" });
  }

  static async update(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "Id Inválido!" });
      return;
    }

    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      res.status(422).json({ message: "Pet não encontrado!" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: "Houve um problema em processar sua solicitação!" });
      return;
    }

    const images = req.files;

    const updateData = {};

    const { name, age, weight, color, available } = req.body;

    if (!name) {
      res.status(422).json({ message: "Digite o nome do pet!" });
      return;
    } else {
      updateData.name = name;
    }

    if (!age) {
      res.status(422).json({ message: "Digite a idade do pet!" });
      return;
    } else {
      updateData.age = age;
    }

    if (!weight) {
      res.status(422).json({ message: "Digite o peso do pet!" });
      return;
    } else {
      updateData.weight = weight;
    }

    if (!color) {
      res.status(422).json({ message: "Digite a cor do pet!" });
      return;
    } else {
      updateData.color = color;
    }

    if (images.lenght === 0) {
      res.status(422).json({ message: "A imagem é obrigatório!" });
      return;
    } else {
      updateData.images = [];
      images.map((image) => {
        updateData.images.push(images.filename);
      });
    }

    await Pet.findByIdAndUpdate(id, updateData);

    res
      .status(200)
      .json({ message: "Registro do pet atualizado com sucesso!" });
  }
};

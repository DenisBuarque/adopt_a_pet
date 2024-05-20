const Pet = require("../models/Pet");
const Schedule = require("../models/Schedule");
const mongoose = require("mongoose");

// helpers
const getToken = require("../helpers/getToken");
const getUserByToken = require("../helpers/getUserByToken");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");

module.exports = class PetController {
  static async getAll(req, res) {
    const pets = await Pet.find().sort("-createdAt");
    res.status(200).json({ pets: pets });
  }

  static async searchPet(req, res) {
    const query = req.params.query;
    const pets = await Pet.find({
      name: { $regex: ".*" + query + ".*", $options: "i" },
    }).sort("-createdAt");
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

  static async getMyVisits(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Schedule.find({ "pet.user._id": user._id });
    res.status(200).json({ pets });
  }

  static async getPetById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "Id inválido!" });
      return;
    }

    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    res.status(200).json({ pet: pet });
  }

  static async petShow(req, res) {

    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "Id inválido!" });
      return;
    }

    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      res.status(422).json({ message: "Pet não encontrado!" });
      return;
    }

    res.status(200).json({ pet: pet });
  }

  static async likeUser(req, res) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "Id inválido" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      res.status(422).json({ message: "Pet não encontrado" });
      return;
    }

    if (pet.likes.includes(user._id)) {
      res.status(422).json({ message: "Você já curtiu essa foto!" });
      return;
    }

    try {
      pet.likes.push(user._id);

      await pet.save();

      res.status(200).json({
        petId: id,
        userId: user._id,
        message: "Obrigado pelo like na foto.",
      });
      
    } catch (error) {
      res.status(402).json({ message: "Ocorreu um erro tente mais tarde!" });
    }
  }

  static async store(req, res) {
    const { name, age, weigth, color, description } = req.body;

    const available = true;

    const images = req.files;

    if (!name) {
      res.status(422).json({ message: "Por favor, digite o nome do pet!" });
      return;
    }

    if (!age) {
      res.status(422).json({ message: "Por favor, digite a idade do pet!" });
      return;
    }

    if (!weigth) {
      res.status(422).json({ message: "Por favor, digite o peso do pet!" });
      return;
    }

    if (!color) {
      res.status(422).json({ message: "Por favor, digite a cor do pet!" });
      return;
    }

    if (!description) {
      res
        .status(422)
        .json({ message: "Por favor, digite a descrição do pet!" });
      return;
    }

    if (images.length === 0) {
      res
        .status(422)
        .json({ message: "Por favor, adicione pelo menos uma imagem do pet!" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    const pet = Pet({
      name,
      age,
      weigth,
      color,
      description,
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
        .json({ message: "Registro cadastrado com sucesso!", newPet, user });
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

    if (pet.images.length > 0) {
      pet.images.map((img) => {
        let filename = fs.readdirSync("public/assets/pets").includes(img);

        if (filename) {
          fs.unlink(`public/assets/pets/${img}`, function (err) {
            if (err) {
              throw err;
            }
          });
        }
      });
    }

    await Pet.findByIdAndDelete(id);

    res.status(200).json({ message: "Registro excluído com sucesso!" });
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

    const data = {};

    const { name, age, weigth, color, description } = req.body;

    if (!name) {
      res.status(422).json({ message: "Por favor, digite o nome do pet!" });
      return;
    } else {
      data.name = name;
    }

    if (!age) {
      res.status(422).json({ message: "Por favor, digite a idade do pet!" });
      return;
    } else {
      data.age = age;
    }

    if (!weigth) {
      res.status(422).json({ message: "Por favor, digite o peso do pet!" });
      return;
    } else {
      data.weigth = weigth;
    }

    if (!color) {
      res.status(422).json({ message: "Por favor, digite a cor do pet!" });
      return;
    } else {
      data.color = color;
    }

    if (!description) {
      res
        .status(422)
        .json({ message: "Por favor, digite a descrição do pet!" });
      return;
    } else {
      data.description = description;
    }

    if (images.length > 0) {
      pet.images.map((img) => {
        let filename = fs.readdirSync("public/assets/pets").includes(img);
        if (filename) {
          fs.unlink(`public/assets/pets/${img}`, function (err) {
            if (err) {
              throw err;
            }
          });
        }
      });
    }

    if (images.length > 0) {
      data.images = [];
      images.map((image) => {
        data.images.push(image.filename);
      });
    }

    await Pet.findByIdAndUpdate(id, data);

    res.status(200).json({ message: "Registro atualizado com sucesso!" });
  }

  static async scheduleVisit(req, res) {
    const id = req.params.id;

    if(!ObjectId.isValid(id)) {
      res.status(422).json({ message: "Id inválido!"});
      return;
    }

    const pet = await Pet.findOne({_id: id});
    if(!pet) {
      res.status(422).jsn({ message: "Pet não encontrado!"});
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    //const visit = await Schedule.find();

    /*if(pet._id.equals(id) && visit.visitor._id) {
      res.status(422).json({ message: "Você já agendou uma visita para esse pet!"});
      return;
    }*/

    const schedule = Schedule({
      pet: {
        _id: pet._id,
        name: pet.name,
      },
      visitor: {
        _id: user.id,
        name: user.name,
        phone: user.phone,
        email: user. email,
        image: user.image,
      },
      concluded: false,
    });

    try {
      await schedule.save();
      res.status(200).json({ message: "Sua visita foi agendada com sucesso!"}); 
    } catch (error) {
      res.status(422).json({ message: "Ocorreu um erro no agendamento!"});
    }
  }

  static async schedule(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "Id inválido!" });
      return;
    }

    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.equals(user._id)) {
      res.status(422).json({
        message: "Você não pode agendar uma visita para seu próprio pet!",
      });
      return;
    }

    if (pet.adopter) {
      if (pet.adopter._id.equals(user._id)) {
        res
          .status(422)
          .json({ message: "Você já agendou uma visita para esse pet!" });
        return;
      }
    }

    pet.adopter = {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      image: user.image,
    };

    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({
      message: `Sua visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone} ou pelo e-mail ${pet.user.email}.`,
    });
  }

  static async concludeAdoption(req, res) {
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

    /*if (pet.user._id.toString() === user._id.toString()) {
      res
        .status(422)
        .json({ message: "Houve um problema em processar sua solicitação!" });
      return;
    }*/

    pet.available = false;

    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({
      message: "Parabéns! O ciclo de adoção foi finalizado com sucesso!",
    });
  }
};

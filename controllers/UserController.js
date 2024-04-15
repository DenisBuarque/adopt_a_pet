const bcrypt = require("bcrypt");
const User = require("../models/User");
const createUserToken = require("../helpers/createUserToken");

module.exports = class UserController {
  static async store(req, res) {
    const { name, phone, email, password, confirmPassword } = req.body;

    if (!name) {
      res.status(422).json({ message: "Digite seu nome." });
      return;
    }

    if (!phone) {
      res.status(422).json({ message: "Digite seu telefone para contato." });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "Digite seu e-mail pessoal." });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "Digite sua senha de segurança." });
      return;
    }

    if (!confirmPassword) {
      res.status(422).json({ message: "Digite a confirmação de senha." });
      return;
    }

    if (password !== confirmPassword) {
      res.status(422).json({
        message: "As senha e confirmação de senha precisam ser iguais.",
      });
      return;
    }

    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      res.status(422).json({ message: "Por favor, utilize outro e-mail." });
      return;
    }

    //create password hash
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const data = new User({
      name,
      phone,
      email,
      password: hashPassword,
    });

    try {
      // save user data
      const user = await data.save();
      // authentication jwt token
      await createUserToken(user, req, res);
    } catch (error) {
      console.log(error);
    }
  }
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fs = require('fs');
// helpers
const createUserToken = require("../helpers/createUserToken");
const getToken = require("../helpers/getToken");
const getUserByToken = require("../helpers/getUserByToken");

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
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "Digite seu e-mail pessoal." });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "Digite sua senha de segurança." });
      return;
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(422).json({ message: "E-mail de usuário não encontrado!" });
      return;
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      res.status(422).json({ message: "Senha inválida, tente outra vez!" });
      return;
    }
    // authentication user
    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    console.log(req);

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "mysecret");

      currentUser = await User.findById(decoded.id);
      currentUser.password = undefined;
    } else {
      currentUser = null;
    }
    res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");
    if (!user) {
      res.status(422).json({ mssage: "Usuário não encontrado!" });
      return;
    }
    res.status(200).json({ user });
  }

  static async update(req, res) {
    const id = req.params.id;

    const { name, phone, email, password, confirmPassword } = req.body;

    // get token user in page
    const token = getToken(req);
    const user = await getUserByToken(token);

    let image = "";

    if(req.file) {

      let filenames = fs.readdirSync('public/assets/users').includes(user.image);
      if(filenames) {
        fs.unlink(`public/assets/users/${user.image}`, function(err) {
          if (err) {
            throw err;
          }
        });
      }

      user.image = req.file.filename;
    }

    if (!name) {
      res.status(422).json({ message: "Digite seu nome." });
      return;
    }

    user.name = name;

    if (!phone) {
      res.status(422).json({ message: "Digite seu telefone para contato." });
      return;
    }

    user.phone = phone;

    if (!email) {
      res.status(422).json({ message: "Digite seu e-mail pessoal." });
      return;
    }

    const existEmail = await User.findOne({ email: email });
    if (user.email !== email && existEmail) {
      res.status(422).json({ message: "Por favor utilize outro e-mail!" });
      return;
    }

    user.email = email;

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
    } else if (password === confirmPassword && password !== null) {
      //create password hash
      const salt = await bcrypt.genSalt(12);
      const hashPassword = await bcrypt.hash(password, salt);

      user.password = hashPassword;
    }

    try {
      await User.findByIdAndUpdate({_id: user.id}, {$set: user}, {new: true});
      res.status(200).json({ message: "Registro de usuário atualizado com sucesso!"});
    } catch (error) {
      res.status(500).json({ message: error });
    }

  }
};

const User = require("../model/user");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAdminAccount = async () => {
  try {
    let existAdmin = await User.find({ role: "admin" });
    if (existAdmin.length == 0) {
      let data = {
        fullname: "ADMIN ADMIN",
        email: process.env.EMAIL,
        password: process.env.PASS,
        image: "admin.png",
        tel: process.env.TEL,
        role: "admin",
        date: new Date(),
      };
      let admin = new User(data);
      admin.password = bycrypt.hashSync(data.password, 10);
      await admin.save();
      console.log("admin created, you can use the application Now");
    } else {
      console.log("Admin ALREADY exist");
    }
  } catch (error) {
    console.log(error);
  }
};
const createUserAccount = async (req, res, fileName) => {
  try {
    let { fullname, email, password, tel, tags } = req.body;
    tags = JSON.parse(tags);
    let user = new User({ fullname, email, password, tel, tags });
    user.password = bycrypt.hashSync(password, 10);
    user.image = fileName;
    user.role = "user";
    user.date = new Date();
    await user.save();
    console.log("User created, you can use the application Now");
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.table(email);
    console.log(password);

    const user = await User.findOne({ email });
    if (!user) {
      return res.send("email not valide");
    }
    const valid = bycrypt.compareSync(password, user.password);
    if (!valid) {
      return res.send("password");
    }
    let payload = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      tel: user.tel,
      image: user.image,
      tags: user.tags,
      date: user.date,
      role: user.role,
    };

    let token = jwt.sign(payload, process.env.SECRET_KEY);

    res.send({ mytoken: token });
  } catch (error) {
    res.send(error);
  }
};

const list = async (req, res) => {
  try {
    let users = await User.find({ role: "user" });
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};
const byId = async (req, res) => {
  try {
    let iuser = await User.findById({ _id: req.params.id });
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    let deleteUser = await User.findByIdAndDelete({ _id: req.params.id });
    res.send(deleteUser);
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res, fileName) => {
  try {
    let id = params.id;
    let data = req.body;
    data.tags = JSON.parse(data.tags);

    if (fileName.length > 0) {
      data.image = fileName;
    }
    if (data.password) {
      data.password = bycrypt.hashSync(data.password, 10);
    }

    let updatedUser = await User.findByIdAndUpdate({ _id: id }, data);
    res.send(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createAdminAccount,
  SignIn,
  list,
  createUserAccount,
  deleteUser,
  update,
  byId,
};

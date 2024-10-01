const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body.input;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ msg: "Incorrect Email or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Email or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body.input;    
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
    return res.json({ msg: "Missing input", status: false });

  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } })
    if (users) {
      return res.json({status: true, users})
    }
    return res.json({status: false, msg: "Invalid ID"})
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const userId = req.params.id
    const userData = await User.find({_id: userId})
    if (userData) {
      return res.json({status: true, userData})
    }
    return res.json({status: false, msg: "Invalid ID"})
    
  } catch (ex) {
    next(ex)
  }
}

module.exports.uploadImages = async (req, res, next) => {

  try {
    const files = req.files;
    const path = 'http://localhost:5000/images/'
    var images = []
    files.map((i) => {
      images.push(path + i.filename)
    })
    res.json({ status: true, data: images });
    
  } catch (ex) {
    next(ex)
  }
}

module.exports.setBackgroundImage = async (req, res, next) => {

  try {
    const {userId, image} = req.body
    const user = await User.findOneAndUpdate({
      _id: userId
    },
    {
      $set: {backgroundImage: image}
    }
    ) 
    res.json({ status: true, data: image, msg: "Thay đổi ảnh bìa thành công" });
    
  } catch (ex) {
    next(ex)
  }
}

module.exports.setAvatarImage = async (req, res, next) => {

  try {
    const {userId, image} = req.body
    const user = await User.findOneAndUpdate({
      _id: userId
    },
    {
      $set: {avatar: image}
    }
    ) 
    res.json({ status: true, data: image, msg: "Thay đổi ảnh đại diện thành công" });
    
  } catch (ex) {
    next(ex)
  }
}
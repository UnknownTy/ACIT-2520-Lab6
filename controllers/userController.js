const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const isUserValid = (user, password) => {
  return user.password === password;
}

const findOrCreate = (profile, cb) => {
  let user = getUserById(profile.id);
  if (user) {
    cb(null, user)
  } else {
    userModel.updateDatabase({
      id: profile.id,
      name: profile.username,
      role: "user",
    })
    let user = getUserById(profile.id)
    cb(null, user)
  }
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  findOrCreate,
};

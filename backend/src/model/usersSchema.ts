const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    username: { type: "string", required: true },
    authentication: {
        password: { type: "string", required: true, select: false },
        salt: { type: "string", select: false },
    },
}, { versionKey: false });

export const UserModel = mongoose.model('User', userSchema);

export const dbMethods = {
  getUsers: () => UserModel.find(),
  getUserByUsername: (username: string) => UserModel.findOne({ username: username }),
  getUserById: (id: string) => UserModel.findById({ id: id }),
  createUser: (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject()),
  deleteUserById: (id: string) => UserModel.findOneAndDelete({_id: id}),
  updateUserById: (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values),
};
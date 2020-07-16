const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, required: true },
  sex: {
    type: String,
    enum: ["male", "female", "other"],
    required() {
      return this.age > 18;
    }
  },
  type: {
    type: String,
    enum: ["admin", "owner", "user"],
    default: "user"
  },
  email: {
    type: String,
    validate: email => {
      if (!email.includes("@")) {
        throw new Error("Wrong format");
      }

      return true;
    }
  }
});

UserSchema.static("updateUser", async function(id, updateParams) {
  const user = await this.findById(id);

  if (!user) throw new Error("User not found");

  Object.keys(updateParams).forEach(name => {
    user[name] = updateParams[name];
  });

  return user.save();
});

module.exports = mongoose.model("User", UserSchema);

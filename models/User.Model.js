import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["entrepreneur", "investor", "admin"],
      default: "entrepreneur",
    },
    postedIdeas: [
      {
        type: Schema.Types.ObjectId,
        ref: "IdeaModel",
      },
    ],
    // sample reference Model  // Bilal  we  will create  model accordingly.
    // same as above we can create  for investers like investedIdeaS
    businessExperience: [
      {
        companyName: { type: String, required: true },
        position: { type: String, required: true },
        years: { type: Number, required: true },
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Exclude __v by default in all responses
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
 return jwt.sign(
   {
     _id: this._id,
   },
   process.env.ACCESS_TOKEN_SECRET,
   {
     expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
   }
 );
};

const User = mongoose.model("User", userSchema);

export default User;

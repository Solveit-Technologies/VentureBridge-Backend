import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
  },
  { timestamps: true }
);


// Exclude __v by default in all responses
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
  },
});



const User = mongoose.model("User", userSchema);

export default User;

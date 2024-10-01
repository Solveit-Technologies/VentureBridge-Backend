const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String,required: true},
  email: {type: String,required: true,unique: true},
  password: {type: String,required: true},
  role: {type: String,enum: ['entrepreneur', 'investor', 'admin'], default: 'entrepreneur'},
  postedIdeas: [{ type: Schema.Types.ObjectId, ref: 'IdeaModel'  }], // sample reference Model  // Bilal  we  will create  model accordingly.
   // same as above we can create  for investers like investedIdeaS 
  businessExperience: [{
    companyName: { type: String, required: true },
    position: { type: String, required: true },
    years: { type: Number, required: true }
  }],
}, { timestamps: true });


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

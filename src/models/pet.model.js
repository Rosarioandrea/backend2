import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },  
  age: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
});

const PetModel = mongoose.model('Pet', petSchema);

export default PetModel;
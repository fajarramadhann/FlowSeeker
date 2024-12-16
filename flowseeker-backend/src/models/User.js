const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  role: { type: String, enum: ['jobseeker', 'recruiter', 'referral'], required: true },
  profile: {
    username: String,
    name: String,
    bio: String,
    skills: [String],
    experience: String,
    photo: String,

  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

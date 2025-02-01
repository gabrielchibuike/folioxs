import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  profileName: { type: String },
  userName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: { type: String },
  password: {
    type: String,
    required: true,
  },
  profileImg: { type: String },
  socialHandle: { type: [] },
  otp: { type: String },
  selected_template: { type: [] },
  verified: { type: String },
  dateCreated: { type: Date, default: Date.now() },
  dateUpdated: { type: Date, default: Date.now() },
  visible: { type: Boolean, default: true },
});

const UserDetails = mongoose.model("personal_info", UserSchema);

export default UserDetails;

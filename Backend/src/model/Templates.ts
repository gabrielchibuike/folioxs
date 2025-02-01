import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema({
  profilePictureUrl: { type: String },
  profileName: { type: String },
  bio: { type: String },
  socialHandle: { type: [] },
  links: { type: [] },
  dateCreated: { type: Date, default: Date.now() },
  dateUpdated: { type: Date, default: Date.now() },
  visible: { type: Boolean, default: true },
});

const TemplateDetails = mongoose.model("templates", TemplateSchema);

export default TemplateDetails;

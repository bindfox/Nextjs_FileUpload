const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    file_path: {
      type: String,
      required: true,
    },
    file_mimetype: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
mongoose.models = {};
const FileUpload = mongoose.model("File", fileSchema);

export default FileUpload;

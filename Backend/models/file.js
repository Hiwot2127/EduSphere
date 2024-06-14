import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        courseName: { type: String, required: true },
        secureUrl: { type: String, required: true },
        public_id: { type: String, default: "" },
        resource_type: { type: String, required: true },
        size: { type: Number, default: "" },
        thumbnailUrl: { type: String, default: "" }
    },
    {
        versionKey: false,
        timestamps: true,
    }
    );

const File = mongoose.model("File", fileSchema);
export default File;
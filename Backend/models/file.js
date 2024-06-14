import mongoose from "mongoose";

// Define the schema for the File model
const fileSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },  
        courseName: { type: String, required: true },  // Name of the course associated with the file, required field
        secureUrl: { type: String, required: true }, 
        public_id: { type: String, default: "" },
        resource_type: { type: String, required: true },  // Type of the resource (e.g., image, video), required field
        size: { type: Number, default: 0 },  
        thumbnailUrl: { type: String, default: "" }
    },
    {
        versionKey: false,  // Disable the version key (__v) which Mongoose uses for document versioning
        timestamps: true,  // Automatically add createdAt and updatedAt fields to the schema
    }
);

// Create and export the File model based on the schema
const File = mongoose.model("File", fileSchema);
export default File;
